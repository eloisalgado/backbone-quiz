/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        localstorage: {
            deps: ['backbone']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        localstorage: '../bower_components/backbone-localstorage/backbone.localStorage-min',
        utils: '../bower_components/utils/utils'
    }
});

require([
    'routes/router',
], function (RouterRouter) {
    var routerRouter = new RouterRouter();
});
