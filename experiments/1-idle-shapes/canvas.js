const ctx = experiment.canvas.getContext('2d');

experiment.render = () => {
    ctx.clearRect(0, 0, experiment.canvas.width, experiment.canvas.height);
    for (let i=0, l=experiment.shapes.length; i<l; i++) {
        const shape = experiment.shapes[i];
        ctx.fillStyle = 'rgb(170,170,170)';
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
    }
};

experiment.before = () => {
};
