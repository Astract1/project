export function registerPlayerComponent() {
  AFRAME.registerComponent('player', {
    schema: {
      health: { type: 'number', default: 100 }
    },

    init: function() {
      this.updateHealthDisplay();
    },

    updateHealthDisplay: function() {
      const healthText = document.getElementById("health-text");
      if (healthText) {
        healthText.setAttribute("value", `Health: ${this.data.health}`);
      }
    },

    takeDamage: function(damage) {
      this.data.health = Math.max(0, this.data.health - damage);
      this.updateHealthDisplay();

      if (this.data.health <= 0) {
        const bannerText = document.getElementById("banner-text");
        bannerText.setAttribute("value", "GAME OVER!");
      }
    }
  });
}