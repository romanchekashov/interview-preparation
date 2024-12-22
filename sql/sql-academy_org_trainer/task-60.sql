-- https://sql-academy.org/ru/trainer/tasks/60
-- MySQL
-- Выведите идентификаторы преподавателей, которые хотя бы один раз за всё время преподавали в каждом из одиннадцатых классов.
-- Поля в результирующей таблице: teacher

SELECT teacher
FROM (
		SELECT teacher,
			class
		from Schedule
		WHERE class in (
				select id
				from class
				WHERE name like '%11%'
			)
		GROUP BY teacher,
			class
	) as teacher_11class
GROUP BY teacher
HAVING COUNT(teacher) = (
		select count(*)
		from class
		WHERE name like '%11%'
	)
