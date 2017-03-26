'use strict';
angular.module('dodleme')
  .factory('NodeService', function ($http) {

    // private functions
    function handleSuccess(data) {
      return { success: true, message: data };
    }

    function handleError(data) {
      return { success: false, message: data };
    }

    //Utilisateurs
    function creerUser(user) {
      return $http.post(this.path + 'creerUtilisateur', user).then(handleSuccess, handleError('Erreur lors de la création de l\'utilisateur'));
    }

    function getUserByPseudo(pseudo) {
      return $http.get(this.path + 'utilisateur/' + pseudo).then(handleSuccess, handleError('Erreur lors de la récupération de l\'utilisateur'));
    }

    function getAllUsers() {
      return $http.get(this.path + 'utilisateurs').then(handleSuccess, handleError('Erreur lors de la récupération des utilisateurs'));
    }

    //Evenements
    function creerEvent(event) {
      return $http.post(this.path + 'creerEvent', event).then(handleSuccess, handleError('Erreur lors de la création de l\'évènement'));
    }

    function getEventByNom(nom) {
      return $http.get(this.path + 'event/' + nom).then(handleSuccess, handleError('Erreur lors de la récupération de l\'utilisateur'));
    }

    function getAllEvents() {
      return $http.get(this.path + 'events').then(handleSuccess, handleError('Erreur lors de la récupération des évènements'));
    }

    function updateEvent(event) {
      return $http.put(this.path + 'updateEvent', event).then(handleSuccess, handleError('Erreur lors de la récupération des évènements'));
    }

    var service = {};
    service.creerUser = creerUser;
    service.getUserByPseudo = getUserByPseudo;
    service.getAllUsers = getAllUsers;
    service.creerEvent = creerEvent;
    service.getEventByNom = getEventByNom;
    service.getAllEvents = getAllEvents;
    service.updateEvent = updateEvent;
    service.path = 'http://localhost:5000/';
    return service;
  });