CREATE TABLE cart_items (
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE, -- Foreign key from carts table, delete items when a cart is deleted
    product_id UUID NOT NULL,                                    -- Product ID, must be provided
    count INT NOT NULL CHECK (count > 0),                        -- Integer, must be positive
    PRIMARY KEY (cart_id, product_id)                            -- Composite primary key: ensures unique cart-item pairing
);

