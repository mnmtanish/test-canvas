const stage = new createjs.Stage(experiment.canvas);

experiment.shapes.forEach(shape => {
    shape.view = new createjs.Shape();
    shape.view.graphics.beginFill(createjs.Graphics.getRGB(170,170,170));
    shape.view.graphics.rect(shape.x,shape.y,shape.w,shape.h);
    stage.addChild(shape.view);
});

experiment.render = () => {
    stage.update();
};
