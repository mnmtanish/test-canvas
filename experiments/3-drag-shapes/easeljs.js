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

experiment.select = shape => {
    shape.view.graphics.beginFill(createjs.Graphics.getRGB(70, 70, 70));
    shape.view.graphics.rect(0, 0, shape.w, shape.h);
};

experiment.unselect = shape => {
    shape.view.graphics.beginFill(createjs.Graphics.getRGB(170, 170, 170));
    shape.view.graphics.rect(0, 0, shape.w, shape.h);
};

experiment.updateXY = shape => {
    shape.view.x = shape.x;
    shape.view.y = shape.y;
};
