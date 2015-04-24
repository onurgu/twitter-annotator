'use strict';

// Declare app level module which depends on filters, and services
angular.module('direnaj',
    ['direnaj.filters',
        'direnaj.services',
        'direnaj.directives',
        'direnaj.controllers']).
    config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/toolkit/test', {
//        templateUrl: 'partials/toolkit/test.html',
//        controller: 'ToolkitCtrl'});
//    $routeProvider.when('/statuses/filter/:campaign_id', {
//        templateUrl: 'partials/statuses/filter.html',
//        controller: 'StatusesFilterCtrl'});
//    $routeProvider.when('/campaigns/:campaign_id', {
//        templateUrl: 'partials/campaigns/index.html',
//        controller: 'CampaignsCtrl'});
        console.log('deneme ang');
        $routeProvider.when('/', {
            templateUrl: 'partials/homepage/index.html',
            controller: 'HomepageCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
