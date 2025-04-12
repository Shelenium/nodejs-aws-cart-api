CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON carts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();