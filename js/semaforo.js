class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.unload_moment = null;
        this.clic_moment = null;

        const randomIndex = Math.floor(Math.random() * this.levels.length);
        this.difficulty = this.levels[randomIndex];

        this.createStructure();
    }

    createStructure() {
        const main = document.querySelector('main');
    
        const title = document.createElement('h1');
        title.textContent = 'Semáforo';
        main.appendChild(title);
    
        for (let i = 0; i < 4; i++) {  // Creación de las luces del semáforo
            const luz = document.createElement('div');
            main.appendChild(luz);
        }
    
        const startButton = document.createElement('button');
        startButton.textContent = 'Arranque';
        startButton.addEventListener('click', () => this.initSequence());
        main.appendChild(startButton);
    
        const reactionButton = document.createElement('button');
        reactionButton.textContent = 'Reacción';
        reactionButton.disabled = true;
        reactionButton.addEventListener('click', () => this.stopReaction());
        main.appendChild(reactionButton);
    
        this.reactionInfo = document.createElement('p');
        this.reactionInfo.textContent = 'Tiempo de reacción: ';
        main.appendChild(this.reactionInfo);
    }

    initSequence() {
        const main = document.querySelector('main');
        const startButton = document.querySelector('button:first-of-type');
        startButton.disabled = true;

        main.classList.add('load');
    
        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, (this.difficulty * 1000) + 5000);
    }
    
    endSequence() {
        const main = document.querySelector('main');
        main.classList.remove('load');
        main.classList.add('unload');

        const reactionButton = document.querySelector('button:nth-of-type(2)');
        reactionButton.disabled = false;
    }
    
    stopReaction() {
        this.clic_moment = new Date();
        
        const reactionTime = this.clic_moment - this.unload_moment;
        const roundedReactionTime = Math.round(reactionTime * 1000) / 1000;
        
        this.reactionInfo.textContent = `Tiempo de reacción: ${roundedReactionTime} milisegundos`;
        
        const main = document.querySelector('main');
        main.classList.remove('load', 'unload');
        
        const reactionButton = document.querySelector('button:nth-of-type(2)');
        reactionButton.disabled = true;
        const startButton = document.querySelector('button:first-of-type');
        startButton.disabled = false;

        this.createRecordForm(this.difficulty, roundedReactionTime / 1000);
    }

    createRecordForm(difficulty, reactionTime) {
        const form = $(`
            <form method="post" action="semaforo.php">
                <label for="name">Nombre: </label>
                <input type="text" id="name" name="name" required>
                
                <label for="surname">Apellidos: </label>
                <input type="text" id="surname" name="surname" required>
                
                <label for="level">Nivel: </label>
                <input type="text" id="level" name="level" value="${difficulty}" readonly>
                
                <label for="reactionTime">Tiempo: </label>
                <input type="text" id="reactionTime" name="reactionTime" value="${reactionTime}" readonly>
                
                <button type="submit">Guardar Récord</button>
            </form>
        `);

        // Añadir el formulario debajo del semáforo
        $('main').append(form);
    }        
}