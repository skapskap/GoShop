CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rating NUMERIC DEFAULT 0 NOT NULL,
    num_reviews INT DEFAULT 0 NOT NULL,
    price NUMERIC DEFAULT 0 NOT NULL,
    count_in_stock INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating NUMERIC NOT NULL,
    comment TEXT NOT NULL,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    payment_result JSONB,
    items_price NUMERIC DEFAULT 0.0 NOT NULL,
    tax_price NUMERIC DEFAULT 0.0 NOT NULL,
    shipping_price NUMERIC DEFAULT 0.0 NOT NULL,
    total_price NUMERIC DEFAULT 0.0 NOT NULL,
    is_paid BOOLEAN DEFAULT false NOT NULL,
    paid_at TIMESTAMP,
    is_delivered BOOLEAN DEFAULT false NOT NULL,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    product_id BIGINT REFERENCES products(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
