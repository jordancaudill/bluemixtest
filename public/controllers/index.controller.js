(function(angular) {
    var app = angular.module('bluemixtest', []);
    
    app.controller('IndexController', ['$scope', '$q', '$http', function($scope, $q, $http){
        
        $scope.translate = function() {
            var def = $q.defer();
            $http.post('http://localhost:6001/translate?text=' + $scope.text).success(function (response) {
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