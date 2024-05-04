import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.LineBasicMaterial( { 
  color: 0x00FF00,
} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let radius = 5;
let angle = 0;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Move the camera in circles
    angle += 0.05;
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(scene.position); // Make the camera always point to the center
    renderer.render(scene, camera);
}

animate();