const FRAMEWORKS = [
    { name: 'fabricjs', scripts: [ '../_frameworks/fabricjs.js' ] },
    { name: 'paperjs', scripts: [ '../_frameworks/paperjs.js' ] },
    { name: 'easeljs', scripts: [ '../_frameworks/easeljs.js', '../_frameworks/tweenjs.js' ] },
];

function getQueryParams() {
    return location.search.slice(1)
        .split('&')
        .map(s => s.split('='))
        .reduce((o, p) => Object.assign(o, { [p[0]]: decodeURIComponent(p[1]) }), {});
}

function appendElement(name, parent, props = {}) {
    const tag = document.createElement(name);
    Object.keys(props).forEach(key => tag[key] = props[key]);
    parent.appendChild(tag);
    return tag;
}

function generateShapes(n) {
    const cols = 100;
    const rows = Math.floor(n/cols);
    const shapes = [];
    const W = 1920, H = 984;
    const w = 10, h = 10, s = 5;
    const dx = (W - (cols * w + (cols - 1) * s))/2;
    const dy = (H - (rows * h + (rows - 1) * s))/2;
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            const x = dx + col * (w + s);
            const y = dy + row * (h + s);
            shapes.push({ w, h, x, y });
        }
    }
    return shapes;
}

function getShapeAtPos(shapes, x, y) {
    return shapes.find(shape => {
        return shape.y <= y &&
            shape.y + shape.h >= y &&
            shape.x <= x &&
            shape.x + shape.w >= x;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const query = getQueryParams();

    if (!query.e || !query.f || !query.n) {
        alert('please set query params "e", "f" and "n"');
        return;
    }

    // !! global var
    experiment = {};
    experiment.doLoop = true;
    experiment.before = () => {};
    experiment.render = () => {};
    experiment.select = shape => {};
    experiment.selected = null;
    experiment.unselect = shape => {};
    experiment.updateXY = shape => {};
    experiment.shapes = generateShapes(query.n);
    experiment.canvas = document.getElementById('canvas');
    experiment.extras = document.getElementById('extras');
    experiment.clicks = document.getElementById('clicks');

    // start animation
    requestAnimationFrame(function animate() {
        if (experiment.selected) {
            experiment.updateXY(experiment.selected.shape);
        }
        experiment.before();
        experiment.render();
        if (experiment.doLoop) {
            requestAnimationFrame(animate);
        }
    });

    // add framework js
    const promises = FRAMEWORKS.find(f => f.name === query.f).scripts
        .map(src => appendElement('script', document.head, { src }))
        .map(el => new Promise(resolve => el.onload = resolve))

    // add experiment js
    Promise.all(promises)
        .then(() => appendElement('script', document.head, { src: `./${query.e}/${query.f}.js` }));

    // add mouse events
    experiment.clicks.addEventListener('mousedown', e => {
        const shape = getShapeAtPos(experiment.shapes, e.x, e.y);
        if (shape) {
            experiment.selected = { shape, ox: e.x - shape.x, oy: e.y - shape.y };
            experiment.select(shape);
        }
    });
    experiment.clicks.addEventListener('mouseup', e => {
        if (experiment.selected) {
            experiment.unselect(experiment.selected.shape);
            experiment.selected = null;
        }
    });
    experiment.clicks.addEventListener('mousemove', e => {
        if (experiment.selected) {
            const { shape, ox, oy } = experiment.selected;
            shape.x = e.x - ox;
            shape.y = e.y - oy;
        }
    });
});
