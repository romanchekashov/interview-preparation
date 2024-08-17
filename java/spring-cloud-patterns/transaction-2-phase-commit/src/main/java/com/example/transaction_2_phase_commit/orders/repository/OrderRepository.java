package com.example.transaction_2_phase_commit.orders.repository;

import com.example.transaction_2_phase_commit.orders.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
