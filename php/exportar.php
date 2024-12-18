<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 - Dario Corbeira Presno</title>
    <meta name="author" content="Dario Corbeira Presno" />
    <meta name="description" content="Juegos" />
    <meta name="keywords" content="F1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <p class="miga">Estás en: <a href="../index.html" title="Inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a> >> <a href="juego.php" title="Juegos">Aplicación F1 PHP</a> >> Exportar</p>
    <h3>Exportar Datos</h3>
    <form action="exportar.php" method="post">
        <label for="tabla">Seleccionar tabla:</label>
        <select name="tabla" id="tabla">
            <option value="pilotos">Pilotos</option>
            <option value="equipos">Equipos</option>
            <option value="carreras">Carreras</option>
            <option value="resultados">Resultados</option>
            <option value="equipos_pilotos">Equipos Pilotos</option>
        </select>
        <button type="submit" name="exportar">Exportar</button>
    </form>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['exportar'])) {
        require_once 'BaseDatos.php';

        $tabla = $_POST['tabla'] ?? '';

        // Validar que se haya seleccionado una tabla
        if (empty($tabla)) {
            die("Por favor, selecciona una tabla para exportar.");
        }

        $db = new BaseDatos();
        if (!$db->conectar()) {
            die("Error al conectar con la base de datos.");
        }

        // Ejecutar consulta para exportar datos
        $result = $db->ejecutarConsulta("SELECT * FROM $tabla");

        if (!$result) {
            die("Error en la consulta SQL: " . $db->obtenerConexion()->error);
        }

        // Verificar si hay resultados antes de continuar
        if ($result->num_rows === 0) {
            die("La tabla '$tabla' no tiene datos para exportar.");
        }

        // Abrir archivo CSV para exportar datos
        $archivo = fopen("$tabla" . "_exportados.csv", "w");
        if (!$archivo) {
            die("Error al abrir el archivo para escribir.");
        }

        // Obtener y escribir cabeceras
        $campos = $result->fetch_fields();
        if (!$campos) {
            die("No se pudieron obtener los campos de la tabla. Revisa la estructura de la tabla.");
        }

        $cabeceras = [];
        foreach ($campos as $campo) {
            $cabeceras[] = $campo->name;
        }
        fputcsv($archivo, $cabeceras);

        // Escribir filas de datos
        while ($fila = $result->fetch_assoc()) {
            fputcsv($archivo, $fila);
        }

        fclose($archivo);

        echo "Exportación completada. Archivo generado: {$tabla}_exportados.csv";
    }
    ?>
</body>
</html>
