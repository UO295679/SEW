class Api {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        // Vincular métodos a eventos
        const botones = document.querySelectorAll('button');
        const inputs = document.querySelectorAll('input[type="file"]');
        const formularios = document.querySelectorAll('form');

        if (botones[0]) botones[0].onclick = () => this.obtenerUbicacion();
        if (inputs[0]) inputs[0].onchange = (event) => this.leerArchivo(event);
        if (formularios[0]) formularios[0].onsubmit = (event) => this.guardarPreferencias(event);

        this.mostrarPreferencias();
    }

    obtenerUbicacion() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const parrafos = document.querySelectorAll('section:nth-of-type(1) p');
                    if (parrafos[0]) {
                        parrafos[0].textContent = `Ubicación: Latitud ${latitude.toFixed(2)}, Longitud ${longitude.toFixed(2)}`;
                    }
                    this.mostrarCircuitosCercanos(latitude, longitude);
                },
                () => alert('No se pudo obtener la ubicación.')
            );
        } else {
            alert('La API de geolocalización no está soportada en este navegador.');
        }
    }

    mostrarCircuitosCercanos(lat, lon) {
        const circuitos = [
            { nombre: "Bahrain International Circuit", lat: 26.0325, lon: 50.5106 },
            { nombre: "Jeddah Corniche Circuit", lat: 21.6319, lon: 39.1044 },
            { nombre: "Albert Park Circuit", lat: -37.8497, lon: 144.968 },
            { nombre: "Shanghai International Circuit", lat: 31.3389, lon: 121.22 },
            { nombre: "Miami International Autodrome", lat: 25.958, lon: -80.2389 },
            { nombre: "Imola Circuit (Autodromo Enzo e Dino Ferrari)", lat: 44.343, lon: 11.7167 },
            { nombre: "Monaco Circuit", lat: 43.7347, lon: 7.4206 },
            { nombre: "Circuit de Barcelona-Catalunya", lat: 41.57, lon: 2.2611 },
            { nombre: "Circuit Gilles Villeneuve", lat: 45.5006, lon: -73.5228 },
            { nombre: "Red Bull Ring", lat: 47.2197, lon: 14.7647 },
            { nombre: "Silverstone Circuit", lat: 52.0733, lon: -1.0142 },
            { nombre: "Hungaroring", lat: 47.5789, lon: 19.2486 },
            { nombre: "Spa-Francorchamps", lat: 50.4372, lon: 5.9714 },
            { nombre: "Zandvoort Circuit", lat: 52.3888, lon: 4.5409 },
            { nombre: "Monza Circuit (Autodromo Nazionale Monza)", lat: 45.6216, lon: 9.2813 },
            { nombre: "Singapore Street Circuit", lat: 1.2914, lon: 103.863 },
            { nombre: "Suzuka International Racing Course", lat: 34.8431, lon: 136.5412 },
            { nombre: "Losail International Circuit", lat: 25.4858, lon: 51.4542 },
            { nombre: "Circuit of the Americas", lat: 30.1328, lon: -97.6411 },
            { nombre: "Autódromo Hermanos Rodríguez", lat: 19.4042, lon: -99.089 },
            { nombre: "Interlagos (Autódromo José Carlos Pace)", lat: -23.701, lon: -46.6977 },
            { nombre: "Las Vegas Street Circuit", lat: 36.1699, lon: -115.1398 },
            { nombre: "Yas Marina Circuit", lat: 24.4672, lon: 54.6031 }
        ];
    
        const calcularDistancia = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radio de la Tierra en km
            const rad = (deg) => deg * (Math.PI / 180);
            const dLat = rad(lat2 - lat1);
            const dLon = rad(lon2 - lon1);
            const a = Math.sin(dLat / 2) ** 2 +
                      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distancia en km
        };
    
        // Calcular distancias y ordenar por proximidad
        const distancias = circuitos.map((circuito) => ({
            nombre: circuito.nombre,
            distancia: calcularDistancia(lat, lon, circuito.lat, circuito.lon),
        })).sort((a, b) => a.distancia - b.distancia);
    
        // Mostrar los 3 circuitos más cercanos
        const parrafos = document.querySelectorAll('section:nth-of-type(1) p');
        if (parrafos[0]) {
            const listaCircuitos = distancias.slice(0, 3).map(
                (circuito) => `${circuito.nombre} (${circuito.distancia.toFixed(1)} km)`
            ).join(', ');
            parrafos[0].innerHTML += `<p>Circuitos cercanos: ${listaCircuitos}</p>`;
        }
    }    

    leerArchivo(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = (e) => {
                const contenido = e.target.result.split('\n');
                const listas = document.querySelectorAll('section:nth-of-type(2) ul');
                if (listas[0]) {
                    listas[0].innerHTML = '';
                    contenido.forEach((linea) => {
                        const item = document.createElement('li');
                        item.textContent = linea;
                        listas[0].appendChild(item);
                    });
                }
            };
            lector.readAsText(archivo);
        } else {
            alert('No se seleccionó ningún archivo.');
        }
    }

    guardarPreferencias(event) {
        event.preventDefault();
        const inputsTexto = document.querySelectorAll('form input[type="text"]');
        if (inputsTexto[0]) {
            const piloto = inputsTexto[0].value;
            if (piloto) {
                localStorage.setItem('pilotoFavorito', piloto);
                this.mostrarPreferencias();
            }
        }
    }

    mostrarPreferencias() {
        const preferencia = localStorage.getItem('pilotoFavorito');
        const parrafos = document.querySelectorAll('section:nth-of-type(3) p');
        if (parrafos[0]) {
            parrafos[0].textContent = preferencia 
                ? `Preferencia actual: ${preferencia}` 
                : 'Preferencia actual: Ninguna';
        }
    }
}