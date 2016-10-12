(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function WeatherFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };

        return service;

        ////////////////

        function getWeather(weatherData) {

            var defer = $q.defer();
            var URL = 'http://api.openweathermap.org/data/2.5/weather' 
        	
        	return $http({
                method: 'GET',
                url: URL,
                params: {
                   q: weatherData,
                  mode: 'json',
                  units: 'imperial',
                  cnt: '7',
                  appid: 'bb283509fd266837c2e373c443347c3c'
                }
            }).then(function(response){
               
               if (typeof response.data === 'object') {
                defer.resolve(response);

                toastr.options = {preventDuplicates: true,
                                    closeButton: true,  
                                     "showDuration": "300", 
                                     "hideDuration": "100", 
                                     "timeOut": "1000", 
                                     "extendedTimeOut": "900",};

                toastr.success("Successfully got weather data!");

                return response.data;

               } else {
                defer.reject('no data found in file');
                toastr.error("This is broken!");
               }
            },
            function(error){
                    defer.reject(error);
                    toastr.error("This is broken!");
            });   
        };
    }
})();

// BV,SA, EP, VZ
