package com.example.jpalocks.flights.repository;

import com.example.jpalocks.flights.models.Ticket;
import org.springframework.data.repository.CrudRepository;

public interface TicketRepository extends CrudRepository<Ticket, Long> { }
