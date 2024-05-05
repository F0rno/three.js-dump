import * as THREE from 'three';
import * as utils from './utils.js';
import Grid from './grid.js';
import PerlinNoiseSphere from './PerlinNoiseSphere.js';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene()

let grid = new Grid(100, 400);
scene.add(grid.getGrid());
// Set the grid to "floor" rotation
grid.setRotation(Math.PI / 2, 0, 0);

// Add PerlinNoiseSphere
let perlinSphere = new PerlinNoiseSphere();
scene.add(perlinSphere.mesh);
perlinSphere.setPosition(0, 25, 0);
perlinSphere.increaseSize(4);

// Set camera position
camera.position.z = 5;
camera.position.y = 200;

function animate() {
    requestAnimationFrame(animate);
    grid.animateGridPerlinNoise();
    perlinSphere.animate();
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);