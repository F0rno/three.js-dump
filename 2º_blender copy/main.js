import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
let camera;
//const  = new THREE.Perspective( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let mixer; // Declare the mixer variable outside the loader.load function

loader.load('./untitled.glb', function ( gltf ) {
    camera = gltf.cameras[ '0' ];
    scene.add( gltf.scene );

    // Create an AnimationMixer instance and set it to the loaded glTF scene
    mixer = new THREE.AnimationMixer(gltf.scene);

    // Get the first animation from the glTF model
    const action = mixer.clipAction(gltf.animations[0]);

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
        console.log(camera);
        renderer.render(scene, camera);
        camera.updateProjectionMatrix()
    }
}

animate();