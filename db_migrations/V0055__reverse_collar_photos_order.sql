-- Переворачиваем порядок фотографий для воротничка (id 1004)
UPDATE products 
SET 
  image = 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/86cf6a29-f80e-4a42-a3dd-f4a8f1b8578c.jpeg',
  gallery = ARRAY[
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/86cf6a29-f80e-4a42-a3dd-f4a8f1b8578c.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/c7786506-0483-4315-8be7-5c05d0fd45f4.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/aa0e9e80-ba39-4643-95ba-1ab848af3471.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/981efb32-6ecd-4edd-b561-33b31ed0d165.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/278562ad-ea40-4b32-9b7a-208994176762.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/a7ea9c8d-fed4-476b-960c-fef9511d397d.jpeg',
    'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/1ba131db-1399-4ab2-9cd3-30d740caa227.jpeg'
  ],
  updated_at = CURRENT_TIMESTAMP
WHERE id = 1004;