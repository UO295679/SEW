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
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
</head>
<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto Oscar Piastri">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorologia.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes">Viajes</a>
            <a href="juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>
    <p class="miga">Estas en: <a href="index.html" title="Inicio">Inicio</a> >> <a href="juegos.html" title="Juegos">Juegos</a> >> Juego de Tiempo de Reacción</p>
    <main>
        <!-- La estructura del juego se generará aquí mediante JavaScript -->
    </main>
    <script>
        const semaforo = new Semaforo();
    </script>
    <?php
    class Record {
        private $server;
        private $user;
        private $pass;
        private $dbname;

        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }

        public function guardarRegistro($nombre, $apellidos, $nivel, $tiempo) {
            $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if ($conn->connect_error) {
                die("Error de conexión: " . $conn->connect_error);
            }

            $stmt = $conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("sssd", $nombre, $apellidos, $nivel, $tiempo);

            if (!$stmt->execute()) {
                echo "Error al guardar el récord: " . $stmt->error;
            }

            $stmt->close();
            $conn->close();
        }

        public function obtenerMejoresTiempos($nivel) {
            $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if ($conn->connect_error) {
                die("Error de conexión: " . $conn->connect_error);
            }

            $stmt = $conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
            $stmt->bind_param("d", $nivel);
            $stmt->execute();

            $result = $stmt->get_result();
            $records = [];

            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }

            $stmt->close();
            $conn->close();

            return $records;
        }
    }

// Procesar formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['name'] ?? '';
    $apellidos = $_POST['surname'] ?? '';
    $nivel = floatval($_POST['level'] ?? 0);
    $tiempo = floatval($_POST['reactionTime'] ?? 0);

    $record = new Record();
    $record->guardarRegistro($nombre, $apellidos, $nivel, $tiempo);

    // Mostrar los mejores tiempos
    $mejoresTiempos = $record->obtenerMejoresTiempos($nivel);
    echo "<section>";
    echo "<h2>Clasificación del nivel $nivel:</h2>";
    echo "<ol>";
    foreach ($mejoresTiempos as $registro) {
        echo "<li>{$registro['nombre']} {$registro['apellidos']} - {$registro['tiempo']}s</li>";
    }
    echo "</ol>";
    echo "</section>";
}
?>
</body>
</html>