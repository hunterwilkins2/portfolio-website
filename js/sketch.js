let ds;
let canvas;
let counter = 0;

function setup() {
    const hero = document.getElementById('hero-canvas');
    canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
    canvas.parent('hero-canvas');
    background(0, 0, 0, 0);


    ds = new PenroseLSystem();
    ds.simulate(4);
}

function draw() {
    background(0, 0, 0, 0);
    ds.render();
    if (counter % 100 === 0) {
        console.log(counter);
    }
    if (counter === 1000) {
        save(canvas, 'penrose.jpg');
        noLoop();
    }
    counter++;
}

function PenroseLSystem() {
    this.steps = 0;

    this.axiom = "[X]++[X]++[X]++[X]++[X]";
    this.ruleW = "YF++ZF----XF[-YF----WF]++";
    this.ruleX = "+YF--ZF[---WF--XF]+";
    this.ruleY = "-WF++XF[+++YF++ZF]-";
    this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

    this.startLength = width * 1.5;
    this.theta = TWO_PI / 10.0;
    this.reset();
}

PenroseLSystem.prototype.simulate = function (gen) {
    while (this.getAge() < gen) {
        this.iterate(this.production);
    }
}
PenroseLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
}

PenroseLSystem.prototype.getAge = function () {
    return this.generations;
}

PenroseLSystem.prototype.iterate = function () {
    let newProduction = "";

    for (let i = 0; i < this.production.length; ++i) {
        let step = this.production.charAt(i);
        if (step == 'W') {
            newProduction = newProduction + this.ruleW;
        }
        else if (step == 'X') {
            newProduction = newProduction + this.ruleX;
        }
        else if (step == 'Y') {
            newProduction = newProduction + this.ruleY;
        }
        else if (step == 'Z') {
            newProduction = newProduction + this.ruleZ;
        }
        else {
            if (step != 'F') {
                newProduction = newProduction + step;
            }
        }
    }

    this.drawLength = this.drawLength * 0.5;
    this.generations++;
    this.production = newProduction;
}

PenroseLSystem.prototype.render = function () {
    translate(width / 2, height / 2);

    this.steps += 20;
    if (this.steps > this.production.length) {
        this.steps = this.production.length;
    }

    for (let i = 0; i < this.steps; ++i) {
        let step = this.production.charAt(i);

        if (step == 'F') {
            stroke(255, 60);
            for (let j = 0; j < this.repeats; j++) {
                line(0, 0, 0, -this.drawLength);
                noFill();
                translate(0, -this.drawLength);
            }
            this.repeats = 1;
        }
        else if (step == '+') {
            rotate(this.theta);
        }
        else if (step == '-') {
            rotate(-this.theta);
        }
        else if (step == '[') {
            push();
        }
        else if (step == ']') {
            pop();
        }
    }
}