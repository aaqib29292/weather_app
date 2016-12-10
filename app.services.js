// Services

weatherApp.service('cityService', function() {
  this.city = "Hyderabad, IN"
})

weatherApp.service('weatherService', [ '$resource', function($resource) {

  this.GetWeather = function(city, days) {

    var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

   return  weatherAPI.get({ q: city, cnt: days, APPID: "97ed8fa956996cbe65121c37c13f329f" });

  };

}])
