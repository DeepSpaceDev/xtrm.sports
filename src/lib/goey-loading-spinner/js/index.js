'use strict';

function qs(expr, context) {
  return (context || document).querySelector(expr);
}

function qsa(expr, context) {
  return [].slice.call((context || document).querySelectorAll(expr), 0);
}

var log = console.log.bind(console),
    debug = console.debug.bind(console);

var obj = {
  containerSpeed: 1.7,
  ringsSpeed: 3.7,
  ringSpeed: 5.1,
  enableGooey: true,
  containerReverse: false,
  ringsReverse: false,
  ringReverse: true,
  ringCount: 10,
  pauseAnimation: false
};

var config = {
  MIN: 1,
  MAX: 10
};

var gui = new dat.GUI();

// Performance optimization, only query once
var ringsContainer = qs('.rings-container'),
    rings = qs('.rings'),
    ring = qsa('.ring');

gui.add(obj, 'containerSpeed').min(config.MIN).max(config.MAX).step(.1).onChange(function (newValue) {
  return updateContainerSpeed(newValue);
});
gui.add(obj, 'ringsSpeed').min(config.MIN).max(config.MAX).step(.1).onChange(function (newValue) {
  return updateRingsSpeed(newValue);
});
gui.add(obj, 'ringSpeed').min(config.MIN).max(config.MAX).step(.1).onChange(function (newValue) {
  return updateRingSpeed(newValue);
});
gui.add(obj, 'enableGooey').onChange(function (newValue) {
  return updateEnableGooey(newValue);
});
gui.add(obj, 'containerReverse').onChange(function (newValue) {
  return updateContainerReverse(newValue);
});
gui.add(obj, 'ringsReverse').onChange(function (newValue) {
  return updateRingsReverse(newValue);
});
gui.add(obj, 'ringReverse').onChange(function (newValue) {
  return updateRingReverse(newValue);
});
gui.add(obj, 'ringCount').min(1).max(10).step(1).onChange(function (newValue) {
  return updateRingCount(newValue);
});
gui.add(obj, 'pauseAnimation').onChange(function (newValue) {
  return updatePauseAnimation(newValue);
});

function ieHackToMakeCssAnimChangeWork(element) {
  var animName = element.style.animationName || 'rotate';
  element.style.animationName = animName === 'rotate' ? 'rotate2' : 'rotate';
  return element.style.animationName;
}

function updateContainerSpeed(newValue) {
  requestAnimationFrame(function () {
    ringsContainer.style.animationDuration = +newValue.toFixed(1) + 's';
    ieHackToMakeCssAnimChangeWork(ringsContainer);
  });
}

function updateRingsSpeed(newValue) {
  requestAnimationFrame(function () {
    rings.style.animationDuration = +newValue.toFixed(1) + 's';
    ieHackToMakeCssAnimChangeWork(rings);
  });
}

function updateRingSpeed(newValue) {
  requestAnimationFrame(function () {
    var val = +newValue.toFixed(1);
    ring.forEach(function (ring) {
      return ring.style.animationDuration = val + 's';
    });
    var animName = ieHackToMakeCssAnimChangeWork(ring[0]);
    ring.forEach(function (ring) {
      return ring.style.animationName = animName;
    });
  });
}

function updateEnableGooey(newValue) {
  requestAnimationFrame(function () {
    newValue ? rings.classList.add('filter-gooey') : rings.classList.remove('filter-gooey');
  });
}

function updateContainerReverse(newValue) {
  requestAnimationFrame(function () {
    newValue ? ringsContainer.classList.add('anim-direction-reverse') : ringsContainer.classList.remove('anim-direction-reverse');
    !newValue ? ringsContainer.classList.add('anim-direction-normal') : ringsContainer.classList.remove('anim-direction-normal');

    ieHackToMakeCssAnimChangeWork(ringsContainer);
  });
}

function updateRingsReverse(newValue) {
  requestAnimationFrame(function () {
    newValue ? rings.classList.add('anim-direction-reverse') : rings.classList.remove('anim-direction-reverse');
    !newValue ? rings.classList.add('anim-direction-normal') : rings.classList.remove('anim-direction-normal');

    ieHackToMakeCssAnimChangeWork(rings);
  });
}

function updateRingReverse(newValue) {
  requestAnimationFrame(function () {
    newValue ? rings.classList.add('child-anim-direction-reverse') : rings.classList.remove('child-anim-direction-reverse');
    !newValue ? rings.classList.add('child-anim-direction-normal') : rings.classList.remove('child-anim-direction-normal');

    var animName = ieHackToMakeCssAnimChangeWork(ring[0]);
    ring.forEach(function (ring) {
      return ring.style.animationName = animName;
    });
  });
}

function updateRingCount(newValue) {
  requestAnimationFrame(function () {
    ring.forEach(function (ring) {
      return ring.style.height = '';
    }); // reset
    var i = undefined,
        l = ring.length;
    newValue = newValue > l ? l : newValue;
    for (i = 0; i < l - newValue; i++) {
      ring[i].style.height = '0';
    }
  });
}

function updatePauseAnimation(newValue) {
  requestAnimationFrame(function () {
    newValue ? ringsContainer.classList.add('anim-pause') : ringsContainer.classList.remove('anim-pause');
  });
}

function init() {

  updateContainerSpeed(obj.containerSpeed);
  updateRingsSpeed(obj.ringsSpeed);
  updateRingSpeed(obj.ringSpeed);
  updateEnableGooey(obj.enableGooey);
  updateContainerReverse(obj.containerReverse);
  updateRingsReverse(obj.ringsReverse);
  updateRingReverse(obj.ringReverse);

  log('init called, values from obj has been used');
}

init();