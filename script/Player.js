class player{

    #x;
    #y;
    #score;

    constructor(x,y){
        this.#x = x;
        this.#y = y;
        this.#score = 0;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get score(){
        return this.#score;
    }

    moveUp(){
        this.#y -= 40;
    }

    moveDown(){
        this.#y += 40;
    }

    incScore(){
        this.#score++;
    }
}