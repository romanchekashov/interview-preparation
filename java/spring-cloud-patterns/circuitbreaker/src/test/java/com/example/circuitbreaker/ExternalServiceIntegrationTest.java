package com.example.circuitbreaker;

import io.github.resilience4j.bulkhead.Bulkhead;
import io.github.resilience4j.bulkhead.BulkheadRegistry;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterRegistry;
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import static com.example.circuitbreaker.ExternalService.FALLBACK_RATE_LIMIT_RESPONSE;
import static com.example.circuitbreaker.ExternalService.FALLBACK_RESPONSE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.client.ExpectedCount.manyTimes;
import static org.springframework.test.web.client.ExpectedCount.times;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@SpringBootTest
public class ExternalServiceIntegrationTest {

  @Autowired
  private ExternalService externalService;

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private CircuitBreakerRegistry circuitBreakerRegistry;

  @Autowired
  private BulkheadRegistry bulkheadRegistry;

  @Autowired
  private RateLimiterRegistry rateLimiterRegistry;

  @Autowired
  private RetryRegistry retryRegistry;

  @Value("${EXTERNAL_SERVICE_URL}")
  private String externalServiceUrl;

  @BeforeEach
  public void setUp() {
    circuitBreakerRegistry.circuitBreaker("externalServiceCircuitBreaker").reset();
  }

  @Test
  public void testCircuitBreakerWithFallbackOpenAndHalfOpenAndClosedState() throws InterruptedException {
    MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);

    // Simulate server error
    mockServer.expect(manyTimes(), requestTo(externalServiceUrl))
            .andRespond(withServerError());

    var circuitBreaker = circuitBreakerRegistry.circuitBreaker("externalServiceCircuitBreaker");

    // Circuit should be closed
    assertEquals(CircuitBreaker.State.CLOSED, circuitBreaker.getState());
    System.out.println("========= Circuit State: " + circuitBreaker.getState());

    for (int i = 0; i < 10; i++) {
      try {
        // Call the service and expect the fallback response
        String response = externalService.callExternalServiceWithCircuitBreaker();
        assertEquals(FALLBACK_RESPONSE, response);
        System.out.println("Response: " + response);
      } catch (Exception ignored) {
        System.out.println("Exception occurred " + ignored.getMessage());
      }
    }

    // Circuit should be open now
    assertEquals(CircuitBreaker.State.OPEN, circuitBreaker.getState());
    System.out.println("========= Circuit State: " + circuitBreaker.getState());

    // Wait for the circuit breaker to transition to half-open state
    Thread.sleep(11000); // Ensure this time matches waitDurationInOpenState

    // Circuit should now be half-open
    assertEquals(CircuitBreaker.State.HALF_OPEN, circuitBreaker.getState());
    System.out.println("========= Circuit State: " + circuitBreaker.getState());

    // Simulate a successful call
    mockServer.reset();
    mockServer.expect(times(5), requestTo(externalServiceUrl))
            .andRespond(withSuccess("Success", null));

    for (int i = 0; i < 5; i++) {
      try {
        // Call the service and expect the fallback response
        String response = externalService.callExternalServiceWithCircuitBreaker();
        assertEquals("Success", response);
        System.out.println("========= Circuit State: " + circuitBreaker.getState());
        System.out.println("Response: " + response);
      } catch (Exception ignored) {
        System.out.println("Exception occurred " + ignored.getMessage());
      }
    }

    // Circuit should now close
    assertEquals(CircuitBreaker.State.CLOSED, circuitBreaker.getState());
    System.out.println("========= Circuit State: " + circuitBreaker.getState());
  }

  @Test
  public void testBulkhead() throws InterruptedException {
    Bulkhead bulkhead = bulkheadRegistry.bulkhead("externalServiceBulkhead");
    assertEquals(5, bulkhead.getMetrics().getMaxAllowedConcurrentCalls());

    MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);
    mockServer.expect(manyTimes(), requestTo(externalServiceUrl))
            .andRespond(withSuccess("Success", null));

    ExecutorService executor = Executors.newFixedThreadPool(10);

    for (int i = 0; i < 10; i++) {
      executor.submit(() -> {
        String response = externalService.callExternalServiceWithBulkhead();
        assertTrue(response.equals(FALLBACK_RESPONSE) ||
                response.startsWith("Success"));
        System.out.println("Response: " + response);
      });
    }

    executor.shutdown();
    executor.awaitTermination(10, TimeUnit.SECONDS);
  }

  @Test
  public void testRateLimiter() throws InterruptedException {
    RateLimiter rateLimiter = rateLimiterRegistry.rateLimiter("externalServiceRateLimiter");
    assertEquals(5, rateLimiter.getRateLimiterConfig().getLimitForPeriod());

    MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);
    mockServer.expect(manyTimes(), requestTo(externalServiceUrl))
            .andRespond(withSuccess("Success", null));

      ExecutorService executor = Executors.newFixedThreadPool(10);

        for (int i = 0; i < 10; i++) {
            String response = externalService.callExternalServiceWithRateLimiter();
            assertTrue(response.equals(FALLBACK_RATE_LIMIT_RESPONSE) ||
                    response.equals("Success"));
            System.out.println("Response: " + response);
        }

      executor.shutdown();
      executor.awaitTermination(10, TimeUnit.SECONDS);
  }

  @Test
  public void testRetry() {
    Retry retry = retryRegistry.retry("externalServiceRetry");
    AtomicInteger maxAttempts = new AtomicInteger(retry.getRetryConfig().getMaxAttempts());
    assertEquals(3, maxAttempts.get());

    // Simulate intermittent failure
    MockRestServiceServer mockServer = MockRestServiceServer.createServer(restTemplate);
    mockServer.expect(manyTimes(), requestTo(externalServiceUrl))
            .andRespond(request -> {
              System.out.println("attempt: " + (4 - maxAttempts.get()) + " for request: " + request.getMethod());
              if (maxAttempts.getAndDecrement() > 1) {
                System.out.println("Simulated connection error");
                return withServerError().createResponse(request);
              }
              return withSuccess("Success", null).createResponse(request);
            });

    String response = externalService.callExternalServiceWithRetry();
    assertEquals("Success", response);
    System.out.println("Response: " + response);
  }

  @Test
  public void testTimeLimiter() throws ExecutionException, InterruptedException {
    String response = externalService.callExternalServiceWithTimeLimiter().get();
    assertEquals("Service timed out. Please try again later.", response);
  }
}
