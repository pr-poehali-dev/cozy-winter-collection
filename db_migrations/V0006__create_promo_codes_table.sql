-- Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial promo codes
INSERT INTO promo_codes (code, discount_percent, description, active) VALUES
    ('AZALUK10', 10, 'Скидка 10% на весь заказ', true),
    ('WINTER15', 15, 'Зимняя скидка 15%', true)
ON CONFLICT (code) DO NOTHING;