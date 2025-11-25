-- Добавляем поля для доставки в таблицу orders
ALTER TABLE orders 
ADD COLUMN delivery_service VARCHAR(50),
ADD COLUMN delivery_phone VARCHAR(50),
ADD COLUMN delivery_address TEXT,
ADD COLUMN delivery_status VARCHAR(50) DEFAULT 'pending';

-- Создаем таблицу товаров в заказе
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индекс для быстрого поиска товаров заказа
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
