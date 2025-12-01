-- Создаём таблицу товаров
CREATE TABLE IF NOT EXISTS t_p3876556_cozy_winter_collecti.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    category VARCHAR(100),
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);