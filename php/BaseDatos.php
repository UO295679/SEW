<?php
require_once 'db_config.php';

class BaseDatos {
    private $conexion;

    public function conectar() {
        // Intentar conectarse a MySQL
        $this->conexion = new mysqli(DB_SERVER, DB_USER, DB_PASS);

        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }

        // Crear la base de datos si no existe
        $sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
        if ($this->conexion->query($sql) === FALSE) {
            die("Error creando la base de datos: " . $this->conexion->error);
        }

        // Seleccionar la base de datos
        if (!$this->conexion->select_db(DB_NAME)) {
            die("Error al seleccionar la base de datos: " . $this->conexion->error);
        }

        return true; // Conexión exitosa
    }

    public function ejecutarConsulta($sql, $parametros = []) {
        // Verificar conexión
        if (!$this->conexion) {
            die("No se ha establecido conexión con la base de datos.");
        }

        if (empty($parametros)) {
            // Consultas simples
            $result = $this->conexion->query($sql);
            if ($result === false) {
                die("Error en la consulta: " . $this->conexion->error);
            }
            return $result;
        } else {
            // Consultas preparadas
            $stmt = $this->conexion->prepare($sql);
            if (!$stmt) {
                die("Error al preparar la consulta: " . $this->conexion->error);
            }

            $tipos = str_repeat("s", count($parametros));
            $stmt->bind_param($tipos, ...$parametros);

            if (!$stmt->execute()) {
                die("Error en la consulta preparada: " . $stmt->error);
            }
            return $stmt->get_result();
        }
    }

    public function obtenerConexion() {
        return $this->conexion;
    }
}
?>