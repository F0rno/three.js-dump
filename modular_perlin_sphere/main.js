import * as utils from './utils';
import PerlinNoiseSphere from './PerlinNoiseSphere';

const { scene, camera, renderer, controls } = utils.setupOrbitalScene();
const perlinSphere = new PerlinNoiseSphere();
scene.add(perlinSphere.getMesh());

// set camera position
camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    perlinSphere.animate();
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);
animate();