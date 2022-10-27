class Ball{
    #x;
    #y;
    #vx;
    #vy;

    constructor(x,y,vx,vy){
        this.#x = x;
        this.#y = y;
        this.#vx = vx;
        this.#vy = vy;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get vx(){
        return this.#vx;
    }

    get vy(){
        return this.#vy;
    }

    moveX(){
        this.#x += this.#vx; 
    }

    moveY(){
        this.#y += this.#vy; 
    }

    bounceV(){
        this.#vy =  -this.#vy;
    }

    bounceH(){
        this.#vx =  -this.#vx;
    }

    setXY(x,y){
        this.#x = x;
        this.#y = y;
    }
}