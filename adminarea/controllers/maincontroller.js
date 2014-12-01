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
	
	this.userLogs='';
	this.courseID='';
	this.reviewStatus='';
	this.courses='';
	this.logs='';
	this.apiKey="9a0554259914a86fb9e7eb014e4e5d52";
	this.showDelReviews=false;
	//variable for switching Views between various CRUD operations
	this.showAddReviews=false;
	this.showBooks=false;
	this.showReviews=false;
	this.showAddCourse=false;
	this.showGetCourses=false;
	this.showDeleteCourse=false;
	this.showUpdateCourse=false;
	this.showUpdateBar=false;
	this.showUserLogs=false;
	this.showLogDetails=false;
	this.updateCourseName='';

	

	this.adminWork='';

	this.newCourseId='';
	this.newCourseName='';
	this.newCourseBookTitle='';
	this.newCourseBookAuthor='';
	//this.deleteReviewID='';



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
			alert(vm.reviewStatus);
		}
		else
		{
			this.addReviews();
			this.showAddReviews=false;
		}
	}

	
	this.displayReviews=function(){
		if(this.courseID=='')
		{
			vm.reviewStatus='Please select course';
			alert(vm.reviewStatus);
		}
		else
		{
			this.reviewStatus=this.courseID+" is selected";
			var promise=ReviewFactory.getReviews(vm.courseID);
			promise.then(function(data){
				console.log(data);
				vm.reviews=data;
				if(vm.reviews.length==0)
				{
					vm.numberOfReviews="No reviews available for this course";
					alert(vm.numberOfReviews);
				}
				else
				{
					vm.numberOfReviews="Total "+vm.reviews.length+" reviews available";	
				}
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
			alert(vm.reviewStatus);
		}
		else
		{
			this.reviewStatus=this.courseID+" is selected";
			for(var i=0;i<vm.courses.length;i++)
			{
				if(vm.courses[i].courseID==vm.courseID)
				{
					console.log("course " + vm.courses[i].bookTitle);
			var promise=BookFactory.getBook(i,vm.courses);
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
			

				}
			}

				
			this.showAddReviews=false;
			this.showBooks=true;
			this.showReviews=false;
		}
	};

	this.addReviews=function(){

		var promise=ReviewFactory.addReview(this.auth.uid,this.courseID,this.reviewTitle,this.bookTitle,this.reviewBody);
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

	this.adminFunction=function(crud){
		this.showLogDetails=false;
		if(crud==1)
		{
			this.adminWork="Write New Course";
			this.showAddCourse=true;
			this.showGetCourses=false;
			this.showUpdateCourse=false;
			this.showDeleteCourse=false;
			this.showUserLogs=false;
			this.showDelReviews=false;
		}
		else if(crud==2)
		{
			this.adminWork="Read All Courses";
			this.getCourseMongo();
			//Switch Views between various operations
			this.showAddCourse=false;
			this.showGetCourses=true;
			this.showUpdateCourse=false;
			this.showDeleteCourse=false;
			this.showUserLogs=false;
			this.showDelReviews=false;
		}
		else if(crud==3)
		{
			vm.courseID='';
			this.adminWork="Update Existing Course";
					this.showAddCourse=false;
			this.showGetCourses=false;
			this.showUpdateCourse=true;
			this.showDeleteCourse=false;
			this.showUserLogs=false;
			this.showDelReviews=false;
		}
		else if(crud==4)
		{
			vm.courseID='';
			this.adminWork="Delete Existing Course";	
					this.showAddCourse=false;
			this.showGetCourses=false;
			this.showUpdateCourse=false;
			this.showUserLogs=false;
			this.showDeleteCourse=true;
			this.showDelReviews=false;
		}
		else if(crud==5)
		{
			this.adminWork="Get user Logs";	
			this.getUserLogs();
			this.showAddCourse=false;
			this.showGetCourses=false;
			this.showUpdateCourse=false;
			this.showDeleteCourse=false;
			this.showUserLogs=true;
			this.showDelReviews=false;
		}
		else if(crud==6)
		{
			this.adminWork="Manage Reviews";
			this.showDelReviews=true;
			this.showAddCourse=false;
			this.showGetCourses=false;
			this.showUpdateCourse=false;
			this.showDeleteCourse=false;
			this.showUserLogs=false;
		}

	};

	this.addCourseMongo=function(){
		var promise=ReviewFactory.addCourseMongo(this.newCourseId,this.newCourseName,this.newCourseBookTitle,this.newCourseBookAuthor);
		promise.then(function(message){
			console.log(message);
			vm.message=message;
			}, function(reason){
			vm.message=reason;
			console.log(reason)
		}, function(update){
			console.log("got notification" + update);
		});
				this.showAddCourse=false;
				this.adminWork=this.newCourseId+" has been added";
				this.getCourseMongo();
				var promise=ReviewFactory.getCoursesMongo();
	promise.then(function(data){
		console.log(data);
		vm.courses=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});

	};
this.getCourseMongo=function(){
		var promise=ReviewFactory.getCoursesMongo();
	promise.then(function(data){
		console.log(data);
		vm.courses=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});

	};



	this.deleteCourseMongo=function(){
		//vm.getCoursesMongo();
		var promise=ReviewFactory.deleteCourseMongo(this.courseID);
		promise.then(function(message){
			console.log(message);
			vm.message=message;
			}, function(reason){
			vm.message=reason;
			console.log(reason)
		}, function(update){
			console.log("got notification" + update);
		});
		

		if(vm.courseID!=''){
			var promise=ReviewFactory.getCoursesMongo();
	promise.then(function(data){
		console.log(data);
		vm.courses=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});
				this.showDeleteCourse=false;
				this.adminWork=this.courseID+" has been deleted";
}
	};

	this.updateCourseMongo=function(type){
		
		

		if(type==1 && vm.courseID!='')
		{
			

			this.showUpdateBar=true;
		}
		else if(type==2)
		{

				this.showUpdateCourse=false;
				this.adminWork=this.courseID+" has been updated";
				


	var promise=ReviewFactory.updateCourseMongo(this.courseID, this.updateCourseName);
		promise.then(function(message){
			console.log(message);
			vm.message=message;
			}, function(reason){
			vm.message=reason;
			console.log(reason)
		}, function(update){
			console.log("got notification" + update);
		});

		}

		var promise=ReviewFactory.getCoursesMongo();
	promise.then(function(data){
		console.log(data);
		vm.courses=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});

	};

	this.getUserLogs=function(){
		var promise=ReviewFactory.getLogs(vm.apiKey);//this method is not in factory
	promise.then(function(data){
		console.log(data);
		vm.userLogs=data;	
	}, function(reason){
		console.log(reason)
	}, function(update){
		console.log("got notification" + update);
	});

	};

		this.logDetails=function(logsDet){
			console.log(logsDet.parameters);
			vm.logs=logsDet;

			this.showLogDetails=true;
			this.showUserLogs=false;
		
	};

		this.deleteReview=function(type,id){
		if(type==1 && id==0 && this.courseID!='')
		{
			this.displayReviews();
		}
		else if(type==2)
		{
			console.log(vm.reviews[id].IDD);
			var promise=ReviewFactory.deleteReviewsMongo(vm.reviews[id].IDD);
			promise.then(function(data){
				console.log(data);
				vm.courses=data;	
			}, function(reason){
				console.log(reason)
			}, function(update){
				console.log("got notification" + update);
			});

			this.displayReviews();
		}
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