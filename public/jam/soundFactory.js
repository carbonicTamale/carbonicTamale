(function() {
  'use strict';

  angular.module('app')
  .factory('soundFactory', soundFactory);

  function soundFactory() {
    var services = {
      playSound: playSound,
      stopSound: stopSound
    };

    var sounds_piano = [];
    populateSoundFiles();

    return services;

    function populateSoundFiles() {
      for (var i=0; i<=21; i++) {
        sounds_piano.push({});
      }
      for (var i=21; i<=108; i++) {
        var filename = 'assets/sounds/piano-' + i + '.mp3';
          var sound = new Howl({
            urls: [filename],
            volume: 0.3,
            onloaderror: function() {
              console.log('Error loading file.');
            }
          });

          sounds_piano.push(sound);
      };
    }

    function playSound(key_num, key_vel) {
      if (key_num < 21 || key_num > 108)
        return;

      var sound = sounds_piano[key_num];
      var volume = key_vel / 127; // normalize to [0,1]
      sound.volume(volume);
      sound.play();
    }

    function stopSound(key_num) {
      var sound = sounds_piano[key_num];
      sound.fade(0.3, 0, 50, function() {
        sound.stop();
      });

    }
  }

})();