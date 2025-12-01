-- Создаём таблицу для хранения списка администраторов Telegram-бота
CREATE TABLE IF NOT EXISTS t_p3876556_cozy_winter_collecti.bot_admins (
    id SERIAL PRIMARY KEY,
    chat_id VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Добавляем текущего администратора
INSERT INTO t_p3876556_cozy_winter_collecti.bot_admins (chat_id, username, first_name, is_active)
VALUES ('7706163913', 'azalihalimova', 'Azali', TRUE)
ON CONFLICT (chat_id) DO NOTHING;