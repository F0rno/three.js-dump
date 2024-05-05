import * as THREE from 'three';
import * as utils from './utils.js';
import Grid from './grid.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const loader = new GLTFLoader();
let { scene, camera, renderer, controls } = utils.setupOrbitalScene()

let grid = new Grid(100, 400);
scene.add(grid.getGrid());
grid.setRotation(Math.PI / 2, 0, 0);

loader.load('./scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    // Move scene a little bit to botton
    gltf.scene.position.y = -6;
    // Reduce size of the scene
    gltf.scene.scale.set(0.1, 0.1, 0.1);
});

// Move the camera
camera.position.z = 5;
camera.position.y = 200;

function animate() {
    requestAnimationFrame(animate);
    grid.animateGridPerlinNoise();
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);