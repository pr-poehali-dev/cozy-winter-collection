-- Добавление полей для анонимных заказов и подарков
ALTER TABLE t_p3876556_cozy_winter_collecti.orders
ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE,
ADD COLUMN is_gift BOOLEAN DEFAULT FALSE,
ADD COLUMN recipient_phone VARCHAR(50),
ADD COLUMN recipient_address TEXT;

COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.orders.is_anonymous IS 'Анонимный заказ (без имени на упаковке)';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.orders.is_gift IS 'Заказ в подарок другому человеку';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.orders.recipient_phone IS 'Телефон получателя подарка';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.orders.recipient_address IS 'Адрес ПВЗ получателя подарка';