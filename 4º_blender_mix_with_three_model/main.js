import * as utils from './utils.js';

let { scene, camera, renderer, controls } = utils.setupOrbitalScene()

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => utils.onWindowResize(renderer, camera), false);