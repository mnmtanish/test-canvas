var ctx = experiment.canvas.getContext('2d');
experiment.render = function () {
    ctx.clearRect(0, 0, experiment.canvas.width, experiment.canvas.height);
    for (var i = 0, l = experiment.shapes.length; i < l; i++) {
        var shape = experiment.shapes[i];
        ctx.fillStyle = 'rgb(170,170,170)';
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
    }
};
experiment.before = function () {
};
