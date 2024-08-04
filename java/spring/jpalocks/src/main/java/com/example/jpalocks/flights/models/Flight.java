package com.example.jpalocks.flights.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
@Table(name = "flights")
@EqualsAndHashCode(of = {"id", "number", "departureTime", "capacity", "version"})
public class Flight {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String number;

  private LocalDateTime departureTime;

  private Integer capacity;

  @OneToMany(mappedBy = "flight")
  private Set<Ticket> tickets;

  @Version
  private Long version;

  public void addTicket(Ticket ticket) {
    ticket.setFlight(this);
    getTickets().add(ticket);
  }

}
