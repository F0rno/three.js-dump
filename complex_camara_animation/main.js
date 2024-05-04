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

// Define the points along the path
const points = [
  new THREE.Vector3(0, 0, 7),
  new THREE.Vector3(0, 0, 2),
  new THREE.Vector3(0, -1, 2),
  new THREE.Vector3(0, -1, -2),
  new THREE.Vector3(0, 0, -7),
  new THREE.Vector3(0, 2, -2),
];

// Create a curve from the points
const curve = new THREE.CatmullRomCurve3(points);

// Define a variable to keep track of where along the path we are
let pathPosition = 0;

// Define a variable to keep track of the speed of the animation
let speed = 0.001;

function animate() {
  requestAnimationFrame(animate);

  // Move the camera along the path
  pathPosition += speed;

  // Accelerate the animation after reaching the middle of the path
  /*
  if (pathPosition >= 0.5) {
    speed = 0.001;
  }
  */
  

  if (pathPosition > 1) {
    //pathPosition = 0;
    //speed = 0.002;
  } // Loop back to the start of the path
  camera.position.copy(curve.getPoint(pathPosition));
  camera.lookAt(scene.position); // Make the camera always point to the center

  renderer.render(scene, camera);
}

animate();
/*

The `THREE.CatmullRomCurve3` is a class in the Three.js library that represents a Catmull-Rom spline curve in 3D space. A Catmull-Rom spline is a type of interpolating spline, which means it passes through all of its control points. It's commonly used in computer graphics to create smooth and natural-looking animations.
Here's a basic explanation of how it works:

1. You provide a set of "control points" that the curve 
should pass through. These are instances of `THREE.Vector3`,
 representing points in 3D space.

2. The `CatmullRomCurve3` class calculates the curve that passes
 through these points. It uses the Catmull-Rom spline algorithm,
  which ensures that the curve is smooth and continuous, and that it passes through each control point in the order given.

3. You can then get any point along the curve using the `getPoint(t)`
 method, where `t` is a number between 0 and 1 representing how far
  along the curve the point is. For example, `0` is the start of the curve,
   `1` is the end, and `0.5` is halfway along.

In the context of animating a camera, you can use a `CatmullRomCurve3` to define a path for the camera to follow. By gradually changing the `t` value from 0 to 1 over time, you can move the camera along the curve, creating a smooth animation that passes through all the control points.
*/