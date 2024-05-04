import * as THREE from 'three';
import * as utils from './utils.js';
import Grid from './grid.js';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene()

let grid = new Grid(100, 10);
scene.add(grid.lines);

// Move the camera
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    grid.animateGridPerlinNoise();
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);