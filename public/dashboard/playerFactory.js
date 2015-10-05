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
      getProfile: getProfile,
      setProfile: setProfile,
      setInstrument: setInstrument,
      setVolume: setVolume,
      getPlayer: getPlayer,
      getSocket: getSocket
    };

    var socket = io();

    var name, username, email, instrument, volume, profile;

    return services;

    function getSocket() {
      return socket;
    }

    function getProfile() {
      return profile;
    }
    function setProfile(p) {
      console.log('setting profile');
      profile = p;
    }

    function setUser(user) {
      name = user.name;
      username = user.username;
      email = user.email;
      profile = user.profile;
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
        username: username,
        name: name,
        instrument: instrument,
        volume: volume
      };
    }
  }

})();
