-- https://sql-academy.org/ru/trainer/tasks/45
-- MySQL
-- Какие кабинеты чаще всего использовались для проведения занятий? Выведите те, которые использовались максимальное количество раз.
-- Поля в результирующей таблице: classroom

select classroom
from Schedule
GROUP BY classroom
HAVING count(classroom) = (
		select count(classroom)
		from Schedule
		GROUP BY classroom
		ORDER BY count(classroom) desc
		LIMIT 1
	);
