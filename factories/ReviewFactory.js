angular.module('ngReviewApp')
	.factory('ReviewFactory',ReviewFactory);
	ReviewFactory.$inject=['$http','$q','$firebase'];

	function ReviewFactory($http,$q,$firebase){
		var reviews=[];
		var courses=[];
		var ref = new Firebase("https://dazzling-fire-6822.firebaseio.com/");     
		var apiUrl="api/v1/";
		var apiKey="9a0554259914a86fb9e7eb014e4e5d52";

		this.getCoursesMongo=function getCoursesMongo(){
			var deferred=$q.defer();
			var request = $http({
                method: 'GET',
                url: apiUrl + "courses/list",
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
		};
		this.addCourseMongo=function addCourseMongo(courseID,courseName,bookTitle,bookAuthor){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: apiUrl + "courses/add",
                data: {
                	courseID: courseID,
                	courseName: courseName,
                	bookTitle: bookTitle,
                	bookAuthor: bookAuthor,
                	apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
            	message='Course Added Successfully';
               console.log("Course Added to the database successfully");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
            	.error(function(error){
            		console.log(error);
            		deferred.reject(error);
            	});
			//vm.reviews=ReviewFactory.getReviews(courseID);
			//console.log("Review has been added");
			return deferred.promise;			
		}
		this.updateCourseMongo=function updateCourseMongo(courseID,newCourseName){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: apiUrl + "courses/update",
                data: {
                	courseID: courseID,
                	newCourseName: newCourseName,
                	apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
            	message='Course Updated Successfully';
               console.log("Course Updated successfully");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
            	.error(function(error){
            		console.log(error);
            		deferred.reject(error);
            	});
			//vm.reviews=ReviewFactory.getReviews(courseID);
			//console.log("Review has been added");
			return deferred.promise;			
		}
		this.deleteCourseMongo=function deleteCourseMongo(courseID){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: apiUrl + "courses/delete",
                data: {
                	courseID: courseID,
                	apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
            	message='Course Deleted Successfully';
               console.log("Course Deleted successfully");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
            	.error(function(error){
            		console.log(error);
            		deferred.reject(error);
            	});
			//vm.reviews=ReviewFactory.getReviews(courseID);
			//console.log("Review has been added");
			return deferred.promise;			
		}		



    this.deleteReviewsMongo=function deleteReviewsMongo(courseID){
      var deferred=$q.defer();
      var request = $http({
                method: 'POST',
                url: apiUrl + "reviews/delete",
                data: {
                  courseID: courseID,
                  apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
              message='Course Deleted Successfully';
               console.log("Course Deleted successfully");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            })
              .error(function(error){
                console.log(error);
                deferred.reject(error);
              });
      //vm.reviews=ReviewFactory.getReviews(courseID);
      //console.log("Review has been added");
      return deferred.promise;      
    }   



    this.getLogs=function getLogs(apiKey){
      var deferred=$q.defer();
      var request = $http({
                method: 'POST',
                url: apiUrl+"logs/list",
                data: {
                  apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
               console.log(data);
               deferred.resolve(data);
            });
      return deferred.promise;
    }


		this.getReviews=function getReviews(courseID){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: "api/v1/reviews/list",
                data: {
                	courseID: courseID
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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

		
		this.addReview=function addReview(uid,courseID,reviewTitle,bookTitle,reviewBody,userLocation,email){
			var deferred=$q.defer();
			var request = $http({
                method: 'POST',
                url: "api/v1/reviews/add",
                data: {
                	uid: uid,
                	email: email,
                	courseID: courseID,
                	reviewTitle: reviewTitle,
                	bookTitle: bookTitle,
                	reviewBody: reviewBody,
                	userLocation: userLocation,
                	apiKey: apiKey
                }
                ,headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
            	message='Review Added Successfully';
               console.log("Data Added to the database successfully");
               console.log(data);
               deferred.resolve(data);
               // $scope.message = "From PHP file : "+data;
            });
			//vm.reviews=ReviewFactory.getReviews(courseID);
			console.log("Review has been added");
			return deferred.promise;
		}

    
		this.getCoursesFirebase=function getCoursesFirebase(){
				var deferred=$q.defer();
				var ref = new Firebase("https://dazzling-fire-6822.firebaseio.com/courses"); 
				var snapshotval=[];    
				// Attach an asynchronous callback to read the data at our posts reference
				ref.on("value", function(snapshot) {
				  //console.log(snapshot.val());
				  snapshotval=snapshot.val();
				  console.log(snapshotval);
				  deferred.resolve(snapshotval);
				}, function (errorObject) {
				  console.log("The read failed: " + errorObject.code);
				  deferred.reject("The read failed: " + errorObject.code);
				});		
				return deferred.promise;
		};


		return this;
	}