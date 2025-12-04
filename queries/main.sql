DROP TABLE if exists users;
DROP TABLE if exists cars;

CREATE TABLE IF NOT EXISTS users(
    id int primary key auto_increment,
    username varchar(255) unique not null,
    password varchar(255) not null,
    email varchar(255) unique not null,
    address varchar(255) not null,
    phone varchar(255) not null,
    rights bool not null
);
CREATE TABLE IF NOT EXISTS cars(
    id int primary key auto_increment,
    brand varchar(255) not null,
    model varchar(255) not null,
    year int not null ,
    mileage int not null,
    price int not null,
    description varchar(255),
    uploader_id int not null
);
INSERT INTO users(username, password, email, address, phone, rights) values ('admin', '$argon2i$v=19$m=16,t=2,p=1$RWlCSHZtWGxCanpldjY0Tg$s/Jwk2d09S1JRC8KJv7FVQ', 'admin@admin.com', 'Admin St. 1', '+362012345678', 1);
INSERT INTO cars(brand, model, year, mileage, price, description, uploader_id) values ('BMW', '320i', 1995, 198000, 3490000, 'Ajándék 10 liter motul olaj', 1);