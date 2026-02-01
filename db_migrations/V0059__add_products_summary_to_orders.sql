-- Добавляем колонку для краткого описания товаров в заказе
ALTER TABLE orders ADD COLUMN products_summary TEXT;