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
        handlebars: {
            exports: 'Handlebars'
        },
        handlebarsHelpers: {
            deps: ['handlebars'],
            exports: 'Helpers'
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
        text: 'libs/text/text',
        handlebars: 'libs/handlebars/handlebars-v1.3.0',
        handlebarsHelpers: 'libs/handlebars/handlebars-helpers',
        localstorage: 'libs/backbone-localstorage/backbone.localStorage-min',
        utils: 'libs/app-utils'
    }
});

require([
    'routes/router',
], function (RouterRouter) {
    var routerRouter = new RouterRouter();
});
