const EXPERIMENTS = [
    { name: '1-idle-shapes' },
];

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

function generateShapes() {
    const { count } = getQueryParams();
    const cols = 100;
    const rows = count/cols;
    const shapes = [];
    const w = 10, h = 10;
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            const x = 5 + col * 15;
            const y = 5 + row * 15;
            shapes.push({ w, h, x, y });
        }
    }
    return shapes;
}

document.addEventListener('DOMContentLoaded', function () {
    const { experiment, framework, count } = getQueryParams();

    if (experiment && framework && count) {
        document.body.classList.add('ready');

        // !! global variable
        window.experiment = {};
        window.experiment.doLoop = true;
        window.experiment.before = () => {};
        window.experiment.render = () => {};
        window.experiment.shapes = generateShapes();
        window.experiment.canvas = document.getElementById('canvas');

        // start animation
        requestAnimationFrame(function animate() {
            window.experiment.before();
            window.experiment.render();
            if (window.experiment.doLoop) {
                requestAnimationFrame(animate);
            }
        });

        const promises = FRAMEWORKS.find(f => f.name === framework).scripts
            .map(src => appendElement('script', document.head, { src }))
            .map(el => new Promise(resolve => el.onload = resolve))
        Promise.all(promises)
            .then(() => appendElement('script', document.head, { src: `./${experiment}/${framework}.js` }))
        return;
    }

    const table = document.getElementById('experiment-list');
    EXPERIMENTS.forEach(e => {
        const tr = appendElement('tr', table);
        const td = appendElement('td', tr, { innerHTML: e.name });
        FRAMEWORKS.forEach(f => {
            const td = appendElement('td', tr, { innerHTML: `${f.name} - ` });
            [ 100, 200, 500, 1000 ].forEach(n => {
                const href = `?experiment=${e.name}&framework=${f.name}&count=${n}`;
                appendElement('a', td, { innerHTML: n, href });
            });
        });
    });
});
