(function(){
	'use strict';

angular
	.module('ngReviewApp')
	.controller('MainController',MainController);
//MainController.$inject=['ReviewFactory'];
MainController.$inject=['ReviewFactory','AuthFactory','BookFactory','$location','$http'];
function MainController(ReviewFactory,AuthFactory,BookFactory,$location,$http){
	var vm=this;
	this.reviews=[];
	this.auth=[];
	this.rtitle=[];
	this.bktitle=[];
	this.btitle=[];
	this.courseID='';
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


	this.formControl=function(dirty){
		if(vm.courseID=='' && dirty=='1')
		{
			vm.reviewStatus='Please select course';
		}
		else if(dirty=='2')
		{
		vm.reviewStatus='';
		this.showReviewForm=false;	
		}
		else{
		vm.reviewStatus=this.courseID+' selected';
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
			
			var promise=ReviewFactory.getReviews(vm.courseID);
			promise.then(function(data){
				console.log(data);
				vm.reviews=data;
			}, function(reason){
				console.log(reason);
				vm.message=reason;
			});
		}
	}
	this.displayBooks=function(){
		if(vm.courseId=='')
		{
			vm.reviewStatus='Please select course';
		}
		else
		{
			console.log("course " + vm.courseID);
			var promise=BookFactory.getBook(vm.courses,vm.courseID);
			promise.then(function(data){
				console.log("out of factory");
				console.log(data);
				vm.imgurl=data[0];
				//vm.books=data;
			}, function(reason){
				console.log(reason);
				vm.message=reason;
			});
		}
	}

	this.addReviews=function(){
		var promise=ReviewFactory.addReview(this.auth.uid,this.courseID,this.reviewTitle,this.bookTitle,this.reviewBody);
		promise.then(function(message){
			console.log(message);
			vm.message=message;
			vm.showReviewForm=false;
		}, function(reason){
			vm.message=reason;
			console.log(reason)
		}, function(update){
			console.log("got notification" + update);
		});

	};

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