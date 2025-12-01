-- Обновляем email тестового заказа для проверки писем
UPDATE t_p3876556_cozy_winter_collecti.orders 
SET user_email = 'azali.halimova@gmail.com' 
WHERE order_number = 'ORD-TEST-123';