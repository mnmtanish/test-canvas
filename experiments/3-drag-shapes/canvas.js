var ctx = experiment.canvas.getContext('2d');
experiment.select = function (shape) {
    shape.selected = true;
};
experiment.unselect = function (shape) {
    shape.selected = false;
};
experiment.render = function () {
    ctx.clearRect(0, 0, experiment.canvas.width, experiment.canvas.height);
    for (var i = 0, l = experiment.shapes.length; i < l; i++) {
        var shape = experiment.shapes[i];
        if (shape.selected) {
            ctx.fillStyle = 'rgb(70,70,70)';
        }
        else {
            ctx.fillStyle = 'rgb(170,170,170)';
        }
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
    }
};
experiment.before = function () {
};
