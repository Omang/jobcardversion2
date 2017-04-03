(function(){
    angular.module("JobCard").service('dashboard', ['$http','Upload', function($http, Upload){
        this.profile = function(request, callback){
         Upload.upload({
             method: 'POST',
             url: 'secure-api/edit/profile',
             data: {
                 userid: request.userid,
                 bio: request.bio,
                 token: request.payload
             },
             file: request.file
         }).progress(function(evt){
             console.log("we are updating");
         }).then(function(response){
             return callback(response);
         }).catch(function(error){
             return callback(error);
         });
        }
        this.getprofile = function(request, callback){
            $http.post('api/get/profile', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            });
        }
        this.createCv = function(request, callback){
            $http.post('api/create/cv', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            });
        }
        this.cvCheck = function(request, callback){
            $http.post('api/check/cv', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            });
        }
        this.createJob = function(request, callback){
            $http.post('api/create/job', request).then(function(response){
                return callback(response);
            }).catch(function(error){
                return callback(error);
            });
        }
        this.checkJob = function(requestjob, callback){
            $http.post('api/check/job', requestjob).then(function(response){
                return callback(response.data);
            }).catch(function(error){
                return callback(error);
            })
        }
        
    }]).controller('dashboard', ['$scope','$location','$interpolate','$stateParams','dashboard','$state',  function($scope, $location,$interpolate, $stateParams, dashboard, $state){
        $scope.loggedIn = true;
        if(localStorage['User-Data'] !== undefined){
         var con = '';
        var payload = $stateParams.a;
            $scope.b = payload;
        $scope.url = $interpolate('dashboard.cvview/{{b}}')($scope);
        
        var user = JSON.parse(localStorage['User-Data']);
        $scope.username = user.username;
        var userid = user.userid;
        
        $scope.education = ['Science','Agriculture','Information Technology', 'Civil Works', 'Home Labor'];
        $scope.qulification = ['Master-Degree', 'Degree', 'advanced-Diploma', 'Diploma', 'Certificate', 'others'];
        $scope.districts = ['Gantsi', 'Chobe', 'Central', 'North-east', 'South-east', 'Kweneng', 'Borolong', 'Ngwaketsi', 'Kgatleng'];
            
            checkimge(userid);
            checkcv(userid);
            checkjob(userid);
            
         function checkjob(userid){
             var requestjob = {
               userid: userid  
             };
             dashboard.checkJob(requestjob, function(results){
                 console.log(results);
                 if(results !== undefined){
                     for(var i =0; i<results.length; i++){
                         var dataitems = [];
                         var views = results[i].cardviews;
                         var likes = results[i].likeusers;
                         
                         var viewslen = views.length;
                         var likelen = likes.length;
                         dataitems.push(viewslen);
                         dataitems.push(likelen);
                          $scope.jobcards = results;
                     $scope.cards = true;
                     $scope.labels = ["jobcard views", "jobcard likes"];
                     $scope.data = dataitems;
                     }
                    
                         
                 }else{
                     $scope.cards = false;
                 }
             });
         }
         function checkimge(userid){
            var request = {
              userid: userid  
            };
            dashboard.getprofile(request, function(result){
                var bio = result.data.bio;
                if(bio){
                    console.log(bio);
                   $scope.data = false; 
                    $scope.profileimg = result.data.profileImg;
                }else{
                $scope.data = true;
                }
            });
             
        }
        function checkcv(userid){
            var cvcheck = {
                userid: userid
            };
            dashboard.cvCheck(cvcheck, function(result){
                 
                if(result.data !== null){
                    $scope.tas = true;
                    $scope.showcv = true;
                }else{
                    $scope.tas = false;
                    $scope.showcv = false;
                }
            });
        }
        
        $scope.toMain = function(url){
            
            $location.path(url);
        }
        
        $scope.logout = function(){
            localStorage.clear();
            $scope.loggedIn = false;
           $location.path('/');
        
        }
        $scope.updateprofile = function(){
            var newfile = $scope.file;
            var request = {
               file: newfile,
                userid: user.userid,
                bio: $scope.bio,
                payload: payload
            };
            console.log(request);
            dashboard.profile(request, function(results){
                if(results.data !== undefined){
                    
                console.log(results.data);
                }
            });
            
        }
        $scope.cvcreate = function(){
            var request = {
                userid: userid,
                firstname: $scope.cv.fname,
                lastname: $scope.cv.lname,
                gender: $scope.cv.gender,
                email: $scope.cv.email,
                skilldes: $scope.cv.Sdes,
                expdes: $scope.cv.Edes,
                education: $scope.cv.education,
                district: $scope.cv.district,
                qulification: $scope.cv.qulification
            };
            dashboard.createCv(request, function(results){
                 //$state.go('dashboard');
                 $location.path('/dashboard');
                   $state.reload(); 
                 
                 
            });
            
        }
        $scope.tojob = function(){
            
            $location.path('/dashboard.jobmanagement');
        }
        
        $scope.createjob = function(){
            var request = {
              userid: userid,
              jobtitle: $scope.job.title,
              qulification: $scope.job.qulification,
              aboutjob: $scope.job.stuff,
              jobdate: $scope.job.datemow,
              education: $scope.job.education,
              district: $scope.job.district
            };
            console.log(request);
            dashboard.createJob(request, function(items){
               if(items){
                   $location.path('/dashboard');
                   $state.reload(); 
                   
               }
            });
        }
        
        $scope.status = {
          isopen: false  
        };
            $scope.Status = {
          isopen: false  
        };
            $scope.sTatus = {
          isopen: false  
        };
        
        }else{
            $location.path('/');
        }
    }]).directive('likeItems', function(){
        return {
            restrict: 'A',
            scope: {
                ngModel: '^ngModel'
            }
               
        };
    });
}())