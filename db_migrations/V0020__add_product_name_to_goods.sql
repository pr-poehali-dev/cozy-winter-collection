
ALTER TABLE t_p3876556_cozy_winter_collecti.product_goods 
ADD COLUMN product_name VARCHAR(255);

UPDATE t_p3876556_cozy_winter_collecti.product_goods pg
SET product_name = p.name
FROM t_p3876556_cozy_winter_collecti.products p
WHERE pg.product_id = p.id;

COMMENT ON COLUMN t_p3876556_cozy_winter_collecti.product_goods.product_name IS 'Название товара';
