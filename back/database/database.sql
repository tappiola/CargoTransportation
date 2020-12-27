create table users
(
    id        serial primary key,
    firstname VARCHAR(255) NOT NULL,
    surname   varchar(255),
    lastname  varchar(255) NOT NULL,
    login     varchar(255) NOT NULL,
    email     varchar(50)  NOT NULL,
    password  varchar(255) NOT NULL,
    birthday  date,
    city      varchar(255),
    street    varchar(255),
    house     varchar(5),
    apartment varchar(5)
);