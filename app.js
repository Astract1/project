let count = 0;

AFRAME.registerComponent('target', {
  init: function(){
    this.el.setAttribute("color", getRandomColor());
    let bannerText = document.getElementById("banner-text");
    let infoText = document.getElementById("info-text");
    bannerText.setAttribute("value", "WELCOME!");
    bannerText.setAttribute("width", "20");
    setTimeout(() => {
      bannerText.setAttribute("value", "3");
      bannerText.setAttribute("position","0 10 -4");
    }, 1000);
    setTimeout(() => {bannerText.setAttribute("value", "2");}, 2000);
    setTimeout(() => {bannerText.setAttribute("value", "1");}, 3000); 
    setTimeout(() => {
      bannerText.setAttribute("value", "¡PLAY!");
      bannerText.setAttribute("position","-1 10 -4");
      infoText.setAttribute("Value", "Press 'space bar' to shoot.")
    }, 4000); 
  }
});

AFRAME.registerComponent('trigger-check', {
  init: function () {
       
    this.el.addEventListener('triggerdown', function (e) {
        
        controllershoot();
        
    });
  },
  
  
});

AFRAME.registerComponent('collide-detect', {

  init: function () {
    let bulletEl = this.el;
   
    let debugtxt = document.querySelector('a-text');
    let bannerText = document.getElementById("banner-text");

    this.el.addEventListener('collide', function(e){
      if(e.detail.body.el.className == 'target') {        
        try{
          
          e.detail.body.el.parentNode.removeChild(e.detail.body.el);
          count++;
          debugtxt.setAttribute('value', 'COUNT: ' + count);
          
          if(count == 6){
            bannerText.setAttribute("value", "YOU WIN!");
          }
        } catch (err){ }
      } 

      try {
        bulletEl.parentNode.removeChild(e.detail.target.el);
      }catch(err){}     
    });
  },
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}