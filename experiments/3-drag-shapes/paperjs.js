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

experiment.select = shape => {
    shape.view.fillColor = '#444';
};

experiment.unselect = shape => {
    shape.view.fillColor = '#aaa';
};

experiment.updateXY = shape => {
    shape.view.position.x = shape.x;
    shape.view.position.y = shape.y;
};
