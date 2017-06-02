paper.setup(experiment.canvas);

experiment.shapes.forEach(shape => {
    const point = new paper.Point(shape.x,shape.y);
    const size = new paper.Size(shape.w,shape.h);
    shape.view = new paper.Path.Rectangle(point, size);
    shape.view.fillColor = '#aaa';
});

paper.view.onFrame = () => {
    const delta = 50 + 50 * Math.sin(Date.now()/1000);
    experiment.shapes.forEach(shape => {
        shape.view.position.x = shape.x + delta;
    });
};

experiment.doLoop = false;
paper.view.draw();