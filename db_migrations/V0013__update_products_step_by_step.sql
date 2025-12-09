-- Обновляем товар 1
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'ч е п ч и к 🍷 :: брусника',
  description = 'тёплый чепчик брусничного оттенка',
  price = 3000,
  category = 'для зимней прогулки',
  stock = 5,
  image = 'https://cdn.poehali.dev/files/8d4e93bf-b045-43f7-a2b4-f7eba8e95681.jpeg',
  badge = 'Хит продаж',
  story_description = 'этот чепчик — как объятие холодным зимним утром',
  composition = '50% шерсть, 50% акрил или мохер с шерстью',
  variants = '[{"size": "универсальный", "color": "лёгкий", "stock": 3, "sku": "CH-BR-L"}, {"size": "универсальный", "color": "утеплённый", "stock": 2, "sku": "CH-BR-W"}]'::jsonb
WHERE id = 1;

-- Обновляем товар 2
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'ч е п ч и к 🤍 :: молочный',
  description = 'мягкий вязаный чепчик из мохера',
  price = 3000,
  category = 'для зимней прогулки',
  stock = 5,
  image = 'https://cdn.poehali.dev/files/4ec132db-57cd-4bc3-a373-bbc64944f6cb.jpg',
  badge = NULL,
  story_description = 'нежный, как пенка на латте',
  composition = 'мохер, шерсть',
  variants = '[{"size": "универсальный", "color": "лёгкий", "stock": 2, "sku": "CH-ML-L"}, {"size": "универсальный", "color": "воздушный", "stock": 2, "sku": "CH-ML-A"}, {"size": "универсальный", "color": "утеплённый", "stock": 1, "sku": "CH-ML-W"}]'::jsonb
WHERE id = 2;

-- Обновляем товар 3
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'п о д в е с 🍄 :: мухомор',
  description = 'функциональный подвес для помады',
  price = 1800,
  category = 'аксессуары',
  stock = 3,
  image = 'https://cdn.poehali.dev/files/59e4fcf5-58c4-4b13-971c-041b7c1d5e85.jpg',
  badge = NULL,
  story_description = 'маленькое лесное чудо',
  composition = 'ручная работа',
  variants = '[{"size": "универсальный", "color": "с расшивкой", "stock": 2, "sku": "PD-MH-E"}, {"size": "универсальный", "color": "классический", "stock": 1, "sku": "PD-MH-S"}]'::jsonb,
  video_url = NULL,
  video_title = NULL
WHERE id = 3;

-- Обновляем товар 4
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'п о д в е с 🌑 :: сладкая тьма',
  description = 'грибочек с блёстками',
  price = 1800,
  category = 'аксессуары',
  stock = 3,
  image = 'https://cdn.poehali.dev/files/b1209a34-4f59-4ad2-be9b-5fae95e5d682.jpg',
  badge = NULL,
  story_description = 'загадочный грибочек из леса',
  composition = 'ручная работа',
  variants = '[{"size": "универсальный", "color": "с блёстками", "stock": 2, "sku": "PD-TD-G"}, {"size": "универсальный", "color": "классический", "stock": 1, "sku": "PD-TD-S"}]'::jsonb
WHERE id = 4;

-- Обновляем товар 5
UPDATE t_p3876556_cozy_winter_collecti.products SET
  name = 'п о д у ш к а ☁️ :: облачко',
  description = 'мягкая подушка-облако',
  price = 3500,
  category = 'для дома',
  stock = 4,
  image = 'https://cdn.poehali.dev/files/0b9e1df2-dd70-46b0-85d3-5e9b16c90d75.jpg',
  badge = 'Новинка',
  story_description = 'кусочек неба в комнате',
  composition = 'плюшевый велюр, холлофайбер',
  variants = '[{"size": "маленькая", "color": "белый", "stock": 2, "sku": "PD-CL-S"}, {"size": "большая", "color": "белый", "stock": 2, "sku": "PD-CL-L"}]'::jsonb
WHERE id = 5;
