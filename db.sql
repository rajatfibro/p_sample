CREATE DATABASE product_camera;

CREATE TABLE products (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(100),
    description varchar(100),
    price varchar(100),
	make int(10),
    product_code int (10),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
select *  from products;



INSERT INTO products (name,description,price,make  )
VALUES ("p1", "description here", 15, 2020);

INSERT INTO products (name,description,price,make  )
VALUES ("p2", "description here2", 25, 2020);


INSERT INTO products (name,description,price,make  )
VALUES ("p3", "description here3", 35, 2021);

INSERT INTO products (name,description,price,make  )
VALUES ("p4", "description here4", 15, 2021);



CREATE TABLE users (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(100),
	password varchar(100),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
select *  from users;

INSERT INTO users (name,password  )
VALUES ("u1", "password");
INSERT INTO users (name,password  )
VALUES ("u2", "password");



CREATE TABLE cart (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    cart_name varchar(100),
    user_id int(10),
    is_active int(1),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
select *  from cart;



INSERT INTO cart (cart_name,user_id, is_active  )
VALUES ("cart_1", "1", 1);
INSERT INTO cart (cart_name,user_id, is_active  )
VALUES ("cart_2", "2", "1");


CREATE TABLE cart_products (
`cart_id` int(10),
    products_id int(10),
    is_active int(1),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO cart_products (cart_id,products_id, is_active  )
VALUES ( "1", 1, 1);
INSERT INTO cart_products (cart_id,products_id, is_active  )
VALUES ( "1", "2",1 );
