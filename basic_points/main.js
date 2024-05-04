import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Render a single point
const dotGeometry = new THREE.BufferGeometry();
dotGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]), 3));
const dotMaterial = new THREE.PointsMaterial({ size: 0.025, color: 0xffffff });
const dot = new THREE.Points(dotGeometry, dotMaterial);
scene.add(dot);

// Add another point
const dotGeometry2 = new THREE.BufferGeometry();
dotGeometry2.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0]), 3));
const dotMaterial2 = new THREE.PointsMaterial({ size: 0.025, color: 0xffffff });
const dot2 = new THREE.Points(dotGeometry2, dotMaterial2);
scene.add(dot2);

// add a third point
const dotGeometry3 = new THREE.BufferGeometry();
dotGeometry3.setAttribute('position', new THREE.BufferAttribute(new Float32Array([1,1,0]), 3));
const dotMaterial3 = new THREE.PointsMaterial({ size: 0.025, color: 0xffffff });
const dot3 = new THREE.Points(dotGeometry3, dotMaterial3);
scene.add(dot3);

// Add a fourth point
const dotGeometry4 = new THREE.BufferGeometry();
dotGeometry4.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,1,0]), 3));
const dotMaterial4 = new THREE.PointsMaterial({ size: 0.025, color: 0xffffff });
const dot4 = new THREE.Points(dotGeometry4, dotMaterial4);
scene.add(dot4);

// Connect the points
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0]), 3));
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

// Camera
camera.position.z = 5;
camera.lookAt(0, 0, 0)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);