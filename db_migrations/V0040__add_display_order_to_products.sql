-- Добавление поля display_order для управления порядком отображения товаров
ALTER TABLE t_p3876556_cozy_winter_collecti.products 
ADD COLUMN display_order INTEGER DEFAULT 999;

-- Установка начальных значений display_order на основе id товаров
UPDATE t_p3876556_cozy_winter_collecti.products 
SET display_order = id * 10;

-- Создание индекса для оптимизации сортировки
CREATE INDEX idx_products_display_order ON t_p3876556_cozy_winter_collecti.products(display_order);