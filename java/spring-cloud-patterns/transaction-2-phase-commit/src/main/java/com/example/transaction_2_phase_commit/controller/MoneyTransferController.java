package com.example.transaction_2_phase_commit.controller;

import com.example.transaction_2_phase_commit.dto.MoneyTransferRequest;
import com.example.transaction_2_phase_commit.services.TransferService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/money")
@Slf4j
public class MoneyTransferController {

    private final TransferService transferService;

    public MoneyTransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping("/transfer")
    @ResponseStatus(HttpStatus.CREATED)
    public void transfer(@RequestBody MoneyTransferRequest dto) {
        log.info("Received money transfer request: {}", dto);
        transferService.transferMoney(dto);
        log.info("Money transfer request processed: {}", dto);
    }

}
