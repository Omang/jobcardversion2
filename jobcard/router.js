(function(){
    angular.module("JobCard",['ui.router', 'ui.bootstrap', 'ngFileUpload', 'chart.js','angularUtils.directives.dirPagination','shoppinpal.mobile-menu'])
                 .config(function($stateProvider, $urlRouterProvider){
                  $urlRouterProvider.otherwise('/');
                  $stateProvider.state('login', {
                      url: '/',
                      templateUrl: 'jobcard/log-in/login.html',
                      controller: 'loginController'
                  }).state('register', {
                     url: '/register',
                     templateUrl: 'jobcard/register/register.html',
                     controller: 'registerController'
                  }).state('dashboard', {
                      url: '/dashboard/:a',
                      templateUrl: 'jobcard/dashboard/dashboard.html',
                      controller: 'dashboard'
                  }).state('dashboard.jobcard', {
                      url: '/dashboard.jobcard',
                      templateUrl: 'jobcard/templates/createjob-form.html',
                      controller: 'dashboard'
                  }).state('dashboard.cv', {
                      url: '/dashboard.cv',
                      templateUrl: 'jobcard/templates/cv-form.html',
                      controller: 'dashboard'
                  }).state('dashboard.profile', {
                      url: '/dashboard.profile',
                      templateUrl: 'jobcard/templates/edit-profile.html',
                      controller: 'dashboard'
                  }).state('dashboard.jobview', {
                      url: '/dashboard.jobview',
                      templateUrl: '/jobcard/templates/job-location.html',
                      controller: 'main'
                  }).state('dashboard.cvview',{
                        url: '/dashboard.cvview',
                        templateUrl: 'jobcard/templates/main.html',
                        controller: 'main'
                  }).state('dashboard.jobmanagement', {
                      url: '/dashboard.jobmanagement',
                      templateUrl: 'jobcard/jobmanagement/job-mag.html',
                      controller: 'jobmanagement'
                  }).state('dashboard.applydash', {
                      url: '/dashboard.applydash',
                      templateUrl: 'jobcard/applydash/apply-dash.html',
                      controller: 'applydash'
                  });
    });
}())