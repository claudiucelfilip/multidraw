(function() {
    let drawer = new Drawer('canvas', 128);
    let mouse = new Mouse();


    mouse.onMove((pressed, x, y) => {
        if (pressed) {
            drawer.fullOp();

        } else {
            drawer.partialOp();

        }
        drawer.drawSquares(x, y);

    });

    mouse.onOut(() => {
        drawer.reset();
    })
})();