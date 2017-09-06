const stage = new createjs.Stage(experiment.canvas);

const view = new createjs.Shape();
stage.addChild(view);

experiment.render = () => {
    stage.update();
};

experiment.before = () => {
    const seconds = Date.now() / 1000;
    view.graphics.clear();
    experiment.shapes.forEach(shape => {
        const x = shape.x + 100 * Math.sin(shape.x * shape.y + seconds);
        const y = shape.y + 100 * Math.sin(shape.x * shape.y + seconds);
        view.graphics.beginFill(createjs.Graphics.getRGB(170, 170, 170));
        view.graphics.rect(x, y, shape.w, shape.h);
    });
};
