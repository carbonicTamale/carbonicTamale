(function() {
  'use strict';

  angular.module('app')
  .factory('playerFactory', playerFactory);

  function playerFactory() {
    var services = {
      setUser: setUser,
      getName: getName,
      getUsername: getUsername,
      getEmail: getEmail,
      setInstrument: setInstrument,
      setVolume: setVolume,
      getPlayer: getPlayer
    };

    var name, username, email, instrument, volume;

    return services;

    function setUser(user) {
      name = user.name;
      username = user.username;
      email = user.email;
      instrument = 'piano';
      volume = 0.5;
    }

    function getName() {
      return name;
    }

    function getUsername() {
      return username;
    }

    function getEmail() {
      return email;
    }

    function setInstrument(newInstrument) {
      instrument = newInstrument;
    }

    function setVolume(newVolume) {
      volume = newVolume;
    }

    function getPlayer() {
      return {
        name: name,
        instrument: instrument,
        volume: volume
      };
    }
  }

})();