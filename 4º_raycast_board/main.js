import * as utils from './utils.js';
import * as THREE from 'three';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene(2000)

// Create a function to create a box with a video texture
function createBox(videoSrc, size, position, url) {
    // Create a video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.load();
    video.play();
    video.loop = true;

    // Create a video texture
    const videoTexture = new THREE.VideoTexture(video);

    // Create a box with the video texture
    const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const boxMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(position.x, position.y, position.z);
    box.userData = { url }; // Store the URL in the box's userData
    scene.add(box);

    return box;
}

// Create a function to create a bento grid
function createBentoGrid(grid) {
    const boxes = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const box = createBox(grid[i][j].videoSrc, grid[i][j].size, grid[i][j].position, grid[i][j].url);
            boxes.push(box);
        }
    }
    return boxes;
}

// Create a bento grid
const grid = [
    [
        { videoSrc: 'tierra.mp4', size: { x: 1, y: 1, z: 1 }, position: { x: -1.5, y: 0, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif' },
        { videoSrc: 'tierra.mp4', size: { x: 2, y: 1, z: 1 }, position: { x: 0, y: 0, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif'  },
        { videoSrc: 'tierra.mp4', size: { x: 1, y: 1, z: 1 }, position: { x: 1.5, y: 0, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif'  },
        { videoSrc: 'tierra.mp4', size: { x: 1, y: 2, z: 1 }, position: { x: -1.5, y: 1.5, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif'  },
        { videoSrc: 'tierra.mp4', size: { x: 1, y: 2, z: 1 }, position: { x: 1.5, y: 1.5, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif'  },
        { videoSrc: 'tierra.mp4', size: { x: 2, y: 2, z: 1 }, position: { x: 0, y: 1.5, z: 0 }, url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6dndodThjdmppOXhyY2d6eTA2YWV1cmxrYmgzOTQ0MTJieDVjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9tXuXDwXv4Uhr2Al3i/giphy.gif'  },
    ],
];
const boxes = createBentoGrid(grid);

// Make camera look at the center of the grid
camera.position.z = 5;
controls.update();
controls.target = new THREE.Vector3(0, 0, 0);

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

    // If a box is among the intersected objects, open a link
    for (let i = 0; i < intersects.length; i++) {
        if (boxes.includes(intersects[i].object)) {
            window.open(intersects[i].object.userData.url, '_blank'); // Open the box's URL
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