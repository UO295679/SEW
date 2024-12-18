class Memoria {
    constructor() {
        this.elements = [
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ];
        
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    flipCard(game) {
        if (this.dataset.state === 'revealed' || game.lockBoard) return;
        if (this === game.firstCard) return;

        this.dataset.state = 'flipped'; 

        if (!game.hasFlippedCard) {
            game.hasFlippedCard = true; 
            game.firstCard = this; 
        } else {
            game.secondCard = this; 
            game.checkForMatch();
        }
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.dataset.state = '';
            this.secondCard.dataset.state = '';
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        [this.hasFlippedCard, this.lockBoard] = [false, false];
        [this.firstCard, this.secondCard] = [null, null];
    }

    checkForMatch() {
        const firstElement = this.firstCard.elementType;
        const secondElement = this.secondCard.elementType;
        const isMatch = firstElement === secondElement;
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.dataset.state = 'revealed';
        this.secondCard.dataset.state = 'revealed';
        this.resetBoard();
    }

    createElements() {
        const gameBoard = document.querySelector('main');
    
        this.elements.forEach((element) => {
            const card = document.createElement("article");
            card.elementType = element.element;
    
            const cardHeader = document.createElement("h3");
            cardHeader.textContent = "Tarjeta";
            
            const cardImage = document.createElement("img");
            cardImage.src = element.source;
            cardImage.alt = element.element;
    
            card.appendChild(cardHeader);
            card.appendChild(cardImage);
    
            gameBoard.appendChild(card);
        });
    }
    
    addEventListeners() {
        const cards = document.querySelectorAll('main article');
        cards.forEach(card => {
            card.addEventListener('click', this.flipCard.bind(card, this));
        });
    }
    
}