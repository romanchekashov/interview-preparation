package com.example.transaction_2_phase_commit.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MoneyTransferRequest {

    private Long userId;
    private Long orderId;
    private BigDecimal amount;

}
