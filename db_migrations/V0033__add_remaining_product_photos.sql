-- Добавляем фото для оставшихся товаров

-- id=3: Подвес мухомор - обложка товара
UPDATE t_p3876556_cozy_winter_collecti.products 
SET image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/360.jpeg'
WHERE id = 3;

-- id=3: Подвес мухомор - вариант с расшивкой
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/361.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/362.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/363.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/364.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/365.jpeg'
]
WHERE product_id = 3 AND sku = 'embroidered';

-- id=3: Подвес мухомор - вариант классический
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/370.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/371.jpeg'
]
WHERE product_id = 3 AND sku = 'simple';

-- id=5: Молочная паутинка - обложка и основная галерея
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5100.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5100.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5101.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5103.jpeg'
  ]
WHERE id = 5;

-- id=5: Молочная паутинка - вариант кроп (id=10)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5110.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5111.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5112.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5113.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5114.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5115.jpeg'
]
WHERE product_id = 5 AND sku = 'crop-milk';

-- id=5: Молочная паутинка - вариант полноразмерный (id=11)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5100.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5101.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5103.jpeg'
]
WHERE product_id = 5 AND sku = 'full-milk';

-- id=9: Бордовая паутинка - обложка и основная галерея
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9120.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9120.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9121.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9122.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9123.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9124.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9125.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9126.jpeg'
  ]
WHERE id = 9;

-- id=9: Бордовая паутинка - вариант кроп (id=12)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9120.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9121.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9122.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9123.jpeg'
]
WHERE id = 12;

-- id=9: Бордовая паутинка - вариант полноразмерный (id=13)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9124.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9125.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9126.jpeg'
]
WHERE id = 13;