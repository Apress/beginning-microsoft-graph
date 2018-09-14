/// <reference path="lib/angular.js" />
var graphApp = angular.module('graphApp', ['AdalAngular']);

graphApp.config(['$httpProvider', 'adalAuthenticationServiceProvider',
    function ($httpProvider, adalProvider) {
        var endpoints = {
            'https://graph.microsoft.com': 'https://graph.microsoft.com'
        };
        adalProvider.init({
            tenant: '[tenant].onmicrosoft.com',
            clientId: '[client id]',
            endpoints: endpoints,
        }, $httpProvider);
    }]);

var graphController = graphApp.controller("graphController", [
    '$scope', '$http', 'adalAuthenticationService',
    function ($scope, $http, adalService) {
        $scope.login = function () {
            adalService.login();
        };
        $scope.logout = function () {
            adalService.logOut();
        };

        $scope.getProfile = function () {
            $http.get("https://graph.microsoft.com/v1.0/me")
                .success(function (profile) {
                $scope.profile = profile;
            });
        };
    }]);