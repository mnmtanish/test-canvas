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

experiment.before = () => {
    const delta = 50 + 50 * Math.sin(Date.now()/1000);
    experiment.shapes.forEach(shape => {
        const left = shape.x + delta;
        shape.view.set('left', left);
    });
};