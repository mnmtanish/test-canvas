var stage = new createjs.Stage(experiment.canvas);
var view = new createjs.Shape();
stage.addChild(view);
experiment.render = function () {
    stage.update();
};
experiment.before = function () {
    var seconds = Date.now() / 1000;
    view.graphics.clear();
    experiment.shapes.forEach(function (shape) {
        var x = shape.x + 100 * Math.sin(shape.x * shape.y + seconds);
        var y = shape.y + 100 * Math.sin(shape.x * shape.y + seconds);
        view.graphics.beginFill(createjs.Graphics.getRGB(170, 170, 170));
        view.graphics.rect(x, y, shape.w, shape.h);
    });
};
