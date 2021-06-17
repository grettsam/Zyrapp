CREATE DATABASE zyrapp;

USE zyrapp;


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
    visibility BOOLEAN NOT NULL DEFAULT false,
    start_plan DATE NOT NULL DEFAULT CURDATE(),
    end_plan DATE NOT NULL DEFAULT ADDDATE(start_plan, INTERVAL 1 MONTH),
    admin_id INT(11),
    CONSTRAINT fk_admin_clients FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);

-- guide table

CREATE TABLE guides(
    guides_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_plant VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    pic_profile TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    pic_cover TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    text_guide TEXT NOT NULL,
    created_guide DATE NOT NULL DEFAULT CURDATE(),
    searched INT(11) DEFAULT 0,
    product INT (11) DEFAULT 0,
    admin_id INT(11),
    CONSTRAINT fk_admin_guide FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);