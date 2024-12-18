<!DOCTYPE HTML>
<html lang="es">
<head>
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
    <p class="miga">Estás en: <a href="../index.html" title="Inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a> >> Aplicación F1 PHP</p>
    <main>
    <section>
    <h2>Haz tu propia Fórmula 1</h2>
    <form action="juego.php" method="post">
        <button type="submit" name="crear_bd">Crear Base de Datos</button>
    </form>
    <h3>Acciones que puedes hacer:</h3>
    <ul>
        <li><a href="importar.php">Importar Datos</a></li>
        <li><a href="exportar.php">Exportar Datos</a></li>
    </ul>
    </section>
    <p>
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['crear_bd'])) {
            require_once 'db_config.php';
            require_once 'BaseDatos.php';

            $db = new BaseDatos();
            $db->conectar();

            // Crear la base de datos
            $sql_create_db = "CREATE DATABASE IF NOT EXISTS formula1";
            $db->ejecutarConsulta($sql_create_db);

            // Seleccionar la base de datos
            $db->ejecutarConsulta("USE formula1");

            // Leer el archivo SQL
            $sql_tables = file_get_contents('base_datos.sql');
            $queries = explode(";", $sql_tables); // Dividir las consultas por punto y coma

            // Ejecutar cada consulta individualmente
            foreach ($queries as $query) {
                $query = trim($query);
                if (!empty($query)) {
                    $db->ejecutarConsulta($query);
                }
            }

            echo "Base de datos y tablas creadas correctamente.";
        }
        ?>
    </p>
    </main>
</body>
</html>
