package com.example.transaction_2_phase_commit.orders.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "orders")
@SequenceGenerator(name = "orderSeq", sequenceName = "order_id_seq", allocationSize = 1)
@Data
@EqualsAndHashCode(of = {"id", "product"})
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orderSeq")
  private Long id;
  private String product;
  private BigDecimal amountPaid;

  // Getters and Setters
}
