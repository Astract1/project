import { getRandomColor } from './colors.js';

let sceneEl = null;
let cameraEl = null;
let controllerEl = null;

export function initializeShootingControls() {
  sceneEl = document.querySelector("a-scene");
  cameraEl = document.getElementById("camera");
  controllerEl = document.getElementById("rtcontroller");

  document.onkeydown = (event) => {
    if (event.which === 32) {
      shoot();
    }
  };
}

export function shoot() {
  const bullet = createBullet();
  let pos = cameraEl.getAttribute("position");
  bullet.setAttribute("position", pos);

  var direction = new THREE.Vector3();
  cameraEl.object3D.getWorldDirection(direction);
  bullet.setAttribute("velocity", direction.multiplyScalar(-10));

  sceneEl.appendChild(bullet);
}

export function controllershoot() {
  const bullet = createBullet();
  var position = new THREE.Vector3();
  controllerEl.object3D.getWorldPosition(position);
  bullet.setAttribute("position", position);

  var direction = new THREE.Vector3();
  controllerEl.object3D.getWorldDirection(direction);
  bullet.setAttribute("velocity", direction.multiplyScalar(-20));

  sceneEl.appendChild(bullet);
}

function createBullet() {
  const bullet = document.createElement("a-sphere");
  bullet.setAttribute("color", getRandomColor());
  bullet.setAttribute("dynamic-body", {shape: 'box', mass: 1});
  bullet.setAttribute("radius", 0.2);
  bullet.setAttribute("collide-detect", null);
  return bullet;
}