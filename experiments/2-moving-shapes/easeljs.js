const stage = new createjs.Stage(experiment.canvas);

experiment.shapes.forEach(shape => {
    shape.view = new createjs.Shape();
    shape.view.graphics.beginFill(createjs.Graphics.getRGB(170, 170, 170));
    shape.view.graphics.rect(0, 0, shape.w, shape.h);
    shape.view.x = shape.x;
    shape.view.y = shape.y;
    stage.addChild(shape.view);
});

experiment.render = () => {
    stage.update();
};

experiment.before = () => {
    const delta = 50 + 50 * Math.sin(Date.now()/1000);
    experiment.shapes.forEach(shape => {
        shape.view.x = shape.x + delta;
    });
};
