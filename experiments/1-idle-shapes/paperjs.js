paper.setup(experiment.canvas);
experiment.shapes.forEach(function (shape) {
    var point = new paper.Point(shape.x, shape.y);
    var size = new paper.Size(shape.w, shape.h);
    shape.view = new paper.Path.Rectangle(point, size);
    shape.view.fillColor = '#aaa';
});
experiment.render = function () {
    paper.view.draw();
};
