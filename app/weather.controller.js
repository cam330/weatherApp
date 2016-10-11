(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$http', 'WeatherFactory'];

    /* @ngInject */
    function WeatherController($http, WeatherFactory) {

        var vm = this;
        vm.title = 'WeatherController';
        vm.searchedArray = [];

        activate();

        ////////////////

        function activate() {

            $.get("http://ipinfo.io", function(response) {
                
                WeatherFactory.getWeather(response.city).then(function(result){
                vm.weather = result;
                })

            }, "jsonp");
        }

        vm.cityName = function(name){

            WeatherFactory.getWeather(name).then(function(result){
                
                vm.weather = result;
                vm.searchedArray.push({'name' : vm.weather.name, 'time' : vm.weather.dt});
           
                if(vm.weather.weather[0].main === "Rain"){
                    toastr.info("Today you might want to bring an umbrella");
                } else if (vm.weather.main.temp > 80){
                    toastr.warning("Today you might want to wear sunscreen");
                }
            },
            function(error) {
                toastr.error('There was a problem: ' +error.data);
            }) 
        } 
    }
})();