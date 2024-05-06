import * as utils from './utils.js';
import * as TWEEN from 'tween';
import * as THREE from 'three';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene(2000)

// Add a box to the scene
let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// increase box size
cube.scale.set(10, 10, 10);

// Define the radius of the orbit and the speed of the animation
let radius = 50;
let speed = 2000;

// Define the start and end points for the camera's position
let startPoint = { theta: 0 };
let endPoint = { theta: 2 * Math.PI };

// Create a new TWEEN.Tween object
let tween = new TWEEN.Tween(startPoint)
    .to(endPoint, speed)
    .onUpdate(function() {
        // Update the camera's position
        camera.position.x = radius * Math.sin(this.theta);
        camera.position.z = radius * Math.cos(this.theta);
        camera.lookAt(cube.position);
    })
    .onComplete(function() {
        startPoint.theta = 0; // Reset theta when the animation completes
        tween.start(); // Restart the animation
    })
    .start(); // Start the animation

// Update the animate function
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();   
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);