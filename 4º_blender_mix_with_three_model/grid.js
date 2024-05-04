import * as THREE from 'three';
import { Noise } from 'noisejs';

let noise = new Noise(Math.random());

let gridSize = 10; // Number of squares
let squareSize = 5; // Size of each square

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


let t = 0;
function animateGridPerlinNoise() {
    if (t >= 10) {
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
}

export {lines, animateGridPerlinNoise};