CREATE TABLE IF NOT EXISTS pilotos (
    id_piloto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    nacionalidad VARCHAR(50),
    fecha_nacimiento DATE
);

CREATE TABLE IF NOT EXISTS equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    fundacion YEAR
);

CREATE TABLE IF NOT EXISTS carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    fecha DATE,
    ubicacion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS resultados (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_piloto INT,
    id_carrera INT,
    posicion_final INT,
    puntos FLOAT,
    FOREIGN KEY (id_piloto) REFERENCES pilotos(id_piloto),
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
);

CREATE TABLE IF NOT EXISTS equipos_pilotos (
    id_relacion INT AUTO_INCREMENT PRIMARY KEY,
    id_piloto INT,
    id_equipo INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (id_piloto) REFERENCES pilotos(id_piloto),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);