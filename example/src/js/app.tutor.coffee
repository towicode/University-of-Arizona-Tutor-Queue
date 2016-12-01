app = angular.module 'example.app.tutor', ['example.api', 'example.app.entry', 'timer']

app.controller 'EditController', ['$scope', 'Entry', ($scope, Entry) ->
    
    $scope.adminview = 0;

    $scope.manage = ->

        if $scope.isAdmin
            $scope.isAdmin = false
            return
        x = 0
        `if($scope.class_num == 123){x=2;}`
        console.log(x);
        if x is 2
            $scope.isAdmin = true;
        return true;
    $scope.error = ->
        y = false
        if `$scope.select == 4`
            y = true
        return y
    $scope.defined = ->
        x = true if $scope.select?
        y = false
        if `$scope.select != 4`
            y = true
        return x and y

    $scope.newPost = new Entry()
    $scope.save = ->
        $scope.newPost.class_num = $scope.class_num;
        $scope.newPost.question = $scope.question;
        $scope.newPost.user = $scope.user;
        $scope.newPost.active = false;
        $scope.newPost.$save().then (result) ->
            $scope.posts.push result
        .then ->
            # Reset our editor to a new blank post
            $scope.newPost = new Entry()
            $scope.class_num = ""
            $scope.user = ""
            $scope.question = " "
            $scope.select = 0

            alert "Sucessfully added to queue!"
        .then ->
            # Clear any errors
            $scope.errors = null
        , (rejection) ->
            $scope.errors = rejection.data

    $scope.posts = Entry.query()


    $scope.markActive = (post) ->
        console.log("marked active")
        post.active = true;
        post.created_time = new Date();
        post.$update();
    
    $scope.delete = (post) ->
        console.log("deleted post")
        post.$delete()
        .then ->
            # Remove it from the list on success
            idx = $scope.posts.indexOf(post)
            $scope.posts.splice(idx, 1)


    $scope.updateTime = () ->
        $scope.posts.$promise.then (results) ->
            angular.forEach results, (post) ->
                a = new Date().getTime();
                b = new Date(post.created_time).getTime();
                b = b + 600000;

                c = b-a;
                d = c / 600000;
                e = 1 - d;
                f = e * 100;

                if f > 100
                    f = 100

                post.abc = f;

    $scope.ahhh = () ->
        $scope.updateTime()

    setInterval($scope.ahhh, 1000)


    $scope.getEpoch = (post) ->

        y = new Date(post.created_time).getTime();
        if (post.active)
            y = (y + 600000)
        return y
]
