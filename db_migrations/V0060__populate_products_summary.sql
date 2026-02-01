-- Заполняем колонку products_summary для существующих заказов
UPDATE orders o 
SET products_summary = (
  SELECT string_agg(oi.product_name || ' x' || oi.quantity, ', ' ORDER BY oi.id)
  FROM order_items oi 
  WHERE oi.order_id = o.id
);