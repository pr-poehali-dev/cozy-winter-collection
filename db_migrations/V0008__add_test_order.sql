-- Добавляем тестовый заказ для проверки email-уведомлений
INSERT INTO t_p3876556_cozy_winter_collecti.orders (
    order_number, 
    user_name, 
    user_email, 
    user_phone,
    amount, 
    currency, 
    status,
    delivery_address,
    delivery_type,
    delivery_cost,
    telegram_notified,
    created_at,
    updated_at
) VALUES (
    'ORD-TEST-123',
    'Тест',
    'test@example.com',
    '+79991234567',
    1990.00,
    'RUB',
    'paid',
    'Москва, м. Тульская',
    'pvz',
    0,
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (order_number) DO NOTHING;

-- Добавляем тестовые товары в заказ
INSERT INTO t_p3876556_cozy_winter_collecti.order_items (
    order_id,
    product_id,
    product_name,
    product_price,
    quantity
)
SELECT 
    o.id,
    1,
    'Тестовый товар',
    1990.00,
    1
FROM t_p3876556_cozy_winter_collecti.orders o
WHERE o.order_number = 'ORD-TEST-123'
ON CONFLICT DO NOTHING;