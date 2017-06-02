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
    experiment.selected = { moving: false, dirty: false, shapes: [] };
    experiment.unselect = shape => {};
    experiment.updateXY = shape => {};
    experiment.shapes = generateShapes(query.n);
    experiment.canvas = document.getElementById('canvas');
    experiment.extras = document.getElementById('extras');
    experiment.clicks = document.getElementById('clicks');

    // start animation
    requestAnimationFrame(function animate() {
        if (experiment.selected.dirty) {
            experiment.selected.dirty = false;
            experiment.selected.shapes.forEach(shape => experiment.updateXY(shape));
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

    // add mousedown event
    experiment.clicks.addEventListener('mousedown', e => {
        const shape = getShapeAtPos(experiment.shapes, e.x, e.y);
        const shapeIndex = experiment.selected.shapes.findIndex(s => s === shape);

        if (!e.shiftKey) {
            if (!shape) {
                // When user clicks on the blank area, clear the selection.
                experiment.selected.shapes.forEach(s => experiment.unselect(s));
                experiment.selected.dirty = false;
                experiment.selected.shapes = [];
                experiment.selected.offsets = [];
            } else if (shapeIndex === -1) {
                // When user clicks on a shape which is not selected, select it.
                experiment.selected.shapes.forEach(s => experiment.unselect(s));
                experiment.selected.moving = true;
                experiment.selected.shapes = [shape];
                experiment.selected.offsets = [{ ox: e.x - shape.x, oy: e.y - shape.y }];
                experiment.select(shape);
            } else {
                // When user clicks on a selected shape, update shape offsets.
                experiment.selected.moving = true;
                experiment.selected.offsets = experiment.selected.shapes.map(s => {
                    return { ox: e.x - s.x, oy: e.y - s.y };
                });
            }
        } else {
            if (!shape) {
                return;
            } else if (shapeIndex === -1) {
                // When user clicks on a shape which is not selected, select it.
                experiment.selected.shapes.push(shape)
                experiment.selected.offsets.push({ ox: e.x - shape.x, oy: e.y - shape.y });
                experiment.select(shape);
            } else {
                // When user clicks on a selected shape, remove it from selection.
                experiment.selected.shapes.splice(shapeIndex, 1);
                experiment.selected.offsets.splice(shapeIndex, 1);
                experiment.unselect(shape);
            }
        }
    });

    // add mouseup event
    experiment.clicks.addEventListener('mouseup', e => {
        experiment.selected.moving = false;
    });

    // add mousemove event
    experiment.clicks.addEventListener('mousemove', e => {
        if (experiment.selected.moving) {
            experiment.selected.dirty = true;
            experiment.selected.shapes.forEach((shape, idx) => {
                const { ox, oy } = experiment.selected.offsets[idx];
                shape.x = e.x - ox;
                shape.y = e.y - oy;
            });
        }
    });
});
