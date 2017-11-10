var songsEvents = angular.module('songsEvents',['ngRoute','ui.bootstrap']);


songsEvents.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		controller: "indexController",
		templateUrl: "/public/index.html"
	}).when('/analysis',{
		controller: "displaySongsController",
		templateUrl: "/public/songs.html"
	}).otherwise({redirectTo: '/'});
}]);