let clrsA = ["#CD88AF", "#AA5585", "#882D61", "#661141", "#440027"];
let clrs = clrsA;


let canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 1;
let friction = .80;

export let mouse = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(500);

})

window.addEventListener("click", ()=>{
    init(500);
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


class Circle {

    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    public x: number;
    public y: number;

    public dx: number;
    public dy: number;

    public radius: number;
    public originalRadius: number = this.radius;
    public begin: number = 0;
    public end: number = Math.PI * 2;

    public mouseRangeInteract : number = 100;
    public growthRate : number = 4;

    public maxGrowth : number = (Math.random()*100) +10;


    constructor(public color: string) {

        this.canvas = canvas;
        this.context = context;

        this.radius = (Math.random() * 30) + 2;
        this.originalRadius = this.radius;

        this.x = Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (window.innerHeight - this.radius * 2) + this.radius;

        this.dx = (Math.random() -.5) *3;
        this.dy = Math.random() * 20;
    }

    public draw = () => {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }


    public update = () => {

        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight) {
            this.dy = -this.dy * friction;
            console.log(this.dy);      
        }
        else {
            this.dy += gravity;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}


let allCircles: Circle[] = [];

function init(amount : number){
    allCircles = [];
    
    for (let i = 0; i < amount; i++) {
        allCircles.push(new Circle(clrs[Math.floor(Math.random() * clrs.length)]));
    }
    let testCircle = new Circle(clrsA[0]);
    testCircle.draw();

}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let c of allCircles) {
        c.update();
    }
}

animate(); 