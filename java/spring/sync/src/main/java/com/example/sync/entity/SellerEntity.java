package com.example.sync.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "sellers")
@SequenceGenerator(name = "sellerSeq", sequenceName = "sellers_id_seq", allocationSize = 1)
public class SellerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sellerSeq")
    private Long id;

    @Column(name = "inn", nullable = false)
    private Long inn;

    @EqualsAndHashCode.Include
    @Column(name = "name", unique = true, nullable = false, length = 255)
    private String name;
}
