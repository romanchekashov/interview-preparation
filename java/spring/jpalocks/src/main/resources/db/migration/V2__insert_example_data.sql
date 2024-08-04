insert into flights (id, number, departure_time, capacity)
values (1, 'FLT123', '2022-04-01 09:00:00+03', 2),
       (2, 'FLT234', '2022-04-10 10:30:00+03', 50);

insert into tickets (id, flight_id, first_name, last_name)
values (NEXTVAL('ticket_id_seq'), 1, 'Paul', 'Lee');
