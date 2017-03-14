'use strict';
angular.module('dodleme')
    .controller('InscriptionController', function ($rootScope, $scope, NodesServices) {
        $scope.info = "Nada";
        $scope.user = { prenom: 'Guillaume', nom: 'Fines' };
        $scope.register = function register() {
            $scope.dataLoading = true;
            NodesServices.creerUser($scope.user)
                .then(function (response) {
                    if (response.data.success) {
                        $scope.info = "success";
                        $rootScope.user = $scope.user;
                        $rootScope.user.id = response.data;
                        $scope.error = $rootScope.user;
                        $scope.dataLoading = false;
                    } else {
                        $scope.info = "error";
                        $scope.error = "error";
                        $scope.dataLoading = false;
                    }
                });
        };
    });