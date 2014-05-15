var demoAPI = angular.module('demoAPI', ['nvd3ChartDirectives']);

function mainController($scope, $http) {
  $http.get('/api/v1/users')
    .success(function(users) {
      console.log(users["total_users"])
      $scope.users = users["total_users"];
    })
    .error(function(users) {
      console.log('Error: ' + users);
    });
  $http.get('/api/v1/posts')
    .success(function(posts) {
      console.log(posts["total_posts"])
      $scope.posts = posts["total_posts"];
    })
    .error(function(posts) {
      console.log('Error: ' + posts);
    });
  $http.get('/api/v1/comments')
    .success(function(comments) {
      console.log(comments["total_comments"])
      $scope.comments = comments["total_comments"];
    })
    .error(function(comments) {
      console.log('Error: ' + comments);
    });
  $http.get('/api/v1/active')
    .success(function(active) {
      console.log(active["total_active_users"])
      $scope.active = active["total_active_users"];
    })
    .error(function(active) {
      console.log('Error: ' + active);
    });
  $http.get('/api/v1/likes')
    .success(function(likes) {
        test = []
        for (var i = 0; i < likes.length; i++) {
          test.push([likes[i]["date"],likes[i]["likes"]])
        };
        console.log(test)
      $scope.likes = [
      {
        "key" : "just_a_test" ,
        "values": test
      }
      ];
      $scope.xAxisTickFormat_Date_Format = function(){
        return function(d){
          return d3.time.format('%m-%d')(moment.unix(d).toDate());
        }
      };
    })
    .error(function(likes) {
      console.log('Error: ' + likes);
    });

  $http.get('/api/v1/foo')
    .success(function(foo) {
      console.log(foo["total_foo"])
      $scope.foo = foo["total_foo"]
      $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
      }
      $scope.yFunction = function(){
        return function(d) {
            return d.y;
        };
      }

      $scope.descriptionFunction = function(){
        return function(d){
            return d.key;
        }
      }
    })
    .error(function(foo) {
      console.log('Error: ' + foo);
    });

  $http.get('/api/v1/bar')
    .success(function(bar) {
      console.log(bar["total_bar"])
      $scope.bar = bar["total_bar"]
      $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
      }
      $scope.yFunction = function(){
        return function(d) {
            return d.y;
        };
      }

      $scope.descriptionFunction = function(){
        return function(d){
            return d.key;
        }
      }
    })
    .error(function(bar) {
      console.log('Error: ' + bar);
    });

}
