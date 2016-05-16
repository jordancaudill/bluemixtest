(function(angular) {
    var app = angular.module('bluemixtest', []);
    
    app.controller('IndexController', ['$scope', '$q', '$http', '$location', function($scope, $q, $http, $location){
        
        $scope.translate = function() {
            var def = $q.defer();
            var host = $location.$$host+':'+$location.$$port;
            $http.post('http://' + host + '/translate?text=' + $scope.text).success(function (response) {
                //request was successful
                if (response) {
                    console.log(response);
                    $scope.translation = response.translations[0].translation;
                }
                return def.resolve(response);
            });
            return def.promise;
        };
    }]);
    
}(angular));