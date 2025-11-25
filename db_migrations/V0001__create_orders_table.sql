-- Создаем таблицу заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RUB',
    status VARCHAR(50) DEFAULT 'pending',
    payment_url TEXT,
    robokassa_inv_id INTEGER UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Создаем индексы для быстрого поиска
CREATE INDEX idx_orders_email ON orders(user_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_robokassa_inv_id ON orders(robokassa_inv_id);

-- Создаем последовательность для robokassa_inv_id (начинаем с 1)
CREATE SEQUENCE IF NOT EXISTS robokassa_inv_id_seq START 1;
