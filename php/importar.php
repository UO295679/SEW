<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 - Dario Corbeira Presno</title>
    <meta name ="author" content ="Dario Corbeira Presno" />
    <meta name ="description" content ="Juegos" />
    <meta name ="keywords" content ="F1" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="multimedia/favicon.ico" sizes="16x16" type="image/png" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
</head>
<body>
    <header>
        <h1><a href="../index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" title="Inicio">Inicio</a>
            <a href="../piloto.html" title="Piloto Oscar Piastri">Piloto</a>
            <a href="../noticias.html" title="Noticias">Noticias</a>
            <a href="../calendario.html" title="Calendario">Calendario</a>
            <a href="../meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="../circuito.html" title="Circuito">Circuito</a>
            <a href="../viajes.php" title="Viajes">Viajes</a>
            <a href="../juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>
    <p class="miga">Estas en: <a href="../index.html" title="Inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a> >> <a href="juego.php" title="Juegos">Aplicación F1 PHP</a> >> Importar</p>
    <h3>Importar Datos</h3>
    <form action="importar.php" method="post" enctype="multipart/form-data">
        <label for="tabla">Seleccionar tabla:</label>
        <select name="tabla" id="tabla">
            <option value="pilotos">Pilotos</option>
            <option value="equipos">Equipos</option>
            <option value="carreras">Carreras</option>
            <option value="resultados">Resultados</option>
            <option value="equipos_pilotos">Equipos Pilotos</option>
        </select>
        <label for="archivo">Subir archivo CSV:</label>
        <input type="file" name="archivo" id="archivo" accept=".csv" />
        <button type="submit" name="importar">Importar</button>
    </form>
    <?php
require_once 'db_config.php';
require_once 'BaseDatos.php';

if (isset($_POST['importar'])) {
    $tabla = $_POST['tabla'];
    $archivo = $_FILES['archivo']['tmp_name'];

    if ($archivo) {
        $db = new BaseDatos();
        $db->conectar();

        $handle = fopen($archivo, 'r');
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            switch ($tabla) {
                case 'pilotos':
                    $sql = "INSERT INTO pilotos (nombre, apellido, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?, ?)";
                    $db->ejecutarConsulta($sql, $data);
                    break;
        
                case 'equipos':
                    $sql = "INSERT INTO equipos (nombre, fundacion) VALUES (?, ?)";
                    $db->ejecutarConsulta($sql, $data);
                    break;
        
                case 'carreras':
                    $sql = "INSERT INTO carreras (nombre, fecha, ubicacion) VALUES (?, ?, ?)";
                    $db->ejecutarConsulta($sql, $data);
                    break;
        
                case 'resultados':
                    $sql = "INSERT INTO resultados (id_piloto, id_carrera, posicion_final, puntos) VALUES (?, ?, ?, ?)";
                    $db->ejecutarConsulta($sql, $data);
                    break;
        
                case 'equipos_pilotos':
                    $sql = "INSERT INTO equipos_pilotos (id_piloto, id_equipo, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)";
                    $db->ejecutarConsulta($sql, $data);
                    break;
        
                default:
                    throw new Exception("Tabla desconocida: $tabla");
            }
        }
        fclose($handle);
        echo "Datos importados correctamente.";
    } else {
        echo "Error al subir el archivo.";
    }
}
?>
</body>
</html>