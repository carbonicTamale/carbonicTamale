(function() {
  'use strict';

  angular.module('app')
    .factory('soundFactory', soundFactory);

  function soundFactory($q, $timeout) {
    var services = {
      populateSoundFiles: populateSoundFiles,
      playSound: playSound,
      stopSound: stopSound,
      nextInstrument: nextInstrument,
      prevInstrument: prevInstrument,
      getInstrumentIcon: getInstrumentIcon
    };

    var sounds_piano = [];
    var sounds_bassguitar = [];
    var sounds_electricguitar = [];
    var sounds_drums = [];
    var sounds_tenorsax = [];
    var sounds_trombone = [];

    var instruments = [sounds_piano, sounds_bassguitar, sounds_electricguitar,
      sounds_drums, sounds_tenorsax, sounds_trombone];
    var icon_names = ['piano', 'bassguitar', 'guitar', 'drums', 'tenorsax', 'trombone'];
    var currentIcon = icon_names[0];
    var selected = 0;


    return services;

    function getInstrumentIcon() {
      return currentIcon;
    }

    function nextInstrument() {
      console.log('next instrument');
      selected++;
      currentIcon = icon_names[selected % icon_names.length];
    }

    function prevInstrument() {
      console.log('prev instrument');
      selected+=5;
      currentIcon = icon_names[selected % icon_names.length];
    }

    function populateSoundFiles() {
      return $q(function(resolve, reject) {
        $timeout(function() {
          console.log('populating sound files');
          populateInstrument('piano', 21, 108, sounds_piano);
          // populateInstrument('bass_classic', 36, 97, sounds_bassguitar);
          // populateInstrument('guitar_electric', 36, 80, sounds_electricguitar);
          // populateInstrument('drums_rock', 36, 57, sounds_drums);
          // populateInstrument('tenorsax', 36, 85, sounds_tenorsax);
          // populateInstrument('trombone', 36, 78, sounds_trombone);
          resolve();
        });
      });
    }

    function populateInstrument(name, start, end, samples) {
      for (var i = 0; i < start; i++) {
        samples.push({});
      }
      for (var i = start; i <= end; i++) {
        var filename = 'assets/sounds/' + name + '-' + i + '.mp3';
        var sound = new Howl({
          urls: [filename],
          volume: 0.3,
          onloaderror: function() {
            console.log('Error loading file.');
          }
        });

        samples.push(sound);
      };
    }

    function playSound(key_num, key_vel) {
      var sound = instruments[selected%instruments.length][key_num];
      if (Object.keys(sound).length === 0)
        return;
      
      var volume = key_vel / 127; // normalize to [0,1]
      sound.volume(volume);
      sound.play();
    }

    function stopSound(key_num) {
      var sound = instruments[selected%instruments.length][key_num];
      if (!sound)
        return;
      console.log('sound =', sound);
      if (Object.keys(sound).length === 0)
        return;
      sound.fade(0.3, 0, 50, function() {
        sound.stop();
      });

    }
  }

})();
