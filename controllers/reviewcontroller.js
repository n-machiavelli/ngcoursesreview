(function(){
	'use strict';

angular
	.module('ngReviewApp')
	.controller('ReviewController',ReviewController);
//MainController.$inject=['ReviewFactory'];

function MainController(ReviewFactory){
	var vm=this;
	this.reviews=[];
	this.getReviews=function getReviews(courseID){
		vm.reviews=ReviewFactory.getReviews(courseID);
			console.log(vm.reviews);
	};
	
	this.courses=ReviewFactory.getCourses();
}
})();