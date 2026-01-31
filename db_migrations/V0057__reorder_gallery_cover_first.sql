-- Переставляем обложку первой в галерее для товара 3 (мухомор)
UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/360.jpeg',
  'https://cdn.poehali.dev/files/59e4fcf5-58c4-4b13-971c-041b7c1d5e85.jpg'
]
WHERE id = 3;

-- Переставляем обложку первой в галерее для товара 1001 (брошь)
UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/a32f46d2-ecd4-435e-a502-80592201d0f8.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/5c321f9f-779a-47f0-965f-0c858e628fb3.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/61fb7da2-a7b3-43d3-aec8-3f43352e2273.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/b69b15b7-ef79-4e19-bff9-4340e7d763bd.jpg'
]
WHERE id = 1001;

-- Переставляем обложку первой в галерее для товара 1002 (кулон)
UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/b4bd031a-0cb4-412c-9537-94d7e311b2b5.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/0387b55e-6595-43ef-88db-f61eac5bf581.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/6f0869f6-ef01-46e1-8c10-bd892a349bbd.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/717ccfd2-ce4d-4d66-afdd-6b5c0c7b1f3c.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/0db79603-df63-405c-a77e-4daaa2ad0564.jpg'
]
WHERE id = 1002;

-- Переставляем обложку первой в галерее для товара 1005 (ожерелье)
UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/34c2f675-e649-4281-8e9e-85c835df501f.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/e3ff6e07-1f4b-46c8-883a-ce096c2fd93e.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/cfaa130a-8d46-4c1f-9baa-c2a6c6bc3005.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/c414531a-5902-408e-ac61-aeab684b5636.jpg',
  'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/de757b0d-c814-4fa6-a0f5-e952eadbb3fe.jpg'
]
WHERE id = 1005;