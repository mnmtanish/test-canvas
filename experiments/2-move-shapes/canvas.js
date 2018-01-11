var ctx = experiment.canvas.getContext('2d');
experiment.render = function () {
    var seconds = Date.now() / 1000;
    ctx.clearRect(0, 0, experiment.canvas.width, experiment.canvas.height);
    for (var i = 0, l = experiment.shapes.length; i < l; i++) {
        var shape = experiment.shapes[i];
        var x = shape.x + 100 * Math.sin(shape.x * shape.y + seconds);
        var y = shape.y + 100 * Math.sin(shape.x * shape.y + seconds);
        ctx.fillStyle = 'rgb(170,170,170)';
        ctx.fillRect(x, y, shape.w, shape.h);
    }
};
experiment.before = function () {
};
