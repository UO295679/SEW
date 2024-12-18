class Agenda {
    constructor() {
        this.url = 'https://api.jolpi.ca/ergast/f1/2024.json';
    }

    obtenerCalendario() {
        $.ajax({
            url: this.url,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.mostrarCarreras(data);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error('Error al obtener los datos:', textStatus, errorThrown);
            }
        });
    }

    mostrarCarreras(data) {
        $('article').empty();

        // Recorrer la información de las carreras
        const carreras = data.MRData.RaceTable.Races;

        // Crear un artículo por cada carrera
        carreras.forEach(carrera => {
            const carreraElement = $(`
                <article>
                    <h2>${carrera.raceName}</h2>
                    <p>Circuito: ${carrera.Circuit.circuitName}</p>
                    <p>Ubicación: ${carrera.Circuit.Location.locality}, ${carrera.Circuit.Location.country}</p>
                    <p>Coordenadas: ${carrera.Circuit.Location.lat}, ${carrera.Circuit.Location.long}</p>
                    <p>Fecha: ${carrera.date} ${carrera.time ? carrera.time : ''}</p>
                </article>
            `);

            $('main').append(carreraElement);
        });
    }
}

const agenda = new Agenda();