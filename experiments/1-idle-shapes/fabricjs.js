const canvas = new fabric.Canvas('canvas', { renderOnAddRemove: false });

experiment.shapes.forEach(shape => {
    shape.view = new fabric.Rect({
        left: shape.x,
        top: shape.y,
        fill: '#aaa',
        width: shape.w,
        height: shape.h,
    });
    canvas.add(shape.view);
});

experiment.render = () => {
    canvas.renderAll();
};
