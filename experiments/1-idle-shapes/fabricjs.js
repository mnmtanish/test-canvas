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
