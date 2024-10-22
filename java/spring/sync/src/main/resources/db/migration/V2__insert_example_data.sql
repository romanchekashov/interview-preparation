insert into sellers (id, inn, name)
values (NEXTVAL('sellers_id_seq'), 1, 'seller-1'),
       (NEXTVAL('sellers_id_seq'), 2, 'seller-2');

insert into shops (id, name, synced)
values (NEXTVAL('shops_id_seq'), 'shop-1', false),
       (NEXTVAL('shops_id_seq'), 'shop-2', false);

insert into products (id, name, seller_id, shop_id, synced)
values (NEXTVAL('products_id_seq'), 'product-1', 1, 1, false),
       (NEXTVAL('products_id_seq'), 'product-2', 1, 1, false),
       (NEXTVAL('products_id_seq'), 'product-3', 2, 1, false),
       (NEXTVAL('products_id_seq'), 'product-4', 2, 1, false),

       (NEXTVAL('products_id_seq'), 'product-5', 1, 2, false),
       (NEXTVAL('products_id_seq'), 'product-6', 1, 2, false),
       (NEXTVAL('products_id_seq'), 'product-7', 2, 2, false),
       (NEXTVAL('products_id_seq'), 'product-8', 2, 2, false);
