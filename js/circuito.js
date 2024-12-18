class Circuito {
    constructor() {
        // Seleccionar los inputs para cada tarea
        this.archivoXMLInput = document.getElementsByTagName("input")[0];
        this.archivoSVGInput = document.getElementsByTagName("input")[1];
        this.archivoKMLInput = document.getElementsByTagName("input")[2];

        // Crear dinámicamente los contenedores
        this.contenedorXML = this.crearContenedor(this.archivoXMLInput);
        this.contenedorMapa = this.crearContenedor(this.archivoKMLInput, "div");
        this.contenedorSVG = this.crearContenedor(this.archivoSVGInput);

        this.mapa = null;

        // Asociar los eventos de carga de archivo a cada input
        this.archivoXMLInput.addEventListener('change', (event) => this.cargarArchivoXML(event));
        this.archivoKMLInput.addEventListener('change', (event) => this.cargarArchivoKML(event));
        this.archivoSVGInput.addEventListener('change', (event) => this.cargarArchivoSVG(event));
    }

    crearContenedor(inputElement, tagName = "article") {
        const contenedor = document.createElement(tagName);
        inputElement.parentNode.insertBefore(contenedor, inputElement.nextSibling);
        return contenedor;
    }

    cargarArchivoXML(event) {
        const archivo = event.target.files[0];
        if (archivo && archivo.name.endsWith(".xml")) {
            const lector = new FileReader();
            lector.onload = (e) => this.procesarXML(e.target.result);
            lector.readAsText(archivo);
        } else {
            alert("Por favor, selecciona un archivo en formato XML.");
        }
    }

    procesarXML(contenidoXML) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contenidoXML, "application/xml");
        const htmlContent = this.convertirXMLaHTML(xmlDoc.documentElement);
        this.contenedorXML.innerHTML = htmlContent;
    }

    convertirXMLaHTML(elemento) {
        let html = `<ul><li><strong>${elemento.nodeName}</strong>`;
        if (elemento.childNodes.length === 1 && elemento.childNodes[0].nodeType === Node.TEXT_NODE) {
            html += `: ${elemento.childNodes[0].nodeValue}`;
        } else {
            html += `<ul>`;
            for (let i = 0; i < elemento.children.length; i++) {
                html += this.convertirXMLaHTML(elemento.children[i]);
            }
            html += `</ul>`;
        }
        html += `</li></ul>`;
        return html;
    }

    cargarArchivoKML(event) {
        const archivo = event.target.files[0];
        if (archivo && archivo.name.endsWith(".kml")) {
            const lector = new FileReader();
            lector.onload = (e) => this.procesarKML(e.target.result);
            lector.readAsText(archivo);
        } else {
            alert("Por favor, selecciona un archivo en formato KML.");
        }
    }

    procesarKML(contenidoKML) {
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(contenidoKML, "application/xml");

        // Obtener las coordenadas de los puntos del KML
        const puntos = [];
        const placemarks = kmlDoc.getElementsByTagName("Placemark");

        // Inicializar el mapa en el contenedor del KML
        this.mapa = new google.maps.Map(this.contenedorMapa, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
        });

        for (let i = 0; i < placemarks.length; i++) {
            const coords = placemarks[i].getElementsByTagName("coordinates")[0];
            if (coords) {
                const coordenadas = coords.textContent.trim().split(" ");
                coordenadas.forEach(coord => {
                    const [lng, lat] = coord.split(",").map(parseFloat);
                    puntos.push({ lat, lng });
                });
            }
        }

        // Dibujar la línea que conecta los puntos
        const path = new google.maps.Polyline({
            path: puntos,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        path.setMap(this.mapa);

        // Ajustar el mapa para que abarque todos los puntos
        const bounds = new google.maps.LatLngBounds();
        puntos.forEach(punto => bounds.extend(punto));
        this.mapa.fitBounds(bounds);
    }

    cargarArchivoSVG(event) {
        const archivo = event.target.files[0];
        if (archivo && archivo.name.endsWith(".svg")) {
            const lector = new FileReader();
            lector.onload = (e) => this.mostrarSVG(e.target.result);
            lector.readAsText(archivo);
        } else {
            alert("Por favor, selecciona un archivo en formato SVG.");
        }
    }

    mostrarSVG(contenidoSVG) {
        this.contenedorSVG.innerHTML = contenidoSVG;
    }
}
