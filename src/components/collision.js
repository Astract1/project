let count = 0;

export function registerCollisionComponent() {
  AFRAME.registerComponent('collide-detect', {
    init: function() {
      let bulletEl = this.el;
      let scoreText = document.getElementById("score-text");
      let bannerText = document.getElementById("banner-text");

      this.el.addEventListener('collide', function(e) {
        handleCollision(e, bulletEl, scoreText, bannerText);
      });
    }
  });
}

function handleCollision(e, bulletEl, scoreText, bannerText) {
  if (e.detail.body.el.hasAttribute('enemy')) {
    try {
      e.detail.body.el.parentNode.removeChild(e.detail.body.el);
      count++;
      scoreText.setAttribute('value', 'Score: ' + count);
      
      if (count === 10) {
        bannerText.setAttribute("value", "YOU WIN!");
      }
    } catch (err) { }
  }

  try {
    bulletEl.parentNode.removeChild(e.detail.target.el);
  } catch(err) { }
}