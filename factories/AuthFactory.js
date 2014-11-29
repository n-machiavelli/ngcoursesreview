
angular.module('ngReviewApp')
  .factory('AuthFactory',AuthFactory);
  AuthFactory.$inject=['$firebase','$q'];

  function AuthFactory($firebase,$q){
    var reviews=[];
    var courses=[];
    var authData={};
    var message="";
    var ref = new Firebase("https://dazzling-fire-6822.firebaseio.com/");     
    this.login=function(email,password){
        var deferred=$q.defer();
        ref.authWithPassword({
          email    : email,
          password : password
        }, function(err,authData) {
          if (err) {
                message="Login failed." + err;
                deferred.reject(message);
          } else {
            // User account created successfully!
              message="successfully logged in." + authData;
              deferred.resolve(authData);
              //console.log(authData);
          }
          //console.log(message);
        });
        return deferred.promise;
    }
    this.register=function(email,password){
        var deferred=$q.defer();
        ref.createUser({
          email    : email,
          password : password
        }, function(err) {
          if (err) {
            switch (err.code) {
              case 'EMAIL_TAKEN':
                message="The new user account cannot be created because the email is already in use.";
                break;
              case 'INVALID_EMAIL':
                message="INVALID_EMAIL";
                break;
              default:
                message=err.code;                
            }
            deferred.reject(message);
          } else {
            // User account created successfully!
            message="User account created";
            deferred.resolve(message);
          }

      });
          return deferred.promise;
    }

    this.fillAuthData=function(){
      authData = ref.getAuth();
      if (authData) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
      } else {
        // user is logged out
        console.log("no login");
      }     
    } 
    this.getAuthData=function(){
      var deferred=$q.defer();
      authData = ref.getAuth();
      if (authData)
        deferred.resolve(authData);
      else
        deferred.reject("No Auth");
      return deferred.promise;
    } 
    this.storeAuthData=function(authData){
      var deferred=$q.defer();
        if (authData) {
          // save the user's profile into Firebase so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          ref.child('users').child(authData.uid).set(authData);
          deferred.resolve(authData);
        }else{
          deferred.reject("Not stored");
        }
      return deferred.promise;
    } 

    this.logout=function(){
      var deferred=$q.defer();
      ref.unauth();
        deferred.resolve("Logged out");
      return deferred.promise;
    } 

  this.message=message;
  console.log ("returned " + this.message);
  this.authData=authData;
  return this;

}
