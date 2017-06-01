paper.setup(experiment.canvas);

experiment.shapes.forEach(shape => {
    const point = new paper.Point(shape.x,shape.y);
    const size = new paper.Size(shape.w,shape.h);
    shape.view = new paper.Path.Rectangle(point, size);
    shape.view.fillColor = '#aaa';
});

experiment.render = () => {
    paper.view.draw();
};
