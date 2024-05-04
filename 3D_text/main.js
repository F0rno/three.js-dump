import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Load the font
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {

  // Create a geometry of your name
  const textGeometry = new TextGeometry('Pablo Fornell', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 5
  });

  // Compute the bounding box of the text geometry
  textGeometry.computeBoundingBox();

  // Get the dimensions of the bounding box
  const width = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  const height = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
  const depth = textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z;

  // Create a material for the text
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // Create a mesh with the geometry and material
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // Set the position of the text to center it
  textMesh.position.set(-width / 2, (-height / 2)+1, -depth / 2);

  // Add the text to the scene
  scene.add(textMesh);
});

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
    angle += 0.01;
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.position.set(0, 1, 3.5);
    camera.lookAt(scene.position); // Make the camera always point to the center
    renderer.render(scene, camera);
}

animate();