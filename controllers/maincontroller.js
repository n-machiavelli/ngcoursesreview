(function(){
	'use strict';

angular
	.module('ngReviewApp')
	.controller('MainController',MainController);
//MainController.$inject=['ReviewFactory'];
MainController.$inject=['ReviewFactory','AuthFactory','$location','$http'];
function MainController(ReviewFactory,AuthFactory,$location,$http){
	var vm=this;
	this.reviews=[];
	this.auth=[];
	this.rtitle=[];
	this.bktitle=[];
	this.btitle=[];
	this.courseId='';
	this.reviewStatus='';
	this.showReviewForm=false;
	//var authData=AuthFactory.getAuthData(); //implement promise **************
	
	var promise=AuthFactory.getAuthData();
	
	promise.then(function(authData){
		vm.auth=authData;
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
	this.formControl=function(dirty){
		if(vm.courseId=='' && dirty=='1')
		{
			vm.reviewStatus='Please select course';
		}
		else if(dirty=='2')
		{
		vm.reviewStatus='';
		this.showReviewForm=false;	
		}
		else{
		vm.reviewStatus=this.courseId+' selected';
		this.showReviewForm=true;
	}


	}

	this.displayReviews=function(){
		if(vm.courseId=='')
		{
			vm.reviewStatus='Please select course';
		}
		else
		{
			vm.reviews=ReviewFactory.getReviews(vm.courseId);
		}
		
		//call 
	}

	this.addReviews=function(){

		var request = $http({
                method: 'POST',
                url: "putData.php",
                data: {
                	uid: this.auth.uid,
                	courseId: this.courseId,
                	reviewTitle: this.rtitle,
                	bookTitle: this.bktitle,
                	reviewBody: this.btitle

                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
            	vm.reviewStatus='Review Added Successfully';
            	vm.showReviewForm=false;
               console.log("Data Added to the database successfully");

               // $scope.message = "From PHP file : "+data;
            });

           
			//vm.reviews=ReviewFactory.getReviews(courseID);
			console.log("Review has been added");
		
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