-- Добавляем поля для типа доставки и стоимости доставки
ALTER TABLE orders ADD COLUMN delivery_type VARCHAR(50);
ALTER TABLE orders ADD COLUMN delivery_cost NUMERIC(10, 2) DEFAULT 0;