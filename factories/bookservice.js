'use strict';

/* Services */

angular.module('booksApp.services',[])

  
.factory('booksAppService',['$http','$q', function($http,$q) {

    
    return {
    getEbay: function(bookName) {
    
    var apiBaseUrl = 'http://svcs.ebay.com/servbooksApp.servicesices/search/FindingService/v1?SECURITY-APPNAME=199018274-7ecc-4fe3-a9db-489923d19d0&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=JSON_CALLBACK&REST-PAYLOAD&keywords='+bookName+'&paginationInput.entriesPerPage=3';
    var deferred=$q.defer();
    
    $http.jsonp(apiBaseUrl).
    success(function(data, status, headers, config) {
    console.log(data);
    deferred.resolve(data);
    
    
    
  }).
    error(function(data, status, headers, config) {
    deferred.reject(status);
    
    
  });
return deferred.promise;

}
    };
       
    
  }]);
    // return $resource(apiBaseUrl + ':type/:extra?q=:location',
    //   {
    //     mode: 'jsonp',
    //     callback: 'JSON_CALLBACK',
    //     units: 'metric',
    //     lang: 'en'
    //   },
    //   {
    //     //For getting only current and todays data
    //     queryToday: {
    //       method: 'JSONP',
    //       params: {
    //         type: 'weather'

    //       },
    //       isArray: false,
          
    //     },

    //     //For getting History data
    //     queryHistory: {
    //       method: 'JSONP',
    //       params: {
    //         type: 'history',
    //         extra: 'city'

    //       },
    //       isArray: false,
          
    //     },
    //     //for getting forecast of next 16 days
    //      queryForecastDaily: {
    //       method: 'JSONP',
    //       params: {
    //         type: 'forecast',
    //         extra: 'daily',
    //         cnt: 16
    //       },
    //       isArray: false,
          
    //     }
    //   }
    // );



  // });