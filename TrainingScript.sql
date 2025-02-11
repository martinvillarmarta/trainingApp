CREATE DATABASE trainingdb;
USE trainingdb;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
	age INT NOT NULL
);

INSERT INTO User(email, password, dateOfBirth, age) VALUES ('marta@gmail.com', '$2a$10$1QzNM2NDkaMjtNBym7yzu.GEVC34UiENlJBK8GagDKEiEOuxz4qHi', STR_TO_DATE('27/12/1994', '%d/%m/%Y'), 30);
INSERT INTO User(email, password, dateOfBirth, age) VALUES ('lucia@gmail.com', '$2a$10$7Qr/hBbKuBiRhUS6fcyJgus0CJfMDGJcVXEgDWa00vWdAwJuCbZjW', STR_TO_DATE('01/12/1998', '%d/%m/%Y'), 26);
INSERT INTO User(email, password, dateOfBirth, age) VALUES ('fernando@gmail.com', '$2a$10$0FXVyys5974dOU.n7.giKOG4HP3CjYL4iUEYWmZuGR80NVkv50Cx6', STR_TO_DATE('07/06/2000', '%d/%m/%Y'), 24);

CREATE TABLE User_workout (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (userid) REFERENCES User(id)
);
