import * as utils from './utils';
import PerlinNoiseSphere from './PerlinNoiseSphere';

const { scene, camera, renderer, controls } = utils.setupOrbitalScene();
const perlinSphere = new PerlinNoiseSphere();
scene.add(perlinSphere.getMesh());

// Increase the size of the sphere
//perlinSphere.increaseSize(100);

// set camera position
camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    perlinSphere.animate();
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);
animate();