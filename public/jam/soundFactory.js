(function() {
  'use strict';

  angular.module('app')
    .factory('soundFactory', soundFactory);

  function soundFactory($q, $timeout, playerFactory) {
    var services = {
      populateSoundFiles: populateSoundFiles,
      playSound: playSound,
      stopSound: stopSound,
      nextInstrument: nextInstrument,
      prevInstrument: prevInstrument
    };

    var sounds_piano = [];
    var sounds_bassguitar = [];
    var sounds_electricguitar = [];
    var sounds_drums = [];
    var sounds_tenorsax = [];
    var sounds_trombone = [];

    var samples = [sounds_piano, sounds_bassguitar, sounds_electricguitar,
      sounds_drums, sounds_tenorsax, sounds_trombone];
    var instruments = ['piano', 'bassguitar', 'guitar', 'drums', 'tenorsax', 'trombone'];
    var selected = 0;


    return services;


    function nextInstrument() {
      console.log('next instrument');
      selected++;
      playerFactory.setInstrument(instruments[selected%instruments.length]);
    }

    function prevInstrument() {
      console.log('prev instrument');
      selected+=5;
      playerFactory.setInstrument(instruments[selected%instruments.length]);
    }

    function populateSoundFiles() {
      return $q(function(resolve, reject) {
        $timeout(function() {
          console.log('populating sound files');
          loadSamples('piano', 21, 108, sounds_piano);
          // loadSamples('bass_classic', 36, 97, sounds_bassguitar);
          // loadSamples('guitar_electric', 36, 80, sounds_electricguitar);
          // loadSamples('drums_rock', 36, 57, sounds_drums);
          // loadSamples('tenorsax', 36, 85, sounds_tenorsax);
          // loadSamples('trombone', 36, 78, sounds_trombone);
          resolve();
        });
      });
    }

    function loadSamples(name, start, end, samples) {
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

    function playSound(key_num, key_vel, instrument) {
      var index = instrumentToIndex(instrument);
      var sound = samples[index][key_num];
      if (Object.keys(sound).length === 0) {
        return;
      }
      
      var volume = key_vel / 127; // normalize to [0,1]
      volume *= (playerFactory.getVolume() / 100);
      sound.volume(volume);
      sound.play();
    }

    function stopSound(key_num, instrument) {
      var index = instrumentToIndex(instrument);
      var sound = samples[index][key_num];
      if (!sound)
        return;

      if (Object.keys(sound).length === 0)
        return;

      sound.fade(0.3, 0, 50, function() {
        sound.stop();
      });

    }

    function instrumentToIndex(inst) {
      if (inst === 'piano') return 0;
      else if (inst === 'bassguitar') return 1;
      else if (inst === 'guitar') return 2;
      else if (inst === 'drums') return 3;
      else if (inst === 'tenorsax') return 4;
      else if (inst === 'trombone') return 5;
    }
  }

})();
