(function(){
	'use strict';

	angular
			.module('app.auth')
			.controller('ProfileCtrl', ProfileCtrl);

	ProfileCtrl.$inject = ['$scope', 'currentAuth', 'AuthService', '$state'];

	function ProfileCtrl($scope, currentAuth, AuthService, $state){
    $scope.data = {};
    $scope.userProfile = AuthService.userProfileData(currentAuth.uid);

		$scope.logoutUser = function(){
			AuthService.logoutUser();
		};

    $scope.changePassword = function(changePasswordForm){
      if (changePasswordForm.$valid) {
        var oldPassword = $scope.data.oldPassword;
        var newPassword = $scope.data.newPassword;
        AuthService.changePassword(currentAuth.password.email, oldPassword, newPassword);
      }
    };

    $scope.changeEmail = function(changeEmailForm){
      if (changeEmailForm.$valid) {
        AuthService.changeEmail(currentAuth.password.email, $scope.data.newEmail, $scope.data.password);
        $scope.userProfile.email = $scope.data.newEmail;
        $scope.userProfile.$save();
      };
    };



	};

})();
