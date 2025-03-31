INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',   -- user_id
    '123e4567-e89b-12d3-a456-426655440000',   -- cart_id (must exist in `carts`)
    '{"method": "credit_card", "transaction_id": "txn_123456"}',  -- JSON for payment
    '{"address": "123 Main St, City, Country", "delivery_method": "courier"}', -- JSON for delivery
    'Please deliver before noon.',           -- comments
    'PENDING',                               -- status
    125.75                                   -- total
);
SELECT * FROM orders WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
