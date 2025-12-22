-- Удаление галереи из подарочного сертификата
UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = NULL
WHERE id = 1000;