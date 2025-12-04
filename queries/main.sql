CREATE TABLE IF NOT EXISTS users(
    id int primary key auto_increment,
    username varchar(255) unique not null,
    password varchar(255) not null,
    email varchar(255) unique not null,
    address varchar(255) not null,
    phone varchar(255) not null
);
CREATE TABLE IF NOT EXISTS cars(
    id int primary key auto_increment,
    brand varchar(255) not null,
    model varchar(255) not null,
    mileage int not null,
    description varchar(255)
);
INSERT INTO users(username, password, email, address, phone) values ('admin', '$argon2i$v=19$m=16,t=2,p=1$RWlCSHZtWGxCanpldjY0Tg$s/Jwk2d09S1JRC8KJv7FVQ', 'admin@admin.com', 'Admin St. 1', '+362012345678');