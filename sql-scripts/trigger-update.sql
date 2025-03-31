CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_DATE; -- Automatically set updated_at to the current date
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
