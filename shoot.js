var sceneEl = document.querySelector("a-scene");
var cameraEl = document.getElementById("camera");
var controllerEl = document.getElementById("rtcontroller");

const shoot = () => {
  const bullet = document.createElement("a-sphere");
  let pos = cameraEl.getAttribute("position");
  bullet.setAttribute("position", pos);
  bullet.setAttribute("color", getRandomColor());

  var direction = new THREE.Vector3();
  cameraEl.object3D.getWorldDirection( direction );
  bullet.setAttribute("velocity", direction.multiplyScalar(-10));
  bullet.setAttribute("dynamic-body", {shape: 'box', mass: 5});
  bullet.setAttribute("radius", 0.2);
  bullet.setAttribute("collide-detect", null);

  sceneEl.appendChild(bullet);
};

document.onkeydown = (event) => {
  if (event.which == 32) {
    shoot();
  }
};

const controllershoot = () => {
  const bullet = document.createElement("a-sphere");

  var position = new THREE.Vector3();

  controllerEl.object3D.getWorldPosition(position);
  
  bullet.setAttribute("position", position);
  bullet.setAttribute("color", getRandomColor());

  var direction = new THREE.Vector3();
  controllerEl.object3D.getWorldDirection( direction );

  bullet.setAttribute("velocity", direction.multiplyScalar(-20));
  
  bullet.setAttribute("dynamic-body", {shape: 'box', mass: 1});
  bullet.setAttribute("radius", 0.2);
  bullet.setAttribute("collide-detect", null);
  
  sceneEl.appendChild(bullet);
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}