-- Создание таблицы для отзывов
CREATE TABLE IF NOT EXISTS t_p3876556_cozy_winter_collecti.reviews (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('text', 'image')),
  text TEXT,
  image TEXT,
  author VARCHAR(255) NOT NULL,
  time VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Добавляем существующие отзывы
INSERT INTO t_p3876556_cozy_winter_collecti.reviews (type, image, author, time, display_order) VALUES
  ('image', 'https://cdn.poehali.dev/files/73260439-3326-4728-bed2-076f231d3fdc.jpg', 'Анастасия', '14:23', 1);

INSERT INTO t_p3876556_cozy_winter_collecti.reviews (type, text, author, time, display_order) VALUES
  ('text', 'Спасибо большое!!! Это лучшее приобретение этой осени. Ношу его не снимая. Очень тепло и уютно ❤️ Наконец-то решена проблема с укладкой и челкой 😍 Все у меня спрашивают, где я заказывала, только и успеваю отбиваться 😂 Качество превосходное, очень мягкая и приятная ткань. Сидит идеально, не сползает.', 'Виктория', '14:24', 2);

INSERT INTO t_p3876556_cozy_winter_collecti.reviews (type, text, author, time, display_order) VALUES
  ('text', 'Косынка пришла в самой красивой упаковке, которую я когда-либо видела. Носить её — как обнять что-то тёплое и родное 🤍 Очень довольна покупкой!', 'Мария', '11:45', 3);