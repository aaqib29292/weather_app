// Controllers

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

  $scope.city = cityService.city;

  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });

  $scope.submit = function() {
    $location.path("/forecast")
  }

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
