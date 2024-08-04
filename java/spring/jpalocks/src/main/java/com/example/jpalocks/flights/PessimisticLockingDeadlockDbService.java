package com.example.jpalocks.flights;

import com.example.jpalocks.flights.repository.FlightRepository;
import com.example.jpalocks.flights.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * If many threads are locking the same row in the database, it may take a long time to get the lock. You can set a timeout to receive a lock:
 *
 * If the timeout expires, CannotAcquireLockException will be thrown.
 * It is important to note that not all persistence providers support the hint javax.persistence.lock.timeout.
 * For example, Oracle's persistence provider supports this hint, whereas it does not for PostgreSQL, MS SQL Server, MySQL, and H2.
 *
 * Now we consider a deadlock situation.
 *
 * We will get the following stack trace from one of the threads
 *
 * org.springframework.dao.CannotAcquireLockException: could not extract ResultSet; SQL [n/a]; nested exception is org.hibernate.exception.LockAcquisitionException: could not extract ResultSet
 * ...
 * Caused by: org.postgresql.util.PSQLException: ERROR: deadlock detected
 * ...
 * The database detected that this code leads to a deadlock.
 * However, there may be situations when the database will not be able to do this
 * and threads will suspend their execution until the timeout ends.
 */
@Service
public class PessimisticLockingDeadlockDbService implements LockingDbService {

  private final FlightRepository flightRepository;

  private final TicketRepository ticketRepository;

  public PessimisticLockingDeadlockDbService(FlightRepository flightRepository, TicketRepository ticketRepository) {
    this.flightRepository = flightRepository;
    this.ticketRepository = ticketRepository;
  }

  private void fetchAndChangeFlight(long flightId) throws Exception {
    var flight = flightRepository.findWithPessimisticLockingById(flightId).get();
    flight.setCapacity(flight.getCapacity() + 1);
    Thread.sleep(1_000);
  }

  @Transactional
  public void changeFlight1() throws Exception {
    fetchAndChangeFlight(1L);
    fetchAndChangeFlight(2L);
    Thread.sleep(1_000);
  }

  @Transactional
  public void changeFlight2() throws Exception {
    fetchAndChangeFlight(2L);
    fetchAndChangeFlight(1L);
    Thread.sleep(1_000);
  }

}
