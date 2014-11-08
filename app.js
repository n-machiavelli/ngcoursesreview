'use strict';

/**
 * @ngdoc overview
 * @name ngReviewApp
 * @description
 * # ngReviewApp
 *
 * Main module of the application.
 */

angular.module('ngReviewApp',['ngRoute','firebase','LocalStorageModule'])

.config(function($routeProvider){

	$routeProvider
	.when("/",{
		templateUrl: 'views/main.html',
		controller: 'MainController',
		controllerAs: 'vm',
		authRequired: true
	})
	.when("/reviews",{
		templateUrl: 'views/main.html',
		controller: 'MainController',
		controllerAs: 'vm',
		authRequired: true
	})
    .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
    })
    .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'LoginController',
            controllerAs: 'vm'
    })
    .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutController',
            controllerAs: 'vm'
    })	
    .when('/addreview', {
        templateUrl: 'views/addreview.html',
        controller: 'ReviewController',
        controllerAs: 'vm',
        authRequired: true
    });

})

.run(['AuthFactory', function (AuthFactory) {
    AuthFactory.fillAuthData();
}]);