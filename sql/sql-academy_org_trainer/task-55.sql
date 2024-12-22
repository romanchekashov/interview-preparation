-- https://sql-academy.org/ru/trainer/tasks/55
-- MySQL
-- Удалить компании, совершившие наименьшее количество рейсов.

DELETE FROM company
WHERE id in (
		select company
		FROM trip
		GROUP BY company
		HAVING count(company) = (
				select count(company)
				FROM trip
				GROUP BY company
				ORDER BY count(company)
				LIMIT 1
			)
	);
