-- Обновляем тестовый продукт 999 на игрушку луна
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'и г р у ш к а 🌙 :: луна',
  description = 'мягкая луна с вышитым лицом',
  price = 2800,
  category = 'для дома',
  in_stock = true,
  stock = 3,
  image = 'https://cdn.poehali.dev/files/1a4e247e-9cc3-4bb6-a09f-a0fddbbf48a7.jpg',
  badge = NULL,
  gallery = ARRAY['https://cdn.poehali.dev/files/1a4e247e-9cc3-4bb6-a09f-a0fddbbf48a7.jpg'],
  story_description = 'твой маленький ночной хранитель 🌙',
  composition = 'хлопок, холлофайбер, ручная вышивка',
  variants = NULL,
  video_url = NULL,
  video_title = NULL,
  sizing = 'размер: 25 см'
WHERE id = 999;
