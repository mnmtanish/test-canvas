var canvas = new fabric.Canvas('canvas', { renderOnAddRemove: false });
experiment.shapes.forEach(function (shape) {
    shape.view = new fabric.Rect({
        left: shape.x,
        top: shape.y,
        fill: '#aaa',
        width: shape.w,
        height: shape.h,
    });
    canvas.add(shape.view);
});
experiment.render = function () {
    canvas.renderAll();
};
experiment.before = function () {
    var seconds = Date.now() / 1000;
    experiment.shapes.forEach(function (shape) {
        shape.view.set('left', shape.x + 100 * Math.sin(shape.x * shape.y + seconds));
        shape.view.set('top', shape.y + 100 * Math.sin(shape.x * shape.y + seconds));
    });
};
