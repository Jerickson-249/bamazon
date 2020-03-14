Create database bamazon
use bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

insert into products(product_name, department_name,price,stock_quantity)
values  ('Toilet Paper', 'Cleaning', 50, 100),
        ('Water Bottles', 'Beverage', 10, 100),
        ('Wipes', 'Cleaning', 30, 100),
        ('Hand Sanitizer', 'Cleaning',5, 100),
        ('Paper Towels', 'Cleaning', 20, 100),
        ('Fruit', 'Food', 10, 100),
        ('Milk', 'Dairy', 5, 100),
        ('Eggs', 'Food', 5, 100),
        ('Flour', 'Food', 10, 100);

