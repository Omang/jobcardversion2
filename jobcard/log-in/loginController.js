(function(){
    angular.module("JobCard").service('login',['$http','$window',function($http, $window){
        this.logIn = function(request, callback){
            $http.post('api/login/login', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            });
        } 
        this.saveToken = function(token, callback){
              var payload = token.split('.')[1];
              payload = $window.atob(payload);
              payload = JSON.parse(payload);
              
              return callback(payload);
        };
        
        
        
        
    }]).controller('loginController', ['$scope','$window','$location', '$interpolate' ,'login', function($scope, $window, $location, $interpolate, login){
        $scope.logUser = function(){
            var request = {
                username: $scope.username,
                password: $scope.password
            }
            login.logIn(request, function(results){
                var token = results.data.msg;
                if(token == "wrong password" || token == "user not found"){
                    console.log('wrong details try again');
                }else{
                   var paywox = results.data;
                    $scope.a = paywox;
                    var url = $interpolate('dashboard/{{a}}')($scope);
                    console.log(url);
                    login.saveToken(paywox, function(res){
                        console.log(res);
                        localStorage.setItem('User-Data', JSON.stringify(res));
                       $location.path(url);
                    });
                }
            });
        }
    }]);
}())