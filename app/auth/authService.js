(function(){
	'use strict';

	angular
			.module('app.auth')
      /**
       * [This is a simple service, it take in the Firebase Url constant, pass it to the
       * Firebase constructor function]
       *
       * This is basically the same as saying rootRef = new Firebase(FBURL);
       */
      .service('rootRef', ['FBURL', Firebase])

      /**
       * AuthService is going to handle all of our auth functions, so we don't need to write them inside the controllers.
       */
			.factory('AuthService', AuthService);

	function AuthService($firebaseAuth, $firebaseObject, $firebaseArray, $state, rootRef){

    var authUser = $firebaseAuth(rootRef); // We are using angular-fire $firebaseAuth to return an auth object.

		return {
			/*
				The function receives an email, password, name and creates a new user
				After the user is created it stores the user details in the DB.
			*/
			signupEmail: function(newEmail, newPassword, newFullName){

        /**
         * Here we're using angular-fire $createUser to create a new user, just passing the email, password and
         * full name.
         *
         * After that we're creating the record in the DB in a "userProfile" node, remember,
         * creating a user doesn't show him/her in the DB, so we need to create that record ourselves.
         *
         * And then we are catching any errors that might happen :P
         */
				authUser.$createUser({
					email: newEmail,
					password: newPassword,
					fullName: newFullName,
				}).then(function(authData){
						rootRef.child("userProfile").child(authData.uid).set({
							name: newFullName,
							email: newEmail,
						});
						$state.go('profile');
				}).catch(function(error){
						switch (error.code) {
				      case "EMAIL_TAKEN":
				        alert("Bro, someone's using that email!");
				        break;
				      case "INVALID_EMAIL":
				        alert("Dude, that is not an email address!");
				        break;
				      default:
				        alert("Error creating user:", error);
				    }
				});
			},

      /**
       * Here we are login our user in, we user angular-fire $authWithPassword assing the email and password.
       * After that we send the user to our dashboard.
       */
			loginUser: function(email, password){
				authUser.$authWithPassword({
					"email": email,
					"password": password
				}).then (function(authData){
					$state.go('dashboard');
				}).catch(function(error){
					console.log(error);
				});
			},

      /**
       * This one explain itself, if the user doesn't remember his password he'll click in the "forgot you password?"
       * link and we need to send him a token so he can log in again
       *
       * NOTE: This doesn't send a reset password link, this sends a token he can use as a password to log in and
       * change his password to something he remembers.
       */
			resetPassword: function(resetEmail){
				authUser.$resetPassword({
					email: resetEmail
				}).then(function(){
					console.log('Password Reset Email was sent successfully');
				}).catch(function(error){
					console.log(error);
				});
			}

		}

	}
})();
