const stage = new createjs.Stage(experiment.canvas);

const view = new createjs.Shape();
stage.addChild(view);

experiment.select = shape => {
    shape.selected = true;
};

experiment.unselect = shape => {
    shape.selected = false;
};

experiment.render = () => {
    stage.update();
};

experiment.before = () => {
    const seconds = Date.now() / 1000;
    view.graphics.clear();
    experiment.shapes.forEach(shape => {
        if (shape.selected) {
            view.graphics.beginFill(createjs.Graphics.getRGB(70, 70, 70));
        } else {
            view.graphics.beginFill(createjs.Graphics.getRGB(170, 170, 170));
        }
        view.graphics.rect(shape.x, shape.y, shape.w, shape.h);
    });
};
