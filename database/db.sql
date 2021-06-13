CREATE DATABASE database_zyrapp;

USE database_zyrapp;


-- admin table

CREATE TABLE admin(
    admin_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    type_accounts int(11) NOT NULL,
    init_accounts DATE NOT NULL DEFAULT NOW()
);


-- client table

CREATE TABLE clients(
    clients_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    plan VARCHAR(20) NOT NULL,
    type_accounts int(11) NOT NULL,
    init_plan DATE NOT NULL DEFAULT NOW(),
    end_plan DATE NOT NULL DEFAULT DATE_ADD(init_plan, INTERVAL 30 DAY),
    admin_id INT(11),
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

