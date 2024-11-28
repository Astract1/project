import { getRandomColor } from '../utils/colors.js';

export function registerEnemyComponent() {
  AFRAME.registerComponent('enemy', {
    schema: {
      attackDamage: { type: 'number', default: 10 },
      attackInterval: { type: 'number', default: 2000 }
    },

    init: function() {
      this.el.setAttribute("color", getRandomColor());
      this.setupAttackInterval();
    },

    setupAttackInterval: function() {
      this.attackTimer = setInterval(() => {
        this.attackPlayer();
      }, this.data.attackInterval);
    },

    attackPlayer: function() {
      const playerEl = document.querySelector('[player]');
      if (!playerEl) return;

      // Create enemy projectile
      const scene = document.querySelector('a-scene');
      const enemyProjectile = document.createElement('a-sphere');
      
      // Get positions
      const enemyPos = this.el.getAttribute('position');
      const playerPos = playerEl.getAttribute('position');
      
      // Set projectile properties
      enemyProjectile.setAttribute('position', enemyPos);
      enemyProjectile.setAttribute('radius', '0.2');
      enemyProjectile.setAttribute('color', 'red');
      enemyProjectile.setAttribute('class', 'enemy-projectile');
      
      // Calculate direction towards player
      const direction = {
        x: playerPos.x - enemyPos.x,
        y: playerPos.y - enemyPos.y,
        z: playerPos.z - enemyPos.z
      };
      
      // Normalize direction
      const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
      direction.x /= length;
      direction.y /= length;
      direction.z /= length;
      
      // Set velocity
      enemyProjectile.setAttribute('velocity', {
        x: direction.x * 5,
        y: direction.y * 5,
        z: direction.z * 5
      });
      
      enemyProjectile.setAttribute('dynamic-body', { shape: 'sphere', mass: 1 });
      
      // Add collision detection
      enemyProjectile.addEventListener('collide', (e) => {
        if (e.detail.body.el.hasAttribute('player')) {
          const playerComponent = e.detail.body.el.components.player;
          playerComponent.takeDamage(this.data.attackDamage);
          enemyProjectile.parentNode.removeChild(enemyProjectile);
        }
      });
      
      scene.appendChild(enemyProjectile);
    },

    remove: function() {
      if (this.attackTimer) {
        clearInterval(this.attackTimer);
      }
    }
  });
}