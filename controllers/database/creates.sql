CREATE DATABASE portifolio_web2;

USE portifolio_web2;

CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	user_name VARCHAR(50),
	adm_roles BOOL
);

CREATE TABLE projects(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	project_name VARCHAR(50),
	project_resume VARCHAR(180),	
	active BOOL,
	last_update datetime
);

CREATE TABLE keyword_projects(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	id_project INT,
	keyword VARCHAR(20),
	active BOOL,
	last_update datetime
);

CREATE TABLE authors_projects(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	id_author int,
	id_project INT,
	active BOOL,
	last_update datetime

);

CREATE TABLE knowledges(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	description VARCHAR(50),
	active BOOL,
	last_update datetime
);

CREATE TABLE users_knowledges(
    id INT PRIMARY KEY AUTO_INCREMENT  AUTO_INCREMENT,
    id_user INT,
    id_knowledge INT,
    level INT CHECK (level BETWEEN 0 AND 10), -- Nível de conhecimento de 0 a 10
    active BOOL,
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_knowledge) REFERENCES knowledges(id)
);
