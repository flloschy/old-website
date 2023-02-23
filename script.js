
var ring, block;
var x = 0;
var y = 0;
var moving = false;
var text = "Working on it";
var id = 0;
var count = 0;
var content;
function animateMouseStuff(event) {
  ring.style.opacity = 1;
  x = event.clientX;
  y = event.clientY;
  ring.animate({
    left:event.clientX - ring.clientHeight/2 + 'px',
    top: event.clientY - ring.clientWidth/2 + 'px'
  }, {duration: 1500, fill:"forwards", easing: 'ease-in-out' });
  
  block.animate({
    left: event.clientX - block.clientWidth/2 + 'px',
    top: event.clientY - block.clientHeight/2 + 'px'
  }, {duration: 2000, fill:"forwards", easing: 'ease-in-out' });
}
function done() {
  block = document.getElementById('block');
  ring = document.getElementById('ring');
  content = document.getElementById('content');
  
  document.addEventListener('mousemove', function(event) {
    moving = true;
    animateMouseStuff(event)
  });

  document.addEventListener('mousedown', function(event) {
    if (event.button == 0) {
      ring.style.filter = 'blur(1px)';
    }
    if (event.button == 2) {
      ring.style.filter = 'blur(5px)';
    }
  });

  document.addEventListener('mouseup', function(event) {
    ring.style.filter = 'blur(3px)';
  });

  setInterval(function() {
    if (!moving) {
      const randomX = Math.floor(Math.random() * window.outerWidth);
      const randomY = Math.floor(Math.random() * window.outerHeight);
      block.animate({
        left: randomX + 'px',
        top: randomY + 'px'
      }, {duration: 4000, fill:"forwards", easing: 'ease-in-out'});
    } 
  }, 5000);

  setInterval(function() {
    if (!moving) ring.style.opacity = 0
    else { moving = false;}
  }, 2500);


  init()
};




function init() {

  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    span.innerHTML = text[i];
    span.style.animation = 'intro 5s ease-in-out forwards';
    content.appendChild(span);
  }
  var temp = setInterval(function() {
    id = setInterval(dots, 1000)
    clearInterval(temp);
  }, 2000)
}

function dots () {
  if (count < 3) {
    var span = document.createElement('span');
    span.innerHTML = ".";
    span.style.animation = 'intro 1s ease-in-out forwards';
    content.appendChild(span);
    count++;
  } else {clearInterval(id);}
}