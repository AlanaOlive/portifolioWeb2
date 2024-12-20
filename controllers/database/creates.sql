CREATE DATABASE portifolio_web2;

USE portifolio_web2;

CREATE TABLE users(
	id INT PRIMARY KEY,
	user_name VARCHAR(50),
	adm_roles BOOL
);

CREATE TABLE projects(
	id INT PRIMARY KEY,
	project_name VARCHAR(50),
	project_resume VARCHAR(180),	
	active BOOL,
	last_update datetime
);

CREATE TABLE keyword_projects(
	id INT PRIMARY KEY,
	id_project INT,
	keyword VARCHAR(20),
	active BOOL,
	last_update datetime
);

CREATE TABLE authors_projects(
	id INT PRIMARY KEY,
	id_author int,
	id_project INT,
	active BOOL,
	last_update datetime

);

CREATE TABLE knowledges(
	id INT PRIMARY KEY,
	description VARCHAR(50),
	active BOOL,
	last_update datetime
);

CREATE TABLE users_knowledges(
	id INT PRIMARY KEY,
	id_user INT,
	active BOOL,
	last_update datetime
);
