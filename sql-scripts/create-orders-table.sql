CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    payment JSON NOT NULL,
    delivery JSON NOT NULL,
    comments TEXT,
    status order_status NOT NULL,     -- Use ENUM type for status
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
