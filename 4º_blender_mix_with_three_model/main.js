import * as THREE from 'three';
import * as utils from './utils.js';
import {lines, animateGridPerlinNoise} from './grid.js';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene()

scene.add(lines);

// Move the camera
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    animateGridPerlinNoise();
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);