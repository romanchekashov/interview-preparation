-- https://sql-academy.org/ru/trainer/tasks/69
-- MySQL
-- Вывести идентификаторы всех владельцев комнат, что размещены на сервисе бронирования жилья и сумму, которую они заработали
-- Поля в результирующей таблице: owner_id, total_earn
-- Используйте конструкцию "as owner_id" и "as total_earn" для вывода идентификаторов владельцев и заработанной суммы соответственно.

select owner_id,
	IFNULL(sum(total), 0) as total_earn
FROM Rooms
	LEFT JOIN Reservations r ON Rooms.id = r.room_id
GROUP BY owner_id;
