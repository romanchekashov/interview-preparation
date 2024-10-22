package com.example.sync.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "products")
@SequenceGenerator(name = "productSeq", sequenceName = "products_id_seq", allocationSize = 1)
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "productSeq")
    private Long id;

    @EqualsAndHashCode.Include
    @Column(name = "name", unique = true, nullable = false, length = 128)
    private String name;

    @Column(name = "synced", nullable = false)
    private boolean synced;

    @ManyToOne
    @JoinColumn(name = "seller_id", insertable = false, updatable = false)
    private SellerEntity seller;

    @ManyToOne
    @JoinColumn(name = "shop_id", insertable = false, updatable = false)
    private ShopEntity shop;
}
