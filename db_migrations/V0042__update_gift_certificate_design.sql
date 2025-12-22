-- Обновление изображений для подарочного сертификата в стилистике сайта
UPDATE t_p3876556_cozy_winter_collecti.products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/4a7bcc63-0c10-4a28-a3d1-08a8343f2adb.jpg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/4a7bcc63-0c10-4a28-a3d1-08a8343f2adb.jpg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/files/6f029d22-a41b-465f-a94a-66d940b0e2f6.jpg'
  ]
WHERE id = 1000;