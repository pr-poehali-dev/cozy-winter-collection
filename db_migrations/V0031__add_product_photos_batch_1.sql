-- Обновляем фотографии для товаров

-- id=1: Брусничный чепчик
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/100.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/100.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/101.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/102.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/103.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/104.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/105.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/106.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/107.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/108.jpeg'
  ]
WHERE id = 1;

-- Варианты брусничного чепчика (лёгкий)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/100.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/101.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/102.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/103.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/104.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/105.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/106.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/107.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/108.jpeg'
]
WHERE id = 1;

-- Варианты брусничного чепчика (утеплённый)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/100.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/101.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/102.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/103.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/104.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/105.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/106.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/107.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/108.jpeg'
]
WHERE id = 2;

-- id=2: Молочный чепчик
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/200.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/200.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/201.jpeg'
  ]
WHERE id = 2;

-- Варианты молочного чепчика - лёгкий (id=3)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/210.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/211.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/212.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/213.jpeg'
]
WHERE id = 3;

-- Варианты молочного чепчика - воздушный (id=4)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/220.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/221.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/222.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/223.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/224.jpeg'
]
WHERE id = 4;

-- Варианты молочного чепчика - утеплённый (id=5)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/230.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/231.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/232.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/233.jpeg'
]
WHERE id = 5;

-- id=7: Блюдце
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/30.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/30.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/31.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/32.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/33.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/34.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/36.jpeg'
  ]
WHERE id = 7;

-- id=6: Гирлянда
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/60.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/60.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/61.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/62.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/63.jpeg'
  ]
WHERE id = 6;

-- id=4: Подвес сладкая тьма - вариант с расшивкой (id=7)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/480.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/481.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/482.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/483.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/484.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/485.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/486.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/487.jpeg'
]
WHERE product_id = 4 AND sku = 'embroidered';

-- id=4: Подвес сладкая тьма - вариант классический (id=8)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/490.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/491.jpeg'
]
WHERE product_id = 4 AND sku = 'simple';

-- Обновляем обложку товара id=4
UPDATE t_p3876556_cozy_winter_collecti.products 
SET image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/480.jpeg'
WHERE id = 4;