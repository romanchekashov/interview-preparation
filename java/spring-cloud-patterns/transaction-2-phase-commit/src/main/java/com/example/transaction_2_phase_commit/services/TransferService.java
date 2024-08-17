package com.example.transaction_2_phase_commit.services;

import com.example.transaction_2_phase_commit.dto.MoneyTransferRequest;
import com.example.transaction_2_phase_commit.orders.domain.Order;
import com.example.transaction_2_phase_commit.orders.repository.OrderRepository;
import com.example.transaction_2_phase_commit.users.domain.User;
import com.example.transaction_2_phase_commit.users.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Slf4j
public class TransferService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private OrderRepository orderRepository;

  @Transactional
  public void transferMoney(MoneyTransferRequest dto) {
    // Update datasource 1
    User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
    user.setBalance(user.getBalance().subtract(dto.getAmount()));
    userRepository.save(user);
    log.info("User balance updated {}", user);

    // Update datasource 2
    Order order = orderRepository.findById(dto.getOrderId()).orElseThrow(() -> new RuntimeException("Order not found"));
    order.setAmountPaid(order.getAmountPaid().add(dto.getAmount()));
    orderRepository.save(order);
    log.info("Order updated {}", order);

    // Both updates are committed or rolled back together
  }
}
