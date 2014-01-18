/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var QuestionModel = Backbone.Model.extend({

      localStorage: new Backbone.LocalStorage("quiz-questions"),

      defaults: {
        question: '',
        options: [],
        rightAnswer: 0,
        userAnswer: null
      },

      // Get the local data and save it on LocalStorage
      loadData: function() {
        var that = this;
        $.getJSON("scripts/questions/questions.json", function(data) {
          var values = {};
          for(var i = data.length - 1; i >= 0; i-= 1) {
            that.set(data[i]);
            that.save();
          }
        });
      }

    });

    return QuestionModel;
});
