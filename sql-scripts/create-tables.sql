CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Primary key and auto-generated UUID
    user_id UUID NOT NULL,                        -- UUID, not null (not a foreign key)
    created_at DATE NOT NULL DEFAULT CURRENT_DATE, -- Automatically set to today's date
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE, -- Automatically set to today's date
    status cart_status NOT NULL -- enum, not null
);

CREATE TABLE cart_items (
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE, -- Foreign key from carts table, delete items when a cart is deleted
    product_id UUID NOT NULL,                                    -- Product ID, must be provided
    count INT NOT NULL CHECK (count > 0),                        -- Integer, must be positive
    PRIMARY KEY (cart_id, product_id)                            -- Composite primary key: ensures unique cart-item pairing
);

