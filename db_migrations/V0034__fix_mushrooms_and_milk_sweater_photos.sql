-- Исправляем грибочки - обновляем на новые фото

-- Подвес мухомор (id=3) - с расшивкой
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/361.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/362.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/363.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/364.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/365.jpeg'
]
WHERE sku = 'PD-MH-EMB';

-- Подвес мухомор (id=3) - классический
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/370.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/371.jpeg'
]
WHERE sku = 'PD-MH-SMP';

-- Подвес сладкая тьма (id=4) - с расшивкой
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/481.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/482.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/483.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/484.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/485.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/486.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/487.jpeg'
]
WHERE sku = 'PD-TD-GLT';

-- Подвес сладкая тьма (id=4) - классический
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/491.jpeg'
]
WHERE sku = 'PD-TD-SMP';

-- Молочная паутинка (id=5) - кроп
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5110.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5111.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5112.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5113.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5114.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5115.jpeg'
]
WHERE sku = 'PAU-ML-CROP';

-- Молочная паутинка (id=5) - полноразмерная
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5100.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5101.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5103.jpeg'
]
WHERE sku = 'PAU-ML-FULL';