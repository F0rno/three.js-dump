import * as THREE from 'three';

let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let gridSize = 100; // Number of squares
let squareSize = 50; // Size of each square

let xSize = gridSize;
let ySize = gridSize;

let n = xSize * ySize;

let geometry = new THREE.BufferGeometry();

function mapTo2D(i) {
    let y = Math.floor(i / xSize);
    let x = i % xSize;
    return { x: x, y: y };
}

function mapFrom2D(x, y) {
    return x + y * xSize;
}

let positions = [];
for (let i = 0; i < n; i++) {
    let p = mapTo2D(i);
    positions.push((p.x - xSize / 2) * squareSize / xSize);
    positions.push((p.y - ySize / 2) * squareSize / ySize);
    positions.push(0);
}
let positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
geometry.setAttribute("position", positionAttribute);

let indexPairs = [];
for (let i = 0; i < n; i++) {
    let p = mapTo2D(i);
    if (p.x + 1 < xSize) {
        indexPairs.push(i);
        indexPairs.push(mapFrom2D(p.x + 1, p.y));
    }
    if (p.y + 1 < ySize) {
        indexPairs.push(i);
        indexPairs.push(mapFrom2D(p.x, p.y + 1));
    }
}
geometry.setIndex(indexPairs);
let lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial());
scene.add(lines);

camera.position.z = 2;
camera.position.y = 0;
camera.lookAt(0, 0, 0);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);