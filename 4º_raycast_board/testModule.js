import * as utils from './utils.js';
import * as THREE from 'three';
import BentoGrid from './BentoGrid.js';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene(2000)

const bentoGrid = new BentoGrid();

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
bentoGrid.createBentoGrid(grid);
const boxes = bentoGrid.getBoxes();
boxes.forEach(box => scene.add(box));


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