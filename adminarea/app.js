'use strict';

/**
 * @ngdoc overview
 * @name ngReviewApp
 * @description
 * # ngReviewApp
 *
 * Main module of the application.
 */

angular.module('ngReviewApp',['ngRoute','firebase','LocalStorageModule','booksApp.controllers','booksApp.services'])

.config(function($routeProvider){

    $routeProvider
        .when('/adminsecretarea', {
        templateUrl: 'views/admin.html',
        controller: 'MainController',
        controllerAs: 'vm',
        authRequired: true
        
    })
         .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
    })

.otherwise({redirectTo: '/'});
    

})

.run(['AuthFactory', function (AuthFactory) {
    AuthFactory.fillAuthData();
}]);