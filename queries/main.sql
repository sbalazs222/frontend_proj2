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