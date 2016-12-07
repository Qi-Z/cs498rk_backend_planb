var app = angular.module('passport', ['ngRoute', 'passportControllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupController'
  }).
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'ProfileController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
