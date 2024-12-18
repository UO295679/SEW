class Pais {
    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
        this.circuito = "";
        this.formaGobierno = "";
        this.coordenadasMeta = { lat: null, lon: null };
        this.religionMayoritaria = "";
    }

    inicializarValores(circuito, formaGobierno, coordenadasMeta, religionMayoritaria) {
        this.circuito = circuito;
        this.formaGobierno = formaGobierno;
        this.coordenadasMeta = coordenadasMeta;
        this.religionMayoritaria = religionMayoritaria;
        document.write('<h4>Información del País:</h4>');
        this.obtenerNombre();
        this.obtenerCapital();
        document.write('<h4>Información Secundaria:</h4>');
        this.obtenerInformacionSecundaria();
        this.escribirCoordenadas();
        document.write('<h4>Pronóstico del Tiempo para los Próximos 5 Días:</h4>');
        this.obtenerPronosticoTiempo();
    }

    obtenerNombre() {
        const nombre = `<p>Nombre: ${this.nombre}</p>`;
        document.write(nombre);
    }

    obtenerCapital() {
        const capital = `<p>Capital: ${this.capital}</p>`;
        document.write(capital);
    }

    obtenerInformacionSecundaria() {
        const is = `
            <ul>
                <li>Circuito de F1: ${this.circuito}</li>
                <li>Población: ${this.poblacion}</li>
                <li>Forma de Gobierno: ${this.formaGobierno}</li>
                <li>Religión Mayoritaria: ${this.religionMayoritaria}</li>
            </ul>
        `;
        document.write(is);
    }

    escribirCoordenadas() {
        const coordenadasTexto = `<h4>Coordenadas de la Línea de Meta:</h4> Latitud: ${this.coordenadasMeta.lat}, Longitud: ${this.coordenadasMeta.lon}`;
        document.write(coordenadasTexto);
    }

    // Nueva función para obtener el pronóstico del tiempo
    obtenerPronosticoTiempo() {
        if (!this.coordenadasMeta.lat || !this.coordenadasMeta.lon) {
            console.error("Coordenadas de la línea de meta no definidas.");
            return;
        }
    
        const apiKey = 'bfeb952b54afe78d1df0a0252b32b0fe';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.coordenadasMeta.lat}&lon=${this.coordenadasMeta.lon}&appid=${apiKey}&mode=xml&lang=es&units=metric`;
    
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            success: function(response) {
    
                const uniqueDays = new Set();
                $(response).find('time').each(function() {
                    const dateTime = $(this).attr('from');
                    const date = dateTime.split('T')[0];
                    const hour = dateTime.split('T')[1];
    
                    // Tomar solo el pronóstico de las 15:00 p.m. EN ABU DHABI(IMPORTANTE O SEA LAS 12 DE LA MOCHE EN ESPAÑA) para cada día
                    if (hour === "00:00:00" && !uniqueDays.has(date)) {
                        uniqueDays.add(date);
    
                        const tempMax = $(this).find('temperature').attr('max');
                        const tempMin = $(this).find('temperature').attr('min');
                        const humedad = $(this).find('humidity').attr('value');
                        const icon = $(this).find('symbol').attr('var');
                        const lluvia = $(this).find('precipitation').attr('value') || "0";
    
                        const forecastArticle = $(`<article>
                            <h4>${date}</h4>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Icono del tiempo" />
                            <p>Temp. Máxima: ${tempMax}°C</p>
                            <p>Temp. Mínima: ${tempMin}°C</p>
                            <p>Humedad: ${humedad}%</p>
                            <p>Lluvia: ${lluvia} mm</p>
                        </article>`);

                        
                        $('main').first().append(forecastArticle);
    
                        // Limitar a 5 días
                        if (uniqueDays.size >= 5) return false;
                    }
                });
            },
            error: function(error) {
                console.error("Error al obtener el pronóstico del tiempo:", error);
            }
        });
    }
    
}
