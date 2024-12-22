-- https://sql-academy.org/ru/trainer/tasks/44
-- MySQL
-- Найдите максимальный возраст (количество лет) среди обучающихся 10 классов на сегодняшний день. Для получения текущих даты и времени используйте функцию NOW().
-- Поля в результирующей таблице: max_year
-- Используйте конструкцию "as max_year" для указания максимального возраста в годах. Это необходимо для корректной проверки.

select MAX(TIMESTAMPDIFF(YEAR, birthday, NOW())) AS max_year
from student
where id in (
		select student
		from Student_in_class
		WHERE class in (
				select id
				from class
				where name like '%10%'
			)
	)
GROUP BY id
ORDER BY max_year DESC
LIMIT 1;
