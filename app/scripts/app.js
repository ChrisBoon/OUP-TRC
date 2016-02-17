'use strict';

/**
 * @ngdoc overview
 * @name trcApp
 * @description
 * # trcApp
 *
 * Main module of the application.
 */
angular
  .module('trcApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'ui.bootstrap'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        controllerAs: 'home'
      })
      .when('/search/:id', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/browse/:id', {
        templateUrl: 'views/folders.html',
        controller: 'FoldersCtrl',
        controllerAs: 'folder'
      })
      .when('/files/:id', {
        templateUrl: 'views/files.html',
        controller: 'FilesCtrl',
        controllerAs: 'files'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
