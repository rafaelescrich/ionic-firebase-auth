(function(){
  'use strict';

  angular
    .module('app.core', [
            'ionic',
            'firebase',
    ]);

    angular
    	.module('app.core')
    	.run(['$ionicPlatform',
    	     function($ionicPlatform) {
    	     	$ionicPlatform.ready(function() {
					    if(window.cordova && window.cordova.plugins.Keyboard) {
					      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					      cordova.plugins.Keyboard.disableScroll(true);
					    }
					    if(window.StatusBar) {
					      StatusBar.styleDefault();
					    }
					  });
			}])
			.constant('FBURL', 'https://ionic-firebase-start.firebaseio.com/')
})();
