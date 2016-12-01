app = angular.module 'example.app.entry', ['example.api']

app.controller 'AppController', ['$scope', 'Entry', ($scope, Entry) ->
    $scope.photos = {}
    $scope.posts = Entry.query()

    $scope.markActive = (post) ->
        console.log("marked active")
        post.active = true;
        post.$save();
    
    $scope.delete = (post) ->
        console.log("deleted post")
        post.$delete();
]
