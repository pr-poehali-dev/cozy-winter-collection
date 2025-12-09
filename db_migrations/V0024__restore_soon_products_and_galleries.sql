
UPDATE t_p3876556_cozy_winter_collecti.products 
SET in_stock = true
WHERE id IN (7, 8);

UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/files/ac09b638-81c4-400e-8704-6e2e5b3c96cd.jpg',
  'https://cdn.poehali.dev/files/7905e08b-5abf-47d9-92a6-fd45bf08f45c.jpg',
  'https://cdn.poehali.dev/files/fc95c5e5-6c9a-4281-9a39-e9a642920769.jpg',
  'https://cdn.poehali.dev/files/69416a27-a379-4a16-8d57-60207861a8ec.jpg'
]
WHERE id = 9;

UPDATE t_p3876556_cozy_winter_collecti.products 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/files/1215fc8d-4530-4f4f-8b6a-46cf0489a809.jpg',
  'https://cdn.poehali.dev/files/f2195380-bf93-41cf-9947-8de6ba10119c.jpg',
  'https://cdn.poehali.dev/files/852a81f2-359b-4de0-895e-2ff18dc66df1.jpg',
  'https://cdn.poehali.dev/files/1a9f723e-68d6-489f-b402-f346dc70a2c6.jpg',
  'https://cdn.poehali.dev/files/4d28d0ed-de13-4574-8ea5-26387a981d2f.jpg',
  'https://cdn.poehali.dev/files/6c142501-82e6-44cd-8291-45c5ef8add5f.jpg'
]
WHERE id = 6;
