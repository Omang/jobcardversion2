(function(){
    angular.module("JobCard")
        .service('jobMan', ['$http', function($http){
            this.getjob = function(request, callback){
                $http.post('api/getjobs/getjobs', request).then(function(response){
                    console.log('getting there');
                    return callback(response);
                }).catch(function(error){
                    return callback(error);
                });
            }
            this.cvreview = function(request, callback){
                $http.post('api/latereview/review', request).then(function(response){
                    return callback(response);
                }).catch(function(error){
                    return callback(error);
                });
            }
            this.reviewCheck = function(request, callback){
                $http.post('api/check/review', request).then(function(response){
                    return callback(response);
                }).catch(function(error){
                    return callback(error);
                });
            }
        }]).controller('jobmanagement', ['$scope','$interval', 'jobMan', function($scope,$interval, jobMan){
             if(localStorage['User-Data'] !== undefined){
            var user = JSON.parse(localStorage['User-Data']);
            $scope.dirdata = {};
            var user_id = user.userid;
            $scope.userid = user_id;
                 jobget(user_id);
                 function jobget(user_id){
                     var request ={
                   jobid: user_id  
                 };
                 
                 jobMan.getjob(request, function(results){
                     //console.log(results);
                     if(results.data !== null || results.data !== undefined){
                         var card = results.data;
                         for(var i = 0; i < card.length; i++){
                             $scope.job_id = card[i]._id;
                             var boxcv = card[i].cvbox;
                             if(boxcv){
                                $scope.stuffout = boxcv; 
                                 for(var i = 0; i < boxcv.length; i++){
                                     console.log(boxcv[i].review);
                                     var cvforr = boxcv[i].review;
                                     if(cvforr){
                                         for(var i = 0; i < cvforr.length; i++){
                                        
                                         $scope.stuffin = boxcv;
                                         
                                         }
                                     }
                                 }
                                $scope.dropcvlength = boxcv.length;
                             }else{
                                 $scope.dropnull = false;
                             }
                         }
                     }
                 });
                 }
               
                 
             }
        }]).directive('showCard', ['jobMan',function(service){
        return{
            restrict: 'A',
            scope : {
            applycard : '=',
            jobid : '=',
            dirdata : '='
        },transclude: true,
            replace : true,
            templateUrl: 'jobcard/templates/dirtemplates/applications.html',
            link: function(scope, element, attrs){
                var job_id = scope.jobid;
                var cvowner = scope.applycard.userid;
                checkreview(job_id, cvowner);
                function checkreview(job_id, cvowner){
                    var request = {
                      jobid : job_id  
                    };
                    service.reviewCheck(request, function(results){
                        if(results !== null || results !== undefined){
                            var cvdata = results.data.cvbox;
                            //console.log(results.data.cvbox);
                            for(var i = 0; i < cvdata.length; i++){
                                if(cvowner == cvdata[i].userid){
                                    if(cvdata[i].review){
                                        var review = cvdata[i].review;
                                        for(var i =0; i < review.length; i++){
                                            var con = review[i].jobid;
                                            
                                       scope.savedcv = true;
                                       //scope.dirdata = cvdata;
                                       console.log(cvdata);
                                            
                                        }
                                       scope.$emit("cvdata", cvdata); 
                                    }
                                }
                            }
                        }
                    });
                }
                scope.cvSave = function(){
                 //console.log("shit have just been clicked");
                 var request = {
                     cvdata : scope.applycard.userid,
                     job_id : scope.jobid
                 }
                 console.log(request);
                 service.cvreview(request, function(results){
                     //console.log(results);
                     scope.savedcv = true;
                 });
                }
                
            }
        }
    }]).directive('cvReview', ['jobMan',function(service){
        return {
            restrict : 'A',
            //require : 'showCard',
            scope : {
                cvs : '=',
                jobid : '='
            },
            transclude : true,
            replace : true,
            templateUrl: 'jobcard/templates/dirtemplates/cvnxtstep.html',
            link : function(scope, element, attrs){
                 
               
            }
            
        }
    }]);
}())