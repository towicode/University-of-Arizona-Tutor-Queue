(function() {
  var app;

  app = angular.module('example.app.entry', ['example.api']);

  app.controller('AppController', [
    '$scope', 'Entry', function($scope, Entry) {
      $scope.photos = {};
      $scope.posts = Entry.query();
      $scope.markActive = function(post) {
        console.log("marked active");
        post.active = true;
        return post.$save();
      };
      return $scope["delete"] = function(post) {
        console.log("deleted post");
        return post.$delete();
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('example.app.tutor', ['example.api', 'example.app.entry', 'timer']);

  app.controller('EditController', [
    '$scope', 'Entry', function($scope, Entry) {
      $scope.adminview = 0;
      $scope.manage = function() {
        var x;
        if ($scope.isAdmin) {
          $scope.isAdmin = false;
          return;
        }
        x = 0;
        if($scope.class_num == 123){x=2;};
        console.log(x);
        if (x === 2) {
          $scope.isAdmin = true;
        }
        return true;
      };
      $scope.error = function() {
        var y;
        y = false;
        if ($scope.select == 4) {
          y = true;
        }
        return y;
      };
      $scope.defined = function() {
        var x, y;
        if ($scope.select != null) {
          x = true;
        }
        y = false;
        if ($scope.select != 4) {
          y = true;
        }
        return x && y;
      };
      $scope.newPost = new Entry();
      $scope.save = function() {
        $scope.newPost.class_num = $scope.class_num;
        $scope.newPost.question = $scope.question;
        $scope.newPost.user = $scope.user;
        $scope.newPost.active = false;
        return $scope.newPost.$save().then(function(result) {
          return $scope.posts.push(result);
        }).then(function() {
          $scope.newPost = new Entry();
          $scope.class_num = "";
          $scope.user = "";
          $scope.question = " ";
          $scope.select = 0;
          return alert("Sucessfully added to queue!");
        }).then(function() {
          return $scope.errors = null;
        }, function(rejection) {
          return $scope.errors = rejection.data;
        });
      };
      $scope.posts = Entry.query();
      $scope.markActive = function(post) {
        console.log("marked active");
        post.active = true;
        post.created_time = new Date();
        return post.$update();
      };
      $scope["delete"] = function(post) {
        console.log("deleted post");
        return post.$delete().then(function() {
          var idx;
          idx = $scope.posts.indexOf(post);
          return $scope.posts.splice(idx, 1);
        });
      };
      $scope.updateTime = function() {
        return $scope.posts.$promise.then(function(results) {
          return angular.forEach(results, function(post) {
            var a, b, c, d, e, f;
            a = new Date().getTime();
            b = new Date(post.created_time).getTime();
            b = b + 600000;
            c = b - a;
            d = c / 600000;
            e = 1 - d;
            f = e * 100;
            if (f > 100) {
              f = 100;
            }
            return post.abc = f;
          });
        });
      };
      $scope.updatePage = function() {
        return $scope.updateTime();
      };
      $scope.refresh = function() {
        console.log("5");
        return $scope.posts = Entry.query();
      };
      setInterval($scope.updatePage, 1000);
      setInterval($scope.refresh, 5000);
      return $scope.getEpoch = function(post) {
        var y;
        y = new Date(post.created_time).getTime();
        if (post.active) {
          y = y + 600000;
        }
        return y;
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('example.api', ['ngResource']);

  app.factory('Entry', [
    '$resource', function($resource) {
      return $resource('/api/entries/:id', {
        id: '@id'
      }, {
        'update': {
          method: 'PUT'
        }
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('example.api.playground', []);

  app.factory('User', [
    '$q', function($q) {
      var MockUser, i, len, ref, storage, user, username;
      storage = {};
      MockUser = (function() {
        function MockUser(params) {
          var key, value;
          for (key in params) {
            value = params[key];
            this[key] = value;
          }
        }

        MockUser.query = function() {
          var dfr, key, val, values;
          dfr = $q.defer();
          values = (function() {
            var results;
            results = [];
            for (key in storage) {
              val = storage[key];
              results.push(val);
            }
            return results;
          })();
          dfr.resolve(values);
          values.$promise = dfr.promise;
          return values;
        };

        MockUser.save = function(params) {
          var user;
          user = new this(params);
          user.$save();
          return user;
        };

        MockUser.prototype.$save = function() {
          var dfr;
          storage[this.username] = this;
          dfr = $q.defer();
          dfr.resolve(this);
          return dfr.promise;
        };

        MockUser.prototype.$delete = function() {
          var dfr;
          delete storage[this.username];
          dfr = $q.defer();
          dfr.resolve();
          return dfr.promise;
        };

        return MockUser;

      })();
      ref = ['bob', 'sally', 'joe', 'rachel'];
      for (i = 0, len = ref.length; i < len; i++) {
        username = ref[i];
        user = new MockUser({
          username: username
        });
        storage[user.username] = user;
      }
      return MockUser;
    }
  ]);

}).call(this);
