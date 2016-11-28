(function() {
    let drawer = new Drawer('canvas', 32);
    let mouse = new Mouse();


    mouse.onMove((pressed, x, y) => {
        if (pressed) {
            drawer.fullOp();
            drawer.drawSquares(x, y);
        } else {
            // drawer.partialOp();
            drawer.reset();
        }

    });

    mouse.onOut(() => {
        drawer.reset();
    })
})();