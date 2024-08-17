package com.example.transaction_2_phase_commit.users.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(of = {"id", "name"})
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private BigDecimal balance;

  // Getters and Setters
}
