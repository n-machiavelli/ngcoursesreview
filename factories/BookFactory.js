
angular.module('ngReviewApp')
	.factory('BookFactory',BookFactory);
	BookFactory.$inject=['$http','$q'];

	function BookFactory($http,$q){
		var imgurl;
		var title;
		var price;

		this.getReviews=function getReviews(courseID){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: "api/v1/reviews/list",
                data: {
                	courseID: courseID
                }
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            });
			//vm.reviews=ReviewFactory.getReviews(courseID);
			return deferred.promise;
		}

		this.getEbayDetails=function getEbayDetails(bookName){
    		var apiBaseUrl = 'http://svcs.ebay.com/servbooksApp.servicesices/search/FindingService/v1?SECURITY-APPNAME=199018274-7ecc-4fe3-a9db-489923d19d0&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=JSON_CALLBACK&REST-PAYLOAD&keywords='+bookName+'&paginationInput.entriesPerPage=3';
    		var deferred=$q.defer();
    		$http.jsonp(apiBaseUrl).
    		success(function(data, status, headers, config) {
    			//console.log(data);
    			deferred.resolve(data);
  			}).
    		error(function(data, status, headers, config) {
    			deferred.reject(status);
  			});
			return deferred.promise;
		}

		this.getBook=function getBook(courses,courseID){
				//var imgurl;
				var deferred=$q.defer();				
				console.log("in book factory");
				
						bookName=courses[courseID].books[0].name;  //one book
						bookAuthor=courses[courseID].books[0].author;
						console.log(bookName);
						var promise=this.getEbayDetails(bookName);

						promise.then(function(data){
							this.imgurl=data.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0];
							this.title=data.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0];
							this.price=data.findItemsByKeywordsResponse[0].searchResult[0].item[0].shippingInfo[0].shippingServiceCost[0].__value__;
							console.log(this.title);
							console.log(this.price);
							var data=[this.imgurl,this.title,this.price];
							deferred.resolve(data);

							//deferred.resolve(this.imgurl);
							//
							//deferred.resolve(this.price);
						}, function(reason){
							console.log(reason);
							deferred.reject(reason);
						});
				//console.log(this.imgurl);
				//deferred.resolve(this.imgurl);//courses[courseID].books);
				return deferred.promise;
		};

		return this;
	}
