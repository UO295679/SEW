<?php
class Carrusel {
    private $capital;
    private $pais;
    private $fotos;

    public function __construct($capital, $pais) {
        $this->capital = $capital;
        $this->pais = $pais;
        $this->fotos = [];
    }

    public function obtenerFotos() {
        $apiKey = '0565634739c78dcdbf56368cb0991f0b';
        $endpoint = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        $params = [
            'api_key' => $apiKey,
            'format' => 'json',
            'nojsoncallback' => 1,
            'text' => "$this->capital",
            'per_page' => 10,
            'sort' => 'relevance'
        ];
        $url = $endpoint . '&' . http_build_query($params);
    
        $response = file_get_contents($url);
        $data = json_decode($response, true);
    
        if (isset($data['photos']['photo'])) {
            foreach ($data['photos']['photo'] as $photo) {
                $photoUrl = "https://live.staticflickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}_m.jpg";
                $this->fotos[] = $photoUrl;
            }
        }
    }
    

    public function renderizarCarrusel() {
        echo '<article>';
        echo '<h3>Carrusel de Imágenes</h3>';
        foreach ($this->fotos as $index => $foto) {
            echo "<img src='$foto' alt='Imagen " . ($index + 1) . " carrusel' />";
        }
        echo '<button>&gt;</button>';
        echo '<button>&lt;</button>';
        echo '</article>';
    }
}
class Moneda {
    private $monedaLocal;
    private $monedaReferencia;

    public function __construct($monedaLocal, $monedaReferencia = 'EUR') {
        $this->monedaLocal = $monedaLocal;
        $this->monedaReferencia = $monedaReferencia;
    }

    public function obtenerCambio() {
        $apiKey = '5ee3c0b5973f277fcd8e119e';
        $endpoint = "https://v6.exchangerate-api.com/v6/$apiKey/latest/{$this->monedaReferencia}";
    
        $response = file_get_contents($endpoint);
        $data = json_decode($response, true);
    
        if (isset($data['conversion_rates'][$this->monedaLocal])) {
            return $data['conversion_rates'][$this->monedaLocal];
        }

        return "No se pudo obtener el tipo de cambio.";
    }
    
}

$capital = "Abu Dhabi";
$pais = "Emiratos Árabes";

$carrusel = new Carrusel($capital, $pais);
$carrusel->obtenerFotos();

$moneda = new Moneda('AED'); // AED es la moneda de Emiratos Árabes
$cambio = $moneda->obtenerCambio();
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1 - Dario Corbeira Presno</title>
    <meta name ="author" content ="Dario Corbeira Presno" />
    <meta name ="description" content ="Viajes" />
    <meta name ="keywords" content ="F1, viajes" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="multimedia/favicon.ico" sizes="16x16" type="image/png" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA48zD4Y2c-VjPVl7tkIlm24IHkqZ0RuYs&libraries=places" async></script>
    <script src="js/viajes.js"></script>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
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
            <a href="viajes.php" title="Viajes" class="active">Viajes</a>
            <a href="juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>
    <p class="miga">Estas en: <a href="index.html" title="Inicio">Inicio</a> >> Viajes</p>
    <?php $carrusel->renderizarCarrusel(); ?>
    <h3>Cambio de moneda</h3>
    <p>El cambio actual de 1€ a AED (Dirham de Emiratos Árabes) es: <?php echo $cambio ?></p>
    <script>
        const viajes = new Viajes();
    </script>
    <div></div>
</body>
</html>