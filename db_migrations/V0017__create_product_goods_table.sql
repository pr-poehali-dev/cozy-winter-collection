-- Создаём таблицу для вариантов товаров (goods)
CREATE TABLE IF NOT EXISTS t_p3876556_cozy_winter_collecti.product_goods (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  size VARCHAR(100),
  color VARCHAR(100),
  stock INTEGER DEFAULT 0,
  price NUMERIC(10, 2),
  weight VARCHAR(50),
  description TEXT,
  composition TEXT,
  sizing TEXT,
  gallery TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_product_goods_product_id ON t_p3876556_cozy_winter_collecti.product_goods(product_id);
CREATE INDEX idx_product_goods_sku ON t_p3876556_cozy_winter_collecti.product_goods(sku);
