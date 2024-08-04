package com.example.jpalocks.flights.repository;

import com.example.jpalocks.flights.models.Flight;
import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FlightRepository extends CrudRepository<Flight, Long> {
  @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
  Optional<Flight> findWithLockingById(Long id);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="10000")})
  Optional<Flight> findWithPessimisticLockingById(Long id);
}
