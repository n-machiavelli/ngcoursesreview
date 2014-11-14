'use strict';


angular.module('booksApp.controllers',[])


  .controller('booksAppCtrl',
    ['$scope','booksAppService',
      function($scope,booksAppService) {
      	$scope.showing=false;
      	$scope.bookName=[];

        
        //.searchResult[0].item;
        
        
        
        $scope.search=function(bookName)
        {
        	bookName=bookName.split(' ').join('%');
        	console.log(bookName);
        	$scope.books=booksAppService.getEbay(bookName);
        	$scope.books.then(function(books) {
        $scope.items=books.findItemsByKeywordsResponse[0].searchResult[0].item;
        	console.log(books);}, function(status) {
        	console.log(status);
        });

        	   	$scope.showing=true;
        }

            
   
  }]);
