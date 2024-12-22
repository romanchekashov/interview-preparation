-- https://sql-academy.org/ru/trainer/tasks/58
-- MySQL
-- Добавить отзыв с рейтингом 5 на жилье, находящиеся по адресу "11218, Friel Place, New York", от имени "George Clooney"
-- В качестве первичного ключа (id) укажите количество записей в таблице + 1.
-- Резервация комнаты, на которую вам нужно оставить отзыв, уже была сделана, нужно лишь ее найти.

INSERT INTO Reviews
VALUES (
		(
			select count(*)
			FROM Reviews r
		) + 1,
		(
			SELECT id
			FROM Reservations
			WHERE user_id = (
					SELECT id
					FROM Users
					WHERE name = 'George Clooney'
				)
				AND room_id = (
					SELECT id
					FROM Rooms
					WHERE address = '11218, Friel Place, New York'
				)
		),
		5
	);
