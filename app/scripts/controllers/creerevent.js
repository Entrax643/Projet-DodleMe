'use strict';
angular.module('dodleme')
  .directive('googleplace', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {}
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
          scope.$apply(function () {
            scope.place = scope.gPlace.getPlace();
            //scope.info = scope.place;
            model.$setViewValue(element.val());
          });
        });
      }
    };
  })

  .controller('CreerEventCtrl', function ($scope, $localStorage, NodeService) {
    $scope.$storage = $localStorage;

    $scope.event = {
      createurEvent: $scope.$storage.pseudo,
      nomEvent: '',
      descriptionEvent: '',
      dateEvent: '',
      creneauxEvent: [
        { heure: "00h-02h", selected: false, listeUtilisateurs: [] },
        { heure: "02h-04h", selected: false, listeUtilisateurs: [] },
        { heure: "04h-06h", selected: false, listeUtilisateurs: [] },
        { heure: "06h-08h", selected: false, listeUtilisateurs: [] },
        { heure: "08h-10h", selected: false, listeUtilisateurs: [] },
        { heure: "10h-12h", selected: false, listeUtilisateurs: [] },
        { heure: "12h-14h", selected: false, listeUtilisateurs: [] },
        { heure: "14h-16h", selected: false, listeUtilisateurs: [] },
        { heure: "16h-18h", selected: false, listeUtilisateurs: [] },
        { heure: "18h-20h", selected: false, listeUtilisateurs: [] },
        { heure: "20h-22h", selected: false, listeUtilisateurs: [] },
        { heure: "22h-00h", selected: false, listeUtilisateurs: [] }
      ],
      lieuEvent: ''
    };

    $scope.addEvent = function () {
      $scope.dataLoading = true;
      NodeService.creerEvent($scope.event)
        .then(function (response) {
          if (response.success) {
            if (response.message.data) {
              $scope.error = "";
              $scope.info = "Création de l'évènement " + $scope.event.nomEvent + " réussie";
            } else {
              $scope.info = "";
              $scope.error = "Un évènement portant le nom " + $scope.event.nomEvent + " existe déjà";
            }
            $scope.dataLoading = false;
          } else {
            $scope.info = "Erreur lors de la création de l'évènement : ";
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        });
      $scope.dataLoading = false;
    };
  });
