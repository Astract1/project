import { registerTargetComponent } from './components/target.js';
import { registerCollisionComponent } from './components/collision.js';
import { registerControllerComponent } from './components/controller.js';
import { registerPlayerComponent } from './components/player.js';
import { registerEnemyComponent } from './components/enemy.js';
import { initializeShootingControls } from './utils/shooting.js';

// Register all components
registerTargetComponent();
registerCollisionComponent();
registerControllerComponent();
registerPlayerComponent();
registerEnemyComponent();

// Initialize controls when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeShootingControls();
});