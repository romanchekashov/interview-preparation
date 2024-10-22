package com.example.sync.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "shops")
@SequenceGenerator(name = "shopSeq", sequenceName = "shops_id_seq", allocationSize = 1)
public class ShopEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shopSeq")
    private Long id;

    @EqualsAndHashCode.Include
    @Column(name = "name", unique = true, nullable = false, length = 128)
    private String name;

    @Column(name = "synced", nullable = false)
    private boolean synced;

    /**
     * Hibernate N+1 problem occurs when you use FetchType.LAZY for your entity associations. Fix:
     * 1. (1 query) entityManager.createQuery(select distinct a from Author a left join fetch a.books, Author.class);
     * 2. ((N/M +1) queries) @BatchSize(size = 10)
     * 3. (2 queries) @Fetch(FetchMode.SUBSELECT):
     *   - SELECT * FROM authors;
     *   - SELECT * FROM books WHERE author_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     *
     * NOTE: Less calls to DB means better performance:
     * 1. less network overhead (less waiting for data to be transferred several times),
     * 2. less time spent on parsing SQL,
     * 3. less time spent on executing SQL,
     * 4. less time spent on fetching data from DB.
     */
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 20000)
//    @Fetch(FetchMode.SUBSELECT)
    private List<ProductEntity> products;
}
