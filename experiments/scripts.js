var FRAMEWORKS = [
    { name: 'canvas', scripts: [] },
    { name: 'fabricjs', scripts: ['../_frameworks/fabricjs.js'] },
    { name: 'paperjs', scripts: ['../_frameworks/paperjs.js'] },
    { name: 'easeljs', scripts: ['../_frameworks/easeljs.js', '../_frameworks/tweenjs.js'] },
    { name: 'easeljs-d', scripts: ['../_frameworks/easeljs.js', '../_frameworks/tweenjs.js'] },
];
function getQueryParams() {
    return location.search.slice(1)
        .split('&')
        .map(function (s) { return s.split('='); })
        .reduce(function (o, p) {
        return Object.assign(o, (_a = {}, _a[p[0]] = decodeURIComponent(p[1]), _a));
        var _a;
    }, {});
}
function appendElement(name, parent, props) {
    if (props === void 0) { props = {}; }
    var tag = document.createElement(name);
    Object.keys(props).forEach(function (key) { return tag[key] = props[key]; });
    parent.appendChild(tag);
    return tag;
}
function generateShapes(n) {
    var cols = 100;
    var rows = Math.floor(n / cols);
    var shapes = [];
    var W = 1920, H = 984;
    var w = 10, h = 10, s = 5;
    var dx = (W - (cols * w + (cols - 1) * s)) / 2;
    var dy = (H - (rows * h + (rows - 1) * s)) / 2;
    for (var row = 0; row < rows; ++row) {
        for (var col = 0; col < cols; ++col) {
            var x = dx + col * (w + s);
            var y = dy + row * (h + s);
            shapes.push({ w: w, h: h, x: x, y: y });
        }
    }
    return shapes;
}
function getShapeAtPos(shapes, x, y) {
    return shapes.find(function (shape) {
        return shape.y <= y &&
            shape.y + shape.h >= y &&
            shape.x <= x &&
            shape.x + shape.w >= x;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var query = getQueryParams();
    if (!query.e || !query.f || !query.n) {
        alert('please set query params "e", "f" and "n"');
        return;
    }
    // !! global var
    experiment = {};
    experiment.doLoop = true;
    experiment.before = function () { };
    experiment.render = function () { };
    experiment.select = function (shape) { };
    experiment.selected = { moving: false, dirty: false, shapes: [] };
    experiment.unselect = function (shape) { };
    experiment.updateXY = function (shape) { };
    experiment.shapes = generateShapes(query.n);
    experiment.canvas = document.getElementById('canvas');
    experiment.extras = document.getElementById('extras');
    experiment.clicks = document.getElementById('clicks');
    // start animation
    requestAnimationFrame(function animate() {
        if (experiment.selected.dirty) {
            experiment.selected.dirty = false;
            experiment.selected.shapes.forEach(function (shape) { experiment.updateXY(shape); });
        }
        experiment.before();
        experiment.render();
        if (experiment.doLoop) {
            requestAnimationFrame(animate);
        }
    });
    // add framework js
    var promises = FRAMEWORKS.find(function (f) { return f.name === query.f; }).scripts
        .map(function (src) { return appendElement('script', document.head, { src: src }); })
        .map(function (el) { return new Promise(function (resolve) { return el.onload = resolve; }); });
    // add experiment js
    Promise.all(promises)
        .then(function () { appendElement('script', document.head, { src: "./" + query.e + "/" + query.f + ".js" }); });
    // add mousedown event
    experiment.clicks.addEventListener('mousedown', function (e) {
        var shape = getShapeAtPos(experiment.shapes, e.x, e.y);
        var shapeIndex = experiment.selected.shapes.findIndex(function (s) { return s === shape; });
        if (!e.shiftKey) {
            if (!shape) {
                // When user clicks on the blank area, clear the selection.
                experiment.selected.shapes.forEach(function (s) { return experiment.unselect(s); });
                experiment.selected.dirty = false;
                experiment.selected.shapes = [];
                experiment.selected.offsets = [];
            }
            else if (shapeIndex === -1) {
                // When user clicks on a shape which is not selected, select it.
                experiment.selected.shapes.forEach(function (s) { return experiment.unselect(s); });
                experiment.selected.moving = true;
                experiment.selected.shapes = [shape];
                experiment.selected.offsets = [{ ox: e.x - shape.x, oy: e.y - shape.y }];
                experiment.select(shape);
            }
            else {
                // When user clicks on a selected shape, update shape offsets.
                experiment.selected.moving = true;
                experiment.selected.offsets = experiment.selected.shapes.map(function (s) {
                    return { ox: e.x - s.x, oy: e.y - s.y };
                });
            }
        }
        else {
            if (!shape) {
                return;
            }
            else if (shapeIndex === -1) {
                // When user clicks on a shape which is not selected, select it.
                experiment.selected.shapes.push(shape);
                experiment.selected.offsets.push({ ox: e.x - shape.x, oy: e.y - shape.y });
                experiment.select(shape);
            }
            else {
                // When user clicks on a selected shape, remove it from selection.
                experiment.selected.shapes.splice(shapeIndex, 1);
                experiment.selected.offsets.splice(shapeIndex, 1);
                experiment.unselect(shape);
            }
        }
    });
    // add mouseup event
    experiment.clicks.addEventListener('mouseup', function (e) {
        experiment.selected.moving = false;
    });
    // add mousemove event
    experiment.clicks.addEventListener('mousemove', function (e) {
        if (experiment.selected.moving) {
            experiment.selected.dirty = true;
            experiment.selected.shapes.forEach(function (shape, idx) {
                var _a = experiment.selected.offsets[idx], ox = _a.ox, oy = _a.oy;
                shape.x = e.x - ox;
                shape.y = e.y - oy;
            });
        }
    });
});
