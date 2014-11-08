(function(){
	'use strict';

angular
	.module('ngReviewApp')
	.controller('LoginController',LoginController);
	//LoginController.$inject=['$firebase','localStorageService'];
	LoginController.$inject=['AuthFactory','$location'];

function LoginController(AuthFactory,$location){
	var vm=this;
    //var ref = new Firebase("https://dazzling-fire-6822.firebaseio.com/");	
	vm.msg="xx";
	vm.authData={};
    vm.login=function(){
        var promise=AuthFactory.login(vm.email,vm.password);
        promise.then(function(authData){
        if (!(jQuery.isEmptyObject(authData))){
        		//vm.msg=AuthFactory.message;
        		console.log("$location move");
        		console.log(authData);
        		vm.authData=authData;
                $location.path("/reviews");
        }else{
        	vm.msg="Empty auth";//AuthFactory.message;
        }        	
        },function(reason){
        	vm.msg="Failed : " + reason + ":" + AuthFactory.message;
        },function(update){
        	vm.msg="updated";
        })
        //if(!$scope.$$phase) $scope.$apply();
        // $scope.$apply(
        //     vm.message = "a message"
        // );
		console.log("vm msg " + vm.msg);
    };

    vm.loginAndStore=function(){
        var promise=AuthFactory.login(vm.email,vm.password);
        promise.then(function(authData){
        if (!(jQuery.isEmptyObject(authData))){
        		//vm.msg=AuthFactory.message;
        		console.log("$location move");
        		console.log(authData);
        		vm.authData=authData;
        		AuthFactory.storeAuthData(authData);
                $location.path("/reviews");
        }else{
        	vm.msg="Empty auth";//AuthFactory.message;
        }        	
        },function(reason){
        	vm.msg="Failed : " + reason + ":" + AuthFactory.message;
        },function(update){
        	vm.msg="updated";
        })
        //if(!$scope.$$phase) $scope.$apply();
        // $scope.$apply(
        //     vm.message = "a message"
        // );
		console.log("vm msg " + vm.msg);
    };

    vm.register=function(){
        var promise=AuthFactory.register(vm.email,vm.password);
        promise.then(function(message){
        	//registered. now authenticate
        	console.log("before loginAndStore, after register success");
        	vm.loginAndStore();
/*        	var promise2=AuthFactory.getAuthData();
        	console.log("before promise2 then");
        	promise2.then(function(authData){
        		AuthFactory.storeAuthData(authData);
        		console.log ("called store");
        		vm.loginAndStore();
        	}, function(reason){
        		vm.msg="Could not store";
        		console.log("reason " + reason);
        	});
 */
        },function(reason){
        	vm.msg="Failed : " + reason + ":" + AuthFactory.message;
        	console.log ("failed here outer reason" + vm.msg);
        },function(update){
        	vm.msg="updated";
        });
    }    

}
})();