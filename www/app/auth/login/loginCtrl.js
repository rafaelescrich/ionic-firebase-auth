(function(){
	'use strict';

	angular
			.module('app.auth')
			.controller('LoginCtrl', LoginCtrl);
  /**
   * We create our controller and inject the AuthService so we can connect to Firebase.
   */
	LoginCtrl.$inject = ['$scope', 'AuthService'];

  function LoginCtrl($scop, AuthService){
		$scope.data = {};

		$scope.loginEmail = function(){
				var email = $scope.data.email;
				var password = $scope.data.password;
				AuthService.loginUser(email, password);
		}
	}
})();
