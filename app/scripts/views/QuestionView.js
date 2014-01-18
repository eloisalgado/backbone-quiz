/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var QuestionView = Backbone.View.extend({

      template: JST['app/scripts/templates/QuestionView.ejs'],

      events: {
        'click #back-button': 'goBack',
        'click #next-button': 'goNext',
        'click input[type=radio]': 'checkItem'
      },

      initialize: function() {
      },

      // Events functions
      goBack: function(event) {
        var current = $(event.currentTarget);
        var previous = this.questionId == 1 ? 'home' : 'question/' + (this.questionId - 1);
        window.location.href = '#' + previous;
      },

      goNext: function(event) {
        event.preventDefault();
        var answer = this.$el.find('input[type=radio]:checked').val();
        var current = $(event.currentTarget);
        if(typeof answer !== 'undefined') {
          this.model.set('userAnswer', answer);
          this.model.save();
          var next = this.questionId == 5 ? 'result' : 'question/' + (this.questionId + 1);
          window.location.href = '#' + next;
        }
        else {
          current.tooltip('show');
        }
      },

      checkItem: function() {
        this.$el.find('#next-button').tooltip('hide');
      },

      // Render functions
      render: function() {
        this.questionId = parseInt(this.model.id);
        this.model.fetch();
        this.$el.html(this.template(this.model.toJSON()));
      }

    });

    return QuestionView;
});
