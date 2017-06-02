paper.setup(experiment.canvas);

experiment.shapes.forEach(shape => {
    const point = new paper.Point(shape.x,shape.y);
    const size = new paper.Size(shape.w,shape.h);
    shape.view = new paper.Path.Rectangle(point, size);
    shape.view.fillColor = '#aaa';
});

paper.view.onFrame = () => {
    const seconds = Date.now() / 1000;
    experiment.shapes.forEach(shape => {
        shape.view.position.x = shape.x + 100 * Math.sin(shape.x * shape.y + seconds);
        shape.view.position.y = shape.y + 100 * Math.sin(shape.x * shape.y + seconds);
    });
};

experiment.doLoop = false;
paper.view.draw();