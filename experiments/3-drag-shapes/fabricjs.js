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

experiment.select = shape => {
    shape.view.set('fill', '#444');
};

experiment.unselect = shape => {
    shape.view.set('fill', '#aaa');
};

experiment.updateXY = shape => {
    shape.view.set('left', shape.x);
    shape.view.set('top', shape.y);
};
