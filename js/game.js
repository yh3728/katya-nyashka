const MENU = 'menu';
const TUTORIAL = 'tutorial';
const PLAYING = 'playing';
const PAUSED = 'paused';
const WIN = 'win';

const stateMachine = {
    [MENU]: {nextState: TUTORIAL},
    [TUTORIAL]: {nextState: PLAYING},
    [PLAYING]: {nextState: WIN},
    [WIN]: {nextState: MENU},
}

const types = {
    ONE: "blue",
    TWO: "red",
    THREE: "yellow",
}

const items = [
    {
        type: types.ONE,
        img: "images/one.png",
        position: {
            x: 100,
            y: 100
        }
    },
    {
        type: types.TWO,
        img: "images/two.png",
        position: {
            x: 300,
            y: 400
        }
    },
    {
        type: types.THREE,
        img: "images/three.png",
        position: {
            x: 500,
            y: 200
        }
    },
]

class Game {
    state = MENU

    constructor(gameContainer) {
        this.gameContainer = gameContainer;
        this.elements = {
            [MENU]: gameContainer.querySelector("#menu"),
            [TUTORIAL]: gameContainer.querySelector("#tutorial"),
            [PLAYING]: gameContainer.querySelector("#playing"),
            [PAUSED]: gameContainer.querySelector("#paused"),
            [WIN]: gameContainer.querySelector("#win"),
        }

        this.addListeners();

        this[`${this.state}Initialize`]()
    }

    addListeners(){
    //     MENU
        const playButton = this.elements[MENU].querySelector("#menu-button");
        playButton.addEventListener("click", ()=>{
            this.changeState(stateMachine[this.state].nextState);
        })
    //     TUTORIAL
        const nextButton = this.elements[TUTORIAL].querySelector("#next-button");
        nextButton.addEventListener("click", ()=>{
            this.changeState(stateMachine[this.state].nextState);
        })
    //     PLAYING
        const pauseButton = this.elements[PLAYING].querySelector("#pause-button");
        pauseButton.addEventListener("click", ()=>{
            this.changeState(PAUSED);
        })
    //     PAUSE
        const backToGameButton = this.elements[PAUSED].querySelector("#back-to-game-button");
        backToGameButton.addEventListener("click", ()=>{
            this.changeState(PLAYING, true);
        })
    //    WIN and PAUSE
        const restartButtons = this.gameContainer.querySelectorAll(".restart-button");
        restartButtons.forEach((button) => {
            button.addEventListener("click", ()=> {
                    this.changeState(PLAYING);
                })
        })
    //     WIN
        const backToMenuButton = this.elements[WIN].querySelector("#back-to-menu-button");
        backToMenuButton.addEventListener("click", ()=>{
            this.changeState(stateMachine[this.state].nextState)
        });
    }

    changeState(state, skipInit = false) {
        if (state === PAUSED) {
            this.elements[PAUSED].style.display = "";
            this.elements[PLAYING].classList.add("is-paused");
            return;
        }

        if (state === PLAYING) {
            this.elements[PAUSED].style.display = "none";
            this.elements[PLAYING].classList.remove("is-paused");
        }

        this.state = state;
        this.show(state);

        if (!skipInit)
            this[`${state}Initialize`]()
    }

    show(state) {
        Object.values(this.elements).forEach(el => el.style.display = "none");
        this.elements[state].style.display = "";
    }

    [`${MENU}Initialize`]() {}

    [`${TUTORIAL}Initialize`](){}

    [`${PLAYING}Initialize`](){
        const currentElement = this.elements[PLAYING];
        const itemsBar = currentElement.querySelector("#items-bar");
        const gameField = currentElement.querySelector("#game-field");

        // на всякий случай очистка всех предметов
        itemsBar.innerHTML = "";
        gameField.innerHTML = "";

        this.foundItemsCount = 0;
        this.createItems(itemsBar, gameField);
    }

    [`${WIN}Initialize`](){}

    createItems(itemsBar, gameField) {
        this.items = [];
        items.forEach((item) => {
            const newItem = new Item(item, this);
            this.items.push(newItem);
            itemsBar.appendChild(newItem.barElement);
            gameField.appendChild(newItem.fieldElement);
        })
    }

    itemFound(){
        this.foundItemsCount++
        if (this.foundItemsCount === items.length) this.finishGame()
    }

    finishGame(){
        this.changeState(stateMachine[this.state].nextState);
    }

}

class Item {

    constructor(item, game) {
        this.type = item.type;
        // TODO картинка
        this.img = item.img;
        this.found = false;
        this.game = game;
        this.createElement(item.position);
        this.fieldElement.addEventListener("click", () => {
            if (this.found) return;
            this.found = true;
            this.clearElement()
            this.game.itemFound()
        })
    }

    createElement({x, y}){
        this.fieldElement = document.createElement("div");
        this.fieldElement.classList.add("item");
        this.fieldElement.style.backgroundColor = this.type;

        this.barElement = this.fieldElement.cloneNode();
        this.barElement.classList.add("bar");

        this.fieldElement.style.transform = `translate(${x}px, ${y}px)`;
    }

    clearElement(){
        this.fieldElement.remove()
        this.barElement.remove()
    }

}

new Game(document.getElementById("game-container"));