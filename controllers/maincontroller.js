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
	this.showAddReviews=false;
	this.showBooks=false;
	this.showReviews=false;
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
	var promise=ReviewFactory.getCoursesMongo();
	promise.then(function(data){
		console.log(data);
		vm.courses=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});

	this.formControl=function(val){
		if(this.courseID!='' && val==1)
		{
			this.reviewStatus=this.courseID+" is selected";
			this.showAddReviews=true;
			this.showReviews=false;
			this.showBooks=false;
		}
		else if(this.courseID=='')
		{
			this.reviewStatus="Please select a course";
		}
		else
		{

			this.showAddReviews=false;
		}
	}

	
	this.displayReviews=function(){
		if(this.courseID=='')
		{
			vm.reviewStatus='Please select course';
		}
		else
		{
			this.reviewStatus=this.courseID+" is selected";
			var promise=ReviewFactory.getReviews(vm.courseID);
			promise.then(function(data){
				console.log(data);
				vm.reviews=data;
			}, function(reason){
				console.log(reason);
				vm.message=reason;
			});

			this.showReviews=true;
			this.showBooks=false;
			this.showAddReviews=false;
		}
	};

	this.displayBooks=function(){
		if(vm.courseID=='')
		{
			vm.reviewStatus='Please select course';
		}
		else
		{
			this.reviewStatus=this.courseID+" is selected";
			console.log("course " + vm.courseID);
			var promise=BookFactory.getBook(vm.courses,vm.courseID);
			promise.then(function(data){
				console.log("out of factory");
				console.log(data);
				vm.imgurl=data[0];
				vm.title=data[1];
				vm.price=data[2];
				//vm.books=data;
			}, function(reason){
				console.log(reason);
				vm.message=reason;
			});
				
			this.showAddReviews=false;
			this.showBooks=true;
			this.showReviews=false;
		}
	};

	this.addReviews=function(){

		var promise=ReviewFactory.addReview(this.auth.password.email,this.auth.uid,this.courseID,this.reviewTitle,this.bookTitle,this.reviewBody, "Browser");
		promise.then(function(message){
			console.log(message);
			vm.message=message;
			}, function(reason){
			vm.message=reason;
			console.log(reason)
		}, function(update){
			console.log("got notification" + update);
		});
				this.showAddReviews=false;

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