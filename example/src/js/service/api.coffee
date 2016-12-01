app = angular.module 'example.api', ['ngResource']

app.factory 'Entry', ['$resource', ($resource) ->
    $resource '/api/entries/:id', id: '@id', {
    	'update': { method:'PUT' }
    }
]


