SELECT SUM(amount) as march_sales
FROM orders 
WHERE strftime('%Y-%m', order_date) = '2024-03';

SELECT customer, SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

SELECT ROUND(AVG(amount), 2) as average_order_value
FROM orders;
