class Noticias {
    constructor() {
    }

    // Leer el archivo de noticias
    readInputFile(file) {
        const reader = new FileReader();

        reader.onload = (evento) => {
            const content = evento.target.result;
            this.displayNoticias(content);
        };

        reader.onerror = (evento) => {
            alert("Error al leer el archivo");
        };

        reader.readAsText(file);
    }

    // Mostrar las noticias en el HTML
    displayNoticias(content) {
        const main = document.querySelector("main");

        const lines = content.split("\n");
        lines.forEach(line => {
            const [titulo, contenido, autor] = line.split("_");

            const article = document.createElement("article");

            const h3 = document.createElement("h3");
            h3.textContent = titulo;

            const pContenido = document.createElement("p");
            pContenido.innerHTML = `<strong>Contenido:</strong> ${contenido}`;

            const pAutor = document.createElement("p");
            pAutor.innerHTML = `<strong>Autor:</strong> ${autor}`;

            article.appendChild(h3);
            article.appendChild(pContenido);
            article.appendChild(pAutor);

            main.appendChild(article);
        });
    }

    // Añadir una nueva noticia
    addNoticia(titulo, contenido, autor) {
        const main = document.querySelector("main");

        const article = document.createElement("article");

        const h3 = document.createElement("h3");
        h3.textContent = titulo;

        const pContenido = document.createElement("p");
        pContenido.innerHTML = `<strong>Contenido:</strong> ${contenido}`;

        const pAutor = document.createElement("p");
        pAutor.innerHTML = `<strong>Autor:</strong> ${autor}`;

        article.appendChild(h3);
        article.appendChild(pContenido);
        article.appendChild(pAutor);

        main.appendChild(article);
    }
}

const noticias = new Noticias();

$(document).ready(function() {
    // Leer el archivo cuando se selecciona
    $("input[type='file']").change(function(event) {
        const file = event.target.files[0];
        if (file) {
            noticias.readInputFile(file);
        }
    });

    // Al pulsar el botón "Añadir noticia"
    $("button").click(function() {
        const titulo = $("input[type='text']").eq(0).val();
        const contenido = $("input[type='text']").eq(1).val();
        const autor = $("input[type='text']").eq(2).val();

        if (titulo && contenido && autor) {
            noticias.addNoticia(titulo, contenido, autor);
            // Limpiar los campos de entrada
            $("input[type='text']").val("");
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});
