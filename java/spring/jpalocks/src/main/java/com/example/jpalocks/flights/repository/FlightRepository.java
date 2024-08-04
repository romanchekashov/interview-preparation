package com.example.jpalocks.flights.repository;

import com.example.jpalocks.flights.models.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Long> { }
