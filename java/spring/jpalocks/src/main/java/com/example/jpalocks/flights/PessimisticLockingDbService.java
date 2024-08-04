package com.example.jpalocks.flights;

import com.example.jpalocks.flights.exceptions.ExceededCapacityException;
import com.example.jpalocks.flights.models.Flight;
import com.example.jpalocks.flights.models.Ticket;
import com.example.jpalocks.flights.repository.FlightRepository;
import com.example.jpalocks.flights.repository.TicketRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * With pessimistic locking, table rows are locked at the database level.
 * Let's change the blocking type of the FlightRepository#findWithLockingById method to PESSIMISTIC_WRITE
 * and rerun the booking tickets example. One of the threads will throw ExceededCapacityException
 * and only two tickets will be in the tickets table.
 *
 * Now the thread that first loaded the flight has exclusive access to the row in the flights table,
 * so the second thread suspends its work until the lock is released.
 * After the first thread commits the transaction and releases the lock,
 * the second thread will get monopole access to the row, but at this point,
 * the flight capacity will already be exhausted, because the changes made by the first thread will get into the database.
 * As a result, the controlled ExceededCapacityException exception will be thrown.
 *
 * There are three types of pessimistic locking in JPA:
 * - PESSIMISTIC_READ - acquire a shared lock, and the locked entity cannot be changed before a transaction commit.
 * - PESSIMISTIC_WRITE - acquire an exclusive lock, and the locked entity can be changed.
 * - PESSIMISTIC_FORCE_INCREMENT - acquire an exclusive lock and update the version column, the locked entity can be changed
 */
@Service
public class PessimisticLockingDbService implements LockingDbService {

  private final FlightRepository flightRepository;

  private final TicketRepository ticketRepository;

  public PessimisticLockingDbService(FlightRepository flightRepository, TicketRepository ticketRepository) {
    this.flightRepository = flightRepository;
    this.ticketRepository = ticketRepository;
  }

  private void saveNewTicket(String firstName, String lastName, Flight flight) throws Exception {
    if (flight.getCapacity() <= flight.getTickets().size()) {
      throw new ExceededCapacityException();
    }
    var ticket = new Ticket();
    ticket.setFirstName(firstName);
    ticket.setLastName(lastName);
    flight.addTicket(ticket);
    ticketRepository.save(ticket);
  }

  @Transactional
  @Override
  public void changeFlight1() throws Exception {
    var flight = flightRepository.findWithPessimisticLockingById(1L).get();
    saveNewTicket("Robert", "Smith", flight);
    Thread.sleep(1_000);
  }

  @Transactional
  @Override
  public void changeFlight2() throws Exception {
    var flight = flightRepository.findWithPessimisticLockingById(1L).get();
    saveNewTicket("Kate", "Brown", flight);
    Thread.sleep(1_000);
  }

}
