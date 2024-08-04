package com.example.jpalocks.flights.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "tickets")
@SequenceGenerator(name = "ticketSeq", sequenceName = "ticket_id_seq", allocationSize = 1)
@EqualsAndHashCode(of = {"id", "flight", "firstName", "lastName"})
public class Ticket {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ticketSeq")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "flight_id")
  private Flight flight;

  private String firstName;

  private String lastName;
}
