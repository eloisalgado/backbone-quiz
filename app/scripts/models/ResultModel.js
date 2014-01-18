/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ResultModel = Backbone.Model.extend({
      localStorage: new Backbone.LocalStorage("quiz-report"),

      defaults: {
        answers: {}
      }
    });

    return ResultModel;
});
