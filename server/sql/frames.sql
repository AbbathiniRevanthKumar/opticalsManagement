CREATE TABLE frame_material_types
(
    id SERIAL PRIMARY KEY,
    f_material_code VARCHAR(10) NOT NULL,
    f_material_name VARCHAR(155) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_material_type UNIQUE (f_material_name)
    CONSTRAINT unique_material_code UNIQUE (f_material_code)
);

CREATE TABLE frame_model_types
(
    id SERIAL PRIMARY KEY,
    f_model_code VARCHAR(10) NOT NULL,
    f_model_name VARCHAR(155) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_model_type UNIQUE (f_model_name),
    CONSTRAINT unique_model_code UNIQUE (f_model_code)
);

CREATE TABLE frame_sizes
(
    id SERIAL PRIMARY KEY,
    f_size_code VARCHAR(10) NOT NULL,
    f_size VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_size UNIQUE (f_size),
    CONSTRAINT unique_size_code UNIQUE (f_size_code)
);

CREATE TABLE frame_companies
(
    id SERIAL PRIMARY KEY,
    f_company_code VARCHAR(10) NOT NULL,
    f_company_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_company UNIQUE (f_company_name),
    CONSTRAINT unique_company_code UNIQUE (f_company_code)
);

CREATE TABLE frame_prices
(
    id SERIAL PRIMARY KEY,
    f_purchase_price NUMERIC(10,2) NOT NULL,
    f_sales_price NUMERIC(10,2) NOT NULL,
    f_discount NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_frame_price UNIQUE(f_purchase_price,f_sales_price,f_discount)
);

CREATE TABLE frame_details_reference_ids(
    id SERIAL PRIMARY KEY,
    f_company_id INT REFERENCES frame_companies(id) ON DELETE CASCADE ON UPDATE CASCADE,
    f_material_id INT REFERENCES frame_material_types(id) ON DELETE CASCADE ON UPDATE CASCADE,
    f_model_id INT REFERENCES frame_model_types(id) ON DELETE CASCADE ON UPDATE CASCADE,
    f_size_id INT REFERENCES frame_sizes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    f_price_id INT REFERENCES frame_prices(id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_frame UNIQUE (f_company_id, f_material_id, f_model_id, f_size_id, f_price_id)
);

CREATE TABLE frame_details
(
    id SERIAL PRIMARY KEY,
    f_code VARCHAR(10) NOT NULL,
    f_name VARCHAR(155) NOT NULL,
    f_reference_id INT REFERENCES frame_details_reference_ids(id) ON DELETE CASCADE ON UPDATE CASCADE,
    f_extra_details TEXT,
    f_purchase_date DATE DEFAULT CURRENT_DATE,
    f_qty INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 1,
    CONSTRAINT unique_frame_code UNIQUE(f_code,f_name)
);


