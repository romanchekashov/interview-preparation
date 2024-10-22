package com.example.sync.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ProductDto {
    private long id;
    private String name;
    private String sellerDetails;
}
