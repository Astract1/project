export function registerControllerComponent() {
  AFRAME.registerComponent('trigger-check', {
    init: function() {
      this.el.addEventListener('triggerdown', function(e) {
        controllershoot();
      });
    }
  });
}