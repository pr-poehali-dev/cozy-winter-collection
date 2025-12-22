-- Исправляем порядок фото бордовой паутинки (9120 → 9126)
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

-- Вариант кроп (id=12)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9120.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9121.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9122.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9123.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9124.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9125.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9126.jpeg'
]
WHERE id = 12;

-- Вариант полноразмерный (id=13)
UPDATE t_p3876556_cozy_winter_collecti.product_goods 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9120.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9121.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9122.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9123.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9124.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9125.jpeg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/9126.jpeg'
]
WHERE id = 13;