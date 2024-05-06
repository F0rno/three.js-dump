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

// Define the radii and speeds of the orbits
let orbits = [
    { radius: 10, speed: 5000 },
    { radius: 20, speed: 4000 },
    { radius: 30, speed: 5000 },
];

// Create a TWEEN.Tween object for each orbit
let tweens = orbits.map(function(orbit) {
    let startPoint = { theta: 0 };
    let endPoint = { theta: 2 * Math.PI };

    let tween = new TWEEN.Tween(startPoint)
        .to(endPoint, orbit.speed)
        .onUpdate(function() {
            // Update the camera's position
            camera.position.x = orbit.radius * Math.sin(this.theta);
            camera.position.z = orbit.radius * Math.cos(this.theta);
            camera.lookAt(cube.position);
        })
        .onComplete(function() {
            startPoint.theta = 0; // Reset theta when the animation completes
            tween.start(); // Restart the animation
        })
        .start(); // Start the animation
    return tween;
});

// Update the animate function
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();   
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);