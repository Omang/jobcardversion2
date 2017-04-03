(function(){
    angular.module("JobCard").service('Uregister', ['$http',function($http){
        this.register = function(request, callback){
            $http.post('api/register/register', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            })
        }
        
    }]).controller('registerController', ['$scope','$location','$window','Uregister', function($scope,$location, $window, Uregister){
        $scope.registerUser = function(){
            var request = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };
            Uregister.register(request, function(results){
                if(results.data !== undefined){
                console.log(results);
                $location.path('/');
                    
                }
            });
        }
    }]);
}())