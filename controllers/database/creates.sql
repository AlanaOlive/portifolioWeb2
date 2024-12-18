CREATE DATABASE portifolio_web2;

USE portifolio_web2;

CREATE TABLE usuarios(
	id INT PRIMARY KEY,
	user_name VARCHAR(50),
	adm_roles BOOL
);

CREATE TABLE projetos(
	id INT PRIMARY KEY,
	project_name VARCHAR(50),
	project_resume VARCHAR(180)	
);


CREATE TABLE projetos_palavras_chave(
	id INT PRIMARY KEY,
	id_project INT,
	keyword VARCHAR(20)
);

ALTER TABLE `projetos_palavras_chave` ADD CONSTRAINT `fk_id_projeto` FOREIGN KEY (`id_project`) REFERENCES `projetos` (`id`);

CREATE TABLE projetos_autores(
	id INT PRIMARY KEY,
	
);