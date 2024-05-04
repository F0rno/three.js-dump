import * as THREE from 'three';
import { Noise } from 'noisejs';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let noise = new Noise(Math.random());
let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true // Preguntar al barre
});
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let gridSize = 500; // Number of squares
let squareSize = 500; // Size of each square

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
    let noiseX = noise.perlin2(p.x / 100, p.y / 100);
    let noiseY = noise.perlin2(p.y / 100, p.x / 100);
    positions.push((p.x - xSize / 2 + noiseX) * squareSize / xSize);
    positions.push((p.y - ySize / 2 + noiseY) * squareSize / ySize);
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

camera.position.z = 5;
camera.position.y = 0;
camera.lookAt(0, 0, 0);
let t = 0;

function animate() {
    requestAnimationFrame(animate);
    if (t >= 10) {
        console.log("Resetting");
        t = 0;
    }
    t += 0.005;
    for (let i = 0; i < n; i++) {
        let p = mapTo2D(i);
        let noiseX = noise.perlin2(p.x / 10 + t, p.y / 10 + t); // El 10 es el ruido de las ondas
        let noiseY = noise.perlin2(p.y / 10 + t, p.x / 10 + t);
        positions[3 * i] = (p.x - xSize / 2 + noiseX) * squareSize / xSize;
        positions[3 * i + 1] = (p.y - ySize / 2 + noiseY) * squareSize / ySize;
    }
    positionAttribute.array = new Float32Array(positions); // Update the attribute array
    positionAttribute.needsUpdate = true; // Notify Three.js to update the GPU
    controls.update();
    renderer.render(scene, camera);
}
animate();

