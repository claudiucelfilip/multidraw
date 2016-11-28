class Drawer {

    constructor(elementId, regions) {
        this.canvas = document.getElementById(elementId);
        this.canvas.setAttribute('width', document.body.offsetWidth);
        this.canvas.setAttribute('height', document.body.offsetHeight);
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = 'rgba(0,0,0,0.05)';
        this.regions = regions;
        this.drawers = [];
    }

    fullOp() {
        this.context.strokeStyle = 'rgba(0,0,0,0.8)';
    }

    partialOp() {
        this.context.strokeStyle = 'rgba(0,0,0,0.05)';
    }

    drawPoint(x, y) {
        let prevX;
        let prevY;
        let med = 0.2;
        console.log('draw new');

        function resetPrevs() {
            prevX = undefined;
            prevY = undefined;
        }
        return (function(x, y) {
            prevX = prevX || x;
            prevY = prevY || y;
            let newMed = Math.sqrt(Math.pow(prevX - x, 2) + Math.pow(prevY - y, 2));
            this.context.lineWidth = ((med * 20 + newMed) / 21) / 4 % 4 * 4 + 0.1;
            this.context.beginPath();
            this.context.moveTo(prevX, prevY);
            this.context.lineTo(x, y);
            this.context.stroke();
            prevX = x;
            prevY = y;
            med = newMed;
            this.context.closePath();

            return resetPrevs;
        }).bind(this);

    }


    translate(x, y) {
        let matrix = math.matrix([x, y, 1]);

        matrix = math.multiply([
            [
                1,
                0,
                -this.canvas.width / 2  - (this.canvas.offsetLeft - document.body.scrollLeft)
            ],
            [
                0,
                1,
                -this.canvas.height / 2  - (this.canvas.offsetTop - document.body.scrollTop)
            ],
            [
                0,
                0,
                1
            ]
        ], matrix);

        return matrix.toArray();
    }
    drawSquares(posX, posY) {
        let trans = this.translate(posX, posY);
        let x = trans[0];
        let y = trans[1];

        let rad = 360 / this.regions * Math.PI/180;
        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

        let refl = -1;

        for (let i = 0; i < this.regions; i++) {
            let angle = i * rad;
            let matrix = math.matrix([x, y, 1]);
            matrix = math.multiply([
                [
                    (Math.cos(angle)),
                    (-Math.sin(angle)),
                    0
                ],
                [
                    (Math.sin(angle)),
                    (Math.cos(angle)),
                    0
                ],
                [
                    0,
                    0,
                    1
                ]
            ], matrix);
            refl *= -1;

            matrix = math.multiply([
                [
                    refl,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0
                ],
                [
                    0,
                    0,
                    1
                ]
            ], matrix);

            var arr =  matrix.toArray();
            this.drawers[i] = this.drawers[i] || this.drawPoint(arr[0], arr[1]);
            this.drawers[i](arr[0], arr[1]);
        }
        this.context.restore();

    }
    reset() {
        this.drawers = [];
    }
}