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


CREATE TABLE guides(
    guides_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_plant VARCHAR(50) NOT NULL,
    pic_profile TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    pic_cover TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    c_especie VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    c_reino VARCHAR(50) NOT NULL DEFAULT 'Plantae',
    c_division VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    c_clase VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    c_orden VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    c_familia VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    c_genero VARCHAR(50) NOT NULL DEFAULT 'No encontrado',
    g_lugar VARCHAR(50) NOT NULL,
    g_inicio VARCHAR(50) NOT NULL,
    g_fin VARCHAR(50) NOT NULL,
    g_tiempo INT NOT NULL,
    g_macetero INT NOT NULL,
    g_produndidad INT NOT NULL,
    g_distancia INT NOT NULL,
    t_tierra TEXT NOT NULL,
    pic_t_tierra TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_germinacion TEXT NOT NULL,
    pic_t_germinacion TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_sol TEXT NOT NULL,
    pic_t_sol TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_agua TEXT NOT NULL,
    pic_t_agua TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_consejo TEXT NOT NULL,
    pic_t_consejo TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_enfermedad TEXT NOT NULL,
    pic_t_enfermedad TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    t_plagas TEXT NOT NULL,
    pic_t_plagas TEXT NOT NULL DEFAULT 'assets/img/logo.svg',
    created_guide DATE NOT NULL DEFAULT CURDATE(),
    searched INT(11) DEFAULT 0,
    product INT (11) DEFAULT 0,
    admin_id INT(11),
    CONSTRAINT fk_admin_guide FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);