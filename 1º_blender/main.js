import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 50, 20, 40 );
controls.update();

const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, 10 );
scene.add( light );

const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
light2.position.set( 0, 0, -10 );
scene.add( light2 );

const loader = new GLTFLoader();

let mixer; // Declare the mixer variable outside the loader.load function

loader.load('./scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    console.log("Loaded");
    gltf.scene.position.z = 10;

    // Create an AnimationMixer instance and set it to the loaded glTF scene
    mixer = new THREE.AnimationMixer(gltf.scene);

    // Get the first animation from the glTF model
    const action = mixer.clipAction(gltf.animations[0]);

    // Play the animation
    action.play();
}, undefined, function ( error ) {
    console.error( error );
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Update the animation mixer on each frame
    if (mixer) {
        mixer.update(0.01); // The argument to mixer.update is the time delta
    }

    renderer.render(scene, camera);
}

animate();