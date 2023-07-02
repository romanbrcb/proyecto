USE proyecto;

create table if not exists alumnos(
id_alumnos int (50) not null auto_increment,
nombre_alumnos varchar (50) default null,
edad_alumnos int (2),
correo_alumnos varchar (50),
primary key (id_alumnos)
)engine= InnoDB;

create table if not exists profesores(
id_profesor int (50) not null auto_increment,
nombre_profesor varchar (50),
correo_profesor varchar (50),
id_cursos int (50),
primary key (id_profesor),
constraint foreign key (id_cursos) references cursos(id_cursos)
)engine= InnoDB;

create table if not exists cursos(
id_cursos int (50) not null auto_increment,
nombre_cursos varchar (50),
id_profesor varchar (50),
primary key (id_cursos),
constraint foreign key (id_profesor) references profesores (id_profesor)
)engine= InnoDB;

create table if not exists notas(
id_nota int (50) not null auto_increment,
id_alumnos int (50),
id_cursos int (50),
nota int(2),
primary key (id_nota),
constraint foreign key (id_alumnos) references alumnos(id_alumnos),
constraint foreign key (id_cursos) references cursos(id_cursos)
)engine= InnoDB;
/* el InnoDB se utiliza para poder usar las llaver foraneas */
