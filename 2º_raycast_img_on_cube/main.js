import * as utils from './utils.js';
import * as THREE from 'three';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene(2000)

// Create a video element
const video = document.createElement('video');
video.src = 'tierra.mp4'; // replace with your video path
video.muted = true; // mute the video
video.load();
video.play();
video.loop = true;


// Create a video texture
const videoTexture = new THREE.VideoTexture(video);

// Create a box with the video texture
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Make camera look at the box
camera.position.z = 5;
controls.update();
controls.target = box.position;

// Create a raycaster and a mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add a click event listener to the window
window.addEventListener('click', (event) => {
    // Normalize mouse position and set to mouse vector
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    // If the box is among the intersected objects, open a link
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object === box) {
            window.open('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif', '_blank'); // replace with your link
            return;
        }
    }
}, false);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);