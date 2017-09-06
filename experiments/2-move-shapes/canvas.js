const ctx = experiment.canvas.getContext('2d');

experiment.render = () => {
    const seconds = Date.now() / 1000;
    ctx.clearRect(0, 0, experiment.canvas.width, experiment.canvas.height);
    for (let i=0, l=experiment.shapes.length; i<l; i++) {
        const shape = experiment.shapes[i];
        const x = shape.x + 100 * Math.sin(shape.x * shape.y + seconds);
        const y = shape.y + 100 * Math.sin(shape.x * shape.y + seconds);
        ctx.fillStyle = 'rgb(170,170,170)';
        ctx.fillRect(x, y, shape.w, shape.h);
    }
};

experiment.before = () => {
};
