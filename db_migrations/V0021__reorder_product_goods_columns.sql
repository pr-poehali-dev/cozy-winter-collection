
CREATE TABLE t_p3876556_cozy_winter_collecti.product_goods_new (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
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
    gallery TEXT[]
);

INSERT INTO t_p3876556_cozy_winter_collecti.product_goods_new 
    (id, product_name, product_id, sku, size, color, stock, price, weight, description, composition, sizing, gallery)
SELECT 
    id, product_name, product_id, sku, size, color, stock, price, weight, description, composition, sizing, gallery
FROM t_p3876556_cozy_winter_collecti.product_goods
ORDER BY id;

ALTER TABLE t_p3876556_cozy_winter_collecti.product_goods RENAME TO product_goods_old;
ALTER TABLE t_p3876556_cozy_winter_collecti.product_goods_new RENAME TO product_goods;

ALTER SEQUENCE t_p3876556_cozy_winter_collecti.product_goods_id_seq OWNED BY t_p3876556_cozy_winter_collecti.product_goods.id;

COMMENT ON TABLE t_p3876556_cozy_winter_collecti.product_goods IS 'Варианты товаров (цвета, размеры)';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.id IS 'ID варианта';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.product_name IS 'Название товара';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.product_id IS 'ID товара';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.sku IS 'Артикул';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.size IS 'Размер';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.color IS 'Цвет/Вариант';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.stock IS 'Остаток на складе';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.price IS 'Цена';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.weight IS 'Вес';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.description IS 'Описание варианта';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.composition IS 'Состав';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.sizing IS 'Размерная сетка';
COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.gallery IS 'Галерея фото';
