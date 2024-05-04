import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
let camera;
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let mixer; // Declare the mixer variable outside the loader.load function

// Create the orbital camera and the controls
let orbitalCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
orbitalCamera.position.z = 5;
let controls = new OrbitControls( orbitalCamera, renderer.domElement );
controls.enabled = false; // Disable the controls initially

const onFinish = () => {
    console.log('Animation finished');
    // When the animation finishes, switch to the orbital camera and enable the controls
    console.log('Animation finished');
    camera = orbitalCamera;
    controls.enabled = true;
    // zoom out
    camera.position.z = 20;
    // Move the camera 10 units to right
    camera.position.x = 10;
    // Remove the event listener
    mixer.removeEventListener( 'finished', onFinish);
 }

loader.load('./untitled.glb', function ( gltf ) {
    camera = gltf.cameras[ '0' ];
    scene.add( gltf.scene );

    // Create an AnimationMixer instance and set it to the loaded glTF scene
    mixer = new THREE.AnimationMixer(gltf.scene);

    // Get the first animation from the glTF model
    const action = mixer.clipAction(gltf.animations[0]);
    // Set action repetitions to 1
    action.setLoop(THREE.LoopOnce);
    // Add an event listener to the action
    mixer.addEventListener( 'finished', onFinish);

    // Play the animation
    action.play();
}, undefined, function ( error ) {
    console.error( error );
});

let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    // Update the animation mixer on each frame
    if (mixer) {
        mixer.update(clock.getDelta()); // The argument to mixer.update is the time delta
    }
    if (camera) {
        renderer.render(scene, camera);
        camera.updateProjectionMatrix()
    }
    // Update the controls on each frame
    controls.update();
}

animate();

// Add a resize event listener
window.addEventListener('resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});