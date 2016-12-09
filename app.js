// Module

var weatherApp = angular.module('weatherApp', ["ngResource", "ngRoute"]);


// Routes

weatherApp.config(function ($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'homeController'
  })
  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })
});


// Services

weatherApp.service('cityService', function() {
  this.city = "Hyderabad, IN"
})

// Controllers

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  })

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource,$routeParams, cityService) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || '2';

  var url = "http://api.openweathermap.org/data/2.5/forecast/daily";

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, APPID: "97ed8fa956996cbe65121c37c13f329f"});

  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  }

  $scope.convertToCelsius = function (degKelvin) {
    return parseFloat(degKelvin - 273.15).toFixed(2);
  }

}]);

// Directives

weatherApp.directive("weatherReport", function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      weatherDay: "=",
      convertToStandard: "&",
      convertToDate: "&",
      dateFormat:"@"
    }
  }
});
