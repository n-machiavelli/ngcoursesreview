(function(){
	'use strict';

angular
	.module('ngReviewApp')
	.controller('MainController',MainController);
//MainController.$inject=['ReviewFactory'];
MainController.$inject=['ReviewFactory','AuthFactory','$location'];
function MainController(ReviewFactory,AuthFactory,$location){
	var vm=this;
	this.reviews=[];
	//var authData=AuthFactory.getAuthData(); //implement promise **************
	var promise=AuthFactory.getAuthData();
	promise.then(function(authData){
		console.log(authData.uid);
		console.log(authData);
		vm.email=authData.password.email;
	},function(reason){
		console.log("back to login. no authData");
		$location.path("/login");		
	},function(update){
		console.log("update");
	});
	// AuthFactory.fillAuthData();
	this.getReviews=function getReviews(courseID){
		vm.reviews=ReviewFactory.getReviews(courseID);
			console.log(vm.reviews);
	};

	//this.courses=ReviewFactory.getCourses();
	//console.log(this.courses);
	var promise=ReviewFactory.getCoursesFirebase();
	promise.then(function(snapshotval){
		console.log(snapshotval);
		vm.courses=snapshotval;
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});
	console.log("snapshot");

	//console.log(this.snapshot);
	//ReviewFactory.setCourses();
    vm.logout=function(){
        var promise=AuthFactory.logout();
        promise.then(function(msg){
        	console.log(msg);
        	$location.path("/");		
        }, function(reason){
        	console.log(reason);
        });
    }
}
})();

// angular
//     .module('ngReviewApp')
//     .controller('MainController', ['$scope',  function($scope) {
//         $scope.xyz="fslkdfds";


// }]);