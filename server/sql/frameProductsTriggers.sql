-- Function for updating frame_details_reference_ids based on frame_companies
CREATE OR REPLACE FUNCTION update_frame_details_reference_ids_company()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE frame_details_reference_ids 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE f_company_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function for updating frame_details_reference_ids based on frame_material_types
CREATE OR REPLACE FUNCTION update_frame_details_reference_ids_material()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE frame_details_reference_ids 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE f_material_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function for updating frame_details_reference_ids based on frame_model_types
CREATE OR REPLACE FUNCTION update_frame_details_reference_ids_model()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE frame_details_reference_ids 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE f_model_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function for updating frame_details_reference_ids based on frame_sizes
CREATE OR REPLACE FUNCTION update_frame_details_reference_ids_size()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE frame_details_reference_ids 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE f_size_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function for updating frame_details based on frame_details_reference_ids
CREATE OR REPLACE FUNCTION update_frame_details_status()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE frame_details
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE f_reference_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for frame_companies
CREATE OR REPLACE TRIGGER trigger_on_update_frame_companies
AFTER UPDATE ON frame_companies
FOR EACH ROW 
EXECUTE FUNCTION update_frame_details_reference_ids_company();

-- Trigger for frame_material_types
CREATE OR REPLACE TRIGGER trigger_on_update_frame_materials
AFTER UPDATE ON frame_material_types
FOR EACH ROW 
EXECUTE FUNCTION update_frame_details_reference_ids_material();

-- Trigger for frame_model_types
CREATE OR REPLACE TRIGGER trigger_on_update_frame_models
AFTER UPDATE ON frame_model_types
FOR EACH ROW 
EXECUTE FUNCTION update_frame_details_reference_ids_model();

-- Trigger for frame_sizes
CREATE OR REPLACE TRIGGER trigger_on_update_frame_sizes
AFTER UPDATE ON frame_sizes
FOR EACH ROW 
EXECUTE FUNCTION update_frame_details_reference_ids_size();

-- Trigger for frame_details_reference_ids
CREATE OR REPLACE TRIGGER trigger_on_update_frame_details_reference_ids
AFTER UPDATE ON frame_details_reference_ids
FOR EACH ROW 
EXECUTE FUNCTION update_frame_details_status();
