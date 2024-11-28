export function registerTargetComponent() {
  AFRAME.registerComponent('target', {
    init: function() {
      this.el.setAttribute("color", getRandomColor());
      let bannerText = document.getElementById("banner-text");
      let infoText = document.getElementById("info-text");
      
      this.setupGameIntro(bannerText, infoText);
    },

    setupGameIntro: function(bannerText, infoText) {
      bannerText.setAttribute("value", "WELCOME!");
      bannerText.setAttribute("width", "20");
      
      const sequence = [
        { time: 1000, text: "3", position: "0 10 -4" },
        { time: 2000, text: "2" },
        { time: 3000, text: "1" },
        { time: 4000, text: "¡PLAY!", position: "-1 10 -4", info: "Press 'space bar' to shoot." }
      ];

      sequence.forEach(({ time, text, position, info }) => {
        setTimeout(() => {
          bannerText.setAttribute("value", text);
          if (position) bannerText.setAttribute("position", position);
          if (info) infoText.setAttribute("Value", info);
        }, time);
      });
    }
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}