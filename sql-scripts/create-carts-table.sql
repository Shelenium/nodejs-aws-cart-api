CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Primary key and auto-generated UUID
    user_id UUID NOT NULL,                        -- UUID, not null (not a foreign key)
    created_at DATE NOT NULL DEFAULT CURRENT_DATE, -- Automatically set to today's date
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE, -- Automatically set to today's date
    status cart_status NOT NULL -- enum, not null
);
