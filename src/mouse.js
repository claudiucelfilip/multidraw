class Mouse {
    constructor() {
        this.pressed = false;
        this.onMoveHandlers = [];
        this.onOutHandlers = [];
        this.x = 0;
        this.y = 0;
        this.matrix = math.matrix([
            0,
            0,
            1
        ]);
        document.body.addEventListener('mousedown', this.press.bind(this));
        document.body.addEventListener('mouseup', this.lift.bind(this));
        document.body.addEventListener('mousemove', this.updatePos.bind(this));
        document.body.addEventListener('mouseout', this.out.bind(this));
    }

    onMove(handler) {
        this.onMoveHandlers.push(handler);
    }

    updatePos(event) {
        this.x = event.clientX;
        this.y = event.clientY;

        this.onMoveHandlers.forEach((handle) => handle(this.pressed, this.x, this.y));
    }

    onOut(handler) {
        this.onOutHandlers.push(handler);
    }

    out() {
        this.onOutHandlers.forEach(handle => handle());
    }

    press() {
        this.pressed = true;
    }

    lift() {
        this.pressed = false;
    }
}