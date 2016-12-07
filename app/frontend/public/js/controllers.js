var mp4Controllers = angular.module('passportControllers', []);

mp4Controllers.controller('LoginController', ['$scope', '$http', '$location',  function($scope, $http, $location) {

    $scope.submit = function() {
        var data = {
            email: $scope.email,
            password: $scope.password
        }

        $http.post('/api/login', data)
            .success(function(data) {
                $location.path('/profile');
            }).error(function(data) {
        });
    };
}]);

mp4Controllers.controller('SignupController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.submit = function() {
        var data = {
            email: $scope.email,
            password: $scope.password
        }
        $http.post('/api/signup', data)
            .success(function(data) {
                $location.path('/profile');
        }).error(function(data) {

        });
    };
}]);

mp4Controllers.controller('ProfileController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http.get('/api/profile')
        .success(function(data) {
            $scope.email = data.user.email;
            console.log(data);
        }).error(function(data) {
            $location.path('/login');
        });

    $scope.logout = function() {
        $http.get('/api/logout')
            .success(function(data) {
                $location.path('/login');
            });
    };
}]);