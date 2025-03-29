--function to update the status of reference details on update of company
CREATE OR REPLACE FUNCTION update_lens_reference_details_status_company()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lens_reference_details 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE l_company_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--function to update the status of reference details on update of material
CREATE OR REPLACE FUNCTION update_lens_reference_details_status_material()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lens_reference_details 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE l_material_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--function to update the status of reference details on update of model
CREATE OR REPLACE FUNCTION update_lens_reference_details_status_model()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lens_reference_details 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE l_model_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--function to update the status of reference details on update of type
CREATE OR REPLACE FUNCTION update_lens_reference_details_status_type()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lens_reference_details 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE l_type_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_lens_details_status()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lens_details 
    SET status = NEW.status,updated_at = CURRENT_TIMESTAMP
    WHERE l_reference_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on lens_companies
CREATE OR REPLACE TRIGGER trigger_on_update_lens_companies
AFTER UPDATE ON lens_companies
FOR EACH ROW 
EXECUTE FUNCTION update_lens_reference_details_status_company();

-- Trigger on lens_materials
CREATE OR REPLACE TRIGGER trigger_on_update_lens_material
AFTER UPDATE ON lens_materials
FOR EACH ROW 
EXECUTE FUNCTION update_lens_reference_details_status_material();

-- Trigger on lens_models
CREATE OR REPLACE TRIGGER trigger_on_update_lens_model
AFTER UPDATE ON lens_models
FOR EACH ROW 
EXECUTE FUNCTION update_lens_reference_details_status_model();

-- Trigger on lens_types
CREATE OR REPLACE TRIGGER trigger_on_update_lens_types
AFTER UPDATE ON lens_types
FOR EACH ROW 
EXECUTE FUNCTION update_lens_reference_details_status_type();

-- Trigger on lens_reference_details
CREATE OR REPLACE TRIGGER trigger_on_update_lens_reference_details
AFTER UPDATE ON lens_reference_details
FOR EACH ROW 
EXECUTE FUNCTION update_lens_details_status();
