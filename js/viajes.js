class Viajes {
    constructor() {
        this.latitud = null;
        this.longitud = null;
        this.obtenerPosicionGeografica();
    }

    obtenerPosicionGeografica() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (posicion) => {
                    this.latitud = posicion.coords.latitude;
                    this.longitud = posicion.coords.longitude;
                    this.mostrarMapaDinamico();
                },
                (error) => {
                    console.error("Error al obtener la geolocalización:", error.message);
                    this.mostrarError(error);
                }
            );
        } else {
            console.error("El navegador no soporta geolocalización.");
            this.mostrarError({ message: "El navegador no soporta geolocalización." });
        }
    }

    mostrarMapaDinamico() {
        const contenedorMapa = document.querySelector("div");
        if (!contenedorMapa) {
            console.error("No se encontró un contenedor para el mapa.");
            return;
        }

        const mapa = new google.maps.Map(contenedorMapa, {
            center: { lat: this.latitud, lng: this.longitud },
            zoom: 11,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h5>Localización Encontrada</h5>`,
        });
        infoWindow.setPosition({ lat: this.latitud, lng: this.longitud });
        infoWindow.open(mapa);
        mapa.setCenter({ lat: this.latitud, lng: this.longitud });
    }

    mostrarError(error) {
        const mensaje = `No se pudo obtener la geolocalización: ${error.message}`;
        alert(mensaje);
    }
}

$(document).ready(function () {
    const slides = $('article img');
    let index = 0;

    function mostrarImagen(offset) {
        index = (index + offset + slides.length) % slides.length;
        slides.each((i, img) => {
            $(img).css('transform', `translateX(${(i - index) * 100}%)`);
        });
    }

    $('article button:first-of-type').click(() => mostrarImagen(1));
    $('article button:last-of-type').click(() => mostrarImagen(-1));

    mostrarImagen(0); // Inicializa el carrusel.
});
