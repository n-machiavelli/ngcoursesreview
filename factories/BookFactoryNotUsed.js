
angular.module('ngReviewApp')
	.factory('BookFactory',BookFactory);
	BOokFactory.$inject=['$http','$q'];

	function BookFactory($http,$q){
		var img=[];

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

		this.getBooks=function getBooks(courses,courseID){
				console.log("in book factory");
				console.log(courseID);
				var j=0;
				var ln=courses["IT353"].books.length;
				var img=[];
				var deferred=$q.defer();
				for (j=0;  j<ln; j++) 
					{ 
						bookName=courses["IT353"].books[j].name;
						bookAuthor=courses["IT353"].books[j].author;
						console.log (j + "Book : " + bookName + " Author: " + bookAuthor);
						var promise=this.getEbayDetails(bookName);
						promise.then(function(data){
							console.log(j);
							//console.log(data);
							imgurl=data.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL;
							img.push(imgurl);
							//console.log(img);
							//console.log(this.images[j]);
						}, function(reason){
							console.log(reason);
						});
					}
				console.log(img);
				deferred.resolve(img);//courses[courseID].books);
				return deferred.promise;
		};

		return this;
	}
