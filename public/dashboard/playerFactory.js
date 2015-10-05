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
      getVolume: getVolume,
      setVolume: setVolume,
      getPlayer: getPlayer,
      getSocket: getSocket,
      getJamRoom: getJamRoom,
      setJamRoom: setJamRoom,
      setJamState: setJamState,
      inJam: inJam,
      connectToRoom: connectToRoom,
      disconnect: disconnect
    };

    var socket = io();

    var name, username, email, instrument, volume, profile, jamRoom;
    var inJam = false;
    var jamState = 'solo';

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
      socket.emit('change instrument', instrument);
    }

    function getVolume() {
      return volume;
    }

    function setVolume(newVolume) {
      volume = newVolume;
      socket.emit('change volume', volume);
    }

    function getPlayer() {
      return {
        username: username,
        name: name,
        instrument: instrument,
        volume: volume
      };
    }

    function getJamRoom() {
      return jamRoom;
    }

    function setJamRoom(roomNum) {
      jamRoom = roomNum;
    }

    function setJamState(state) {
      jamState = state;
    }

    function inJam() {
      return jamState;
    }

    function connectToRoom() {
      if (!inJam) {
        jamState = 'solo';
        inJam = true;
      }

      if (jamState === 'multiplayer')
        return;

      if (jamState === 'solo') {
        socket.emit('jam create', getPlayer());
      }
      else if (jamState === 'join in progress') {
        socket.emit('jam connect', getPlayer());
        inJam = true;
        jamState = 'multiplayer';
      }
    }

    function disconnect() {
      inJam = false;
      jamState = 'solo';
      jamRoom = '';
    }

  }

})();
