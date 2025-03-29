CREATE OR REPLACE TABLE
    lens_types (
        id SERIAL PRIMARY KEY,
        l_type_code VARCHAR(55) NOT NULL,
        l_type VARCHAR(155) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unqiue_type_code UNIQUE (l_type_code),
        CONSTRAINT unique_type UNIQUE (l_type)
    );

CREATE OR REPLACE TABLE
    lens_materials (
        id SERIAL PRIMARY KEY,
        l_material_code VARCHAR(55) NOT NULL,
        l_material VARCHAR(155) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unqiue_material_code UNIQUE (l_material_code),
        CONSTRAINT unique_material UNIQUE (l_material)
    );

CREATE OR REPLACE TABLE
    lens_models (
        id SERIAL PRIMARY KEY,
        l_model_code VARCHAR(55) NOT NULL,
        l_model VARCHAR(155) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unqiue_model_code UNIQUE (l_model_code),
        CONSTRAINT unique_model UNIQUE (l_model)
    );

CREATE OR REPLACE TABLE
    lens_companies (
        id SERIAL PRIMARY KEY,
        l_company_code VARCHAR(55) NOT NULL,
        l_company VARCHAR(155) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unqiue_company_code UNIQUE (l_company_code),
        CONSTRAINT unique_lens_company UNIQUE (l_company)
    );

CREATE OR REPLACE TABLE
    lens_price_details (
        id SERIAL PRIMARY KEY,
        l_pruchase_price NUMERIC(10, 2) NOT NULL,
        l_sales_price NUMERIC(10, 2) NOT NULL,
        l_discount NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unique_lens_price_details UNIQUE (l_pruchase_price, l_sales_price, l_discount)
    );

CREATE OR REPLACE TABLE
    lens_sight_details (
        id SERIAL PRIMARY KEY,
        spherical VARCHAR(10) NOT NULL DEFAULT '-',
        addition VARCHAR(10) NOT NULL DEFAULT '-',
        cylinder VARCHAR(10) NOT NULL DEFAULT '-',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unique_sight_details UNIQUE (spherical, addition, cylinder)
    );

CREATE OR REPLACE TABLE
    lens_reference_details (
        id SERIAL PRIMARY KEY,
        l_company_id INT REFERENCES lens_companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
        l_type_id INT REFERENCES lens_types (id) ON DELETE CASCADE ON UPDATE CASCADE,
        l_model_id INT REFERENCES lens_models (id) ON DELETE CASCADE ON UPDATE CASCADE,
        l_material_id INT REFERENCES lens_materials (id) ON DELETE CASCADE ON UPDATE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unique_reference_details UNIQUE (
            l_company_id,
            l_type_id,
            l_model_id,
            l_material_id
        )
    );

CREATE OR REPLACE TABLE
    lens_details (
        id SERIAL PRIMARY KEY,
        l_code VARCHAR(20) NOT NULL,
        l_name VARCHAR(155) NOT NULL,
        l_reference_id INT REFERENCES lens_reference_details (id) ON DELETE CASCADE ON UPDATE CASCADE,
        l_extra_details TEXT,
        l_purchase_date DATE DEFAULT CURRENT_DATE,
        l_qty INT NOT NULL,
        l_sight_id INT REFERENCES lens_sight_details (id) ON UPDATE CASCADE,
        l_price_id INT REFERENCES lens_price_details (id) ON UPDATE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status INT NOT NULL DEFAULT 1,
        CONSTRAINT unique_lens_code UNIQUE (l_code)
    );