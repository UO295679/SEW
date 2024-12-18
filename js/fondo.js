class Fondo {
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;

        this.cargarFondo();
    }

     // Método para cargar el fondo desde Flickr
     cargarFondo() {
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
            {
                tags: this.circuito,
                tagmode: "any",
                format: "json"
            })
        .done(function(data) {
            if (data.items.length > 0) {
                $("body").css("background-image", "url('" + data.items[1].media.m.replace('_m', '_b') + "')");
                $("body").css("background-size", "cover");
                $("body").css("height", "100%");
                $("body").css("width", "100%");
                $("body").css("position", "center");
            }
        });
    }
}