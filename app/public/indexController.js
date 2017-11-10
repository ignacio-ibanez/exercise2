songsEvents.controller('indexController', ['$scope','$http','$routeParams','$location','$window','$uibModal',
								function($scope,$http,$routeParams,$location,$window,$uibModal){

	var action;
	var results;

	// This angular controller is in charge of demanding the parameters of the new songs to be stored,
	// and the parameters to query the songs already stored in the server.

	// The structure of the client-app is based, mainly, in two views, which are controlled by this controller: 
	// 1. index.html: shows the initial view of the app. Here, the user is offered to add a new song, or to query the songs 
	//				already stored. In both cases, a modal view is shown, with a form to be filled.
	// 2. songs.html: it has not been finished, but the idea was to show each of the users in a different section 
	// 				and the songs of each of them.

	// This function receives the order to open the modal view. This modal view, as defined in angular documentation,
	// needs its own controller, which is defined at the end of this script.
	// Since for both options, it works the same, apart from the fact that different information is requested, there two 
	// different identifiers for the action to be executed, and depending on which of them is the active, only the html 
	// form has to be changed. With this approach, all the code is used for both options, and in case of adding new ones, 
	// it will be needed just to add the html.     
	$scope.selectParams = function(action){
		var templateToUse;
		switch(action){
			case 'new':
				templateToUse = "newSongModal.html";
				break;
			case 'list':
				templateToUse = "listSongsModal.html";
				break;
		}
    	var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: templateToUse,
			controller: 'selectParamsController',
    		resolve: {
				action: function(){
					return action;
				}	
			}
		});
    	
    	modalInstance.result.then(function (params) {
    		if(params.action == "new"){
    			$scope.sendEvent(params);
    		}else{
    			$scope.searchEvents(params);
    		}
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
    }

    // This function is in charge of sending the parameters of the new song to be stored to the server. This is done 
    // with a http post.
    $scope.sendEvent = function(paramsIntroduced){
    	var paramsToSend = {
    		ts: new Date(),
    		eventType: "songsPlayed",
    		data: {
	    		t: paramsIntroduced.t,
				artist: paramsIntroduced.artist,
				album: paramsIntroduced.album,
				track: paramsIntroduced.track,
				title: paramsIntroduced.title,
				uri: paramsIntroduced.uri,
				user: paramsIntroduced.user
			}	
   		}
		$http({ 
    		method: "POST",
    		url: "/songs",
    		params: paramsToSend
 		})
 		.then(function successFunc(data){
			$window.location.href = '/';
		}, function errorFunc(data, status){
			console.log("Impossible to perform the action");
		});
	};

	// This function is in charge of quering the songs using a http get, and redirecting to the view songs.html.
	$scope.searchEvents = function(params){
		$http({ 
    		method: "GET",
    		url: "/results",
    		params: {
    			data: {
    				artist: params.artist,
    				album: params.albums,
    				user: params.user
    			}
    		}
 		})
 		.then(function successFunc(data){
			var dataReceived = data.data;
			$window.location.href = '/songs';
			if(dataReceived.error == "true"){
				console.log("No results found");
			}else{
				console.log(dataReceived);
			}
		}, function errorFunc(data, status){
			console.log(status);
		});
	};

}]);



// The following lines form the controller of both modal views.
songsEvents.controller('selectParamsController', ['$scope', '$http', '$uibModalInstance', '$routeParams', '$window', '$location', 'action',
							function($scope, $http, $uibModalInstance, $routeParams, $window, $location, action){
	
	var params;
	
	$scope.take_params = function(){
		switch(action){
			case 'new':
				params = {
					action: action,
					t: $scope.time, 
					artist: $scope.artist, 
					album: $scope.artist, 
					track: $scope.track, 
					title: $scope.title,
					user: $scope.user
				};
				break;
			case 'list':
				params = {
					action: action,
					artist: $scope.artist, 
					album: $scope.album, 
					user: $scope.user
				};
				break;
		}

		$uibModalInstance.close(params);
	}
		
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
		
}]);


