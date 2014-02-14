/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/HomeModel',
    'text!../templates/ResultView.hbs',
    'text!../templates/Graph.hbs'
], function ($, _, Backbone, HomeModel, ResultView, Graph) {
    'use strict';

    var ResultviewView = Backbone.View.extend({

        template: Handlebars.compile(ResultView),
        graphTemplate: Handlebars.compile(Graph),

        events: {
          'click #try-again-btn': 'restartQuiz'
        },

        render: function() { 
          var that = this;
          this.collection.fetch();
          var resultObj = {
            html: '',
            correctAnswers: 0,
            totalQuestions: this.collection.models.length
          };
          _(this.collection.models).each(function(item){
            resultObj.html += that.graphTemplate(item.toJSON());
            if(item.get('rightAnswer') == item.get('userAnswer')) {
              resultObj.correctAnswers++;
            }
          }, this);

          var total = resultObj.totalQuestions > 0 ? Math.ceil((parseInt(resultObj.correctAnswers)/parseInt(resultObj.totalQuestions))*100) : 0;
          var homeModel = new HomeModel({
            id: 1
          });
          var username = homeModel.getUsername();
          resultObj.user = homeModel.get('user');
          this.$el.html(this.template(resultObj));
          this.$el.find('ul.list-group').html(resultObj.html);
          this.$el.find('div.progress-bar').css('width', total + '%');
          this.$el.find('div.progress').tooltip({
            placement: 'bottom',
            title: total + '%'
          });
          var className = '';
          if(total == 100) {
            className = 'progress-bar-success';
          }
          else if(total > 50 && total <= 75) {
            className = 'progress-bar-info';
          }
          else if(total > 25 && total <= 50) {
            className = 'progress-bar-warning';
          }
          else if(total >= 0 && total <= 25) {
            className = 'progress-bar-danger';
          }
          this.$el.find('.progress-bar').addClass(className);
        },

        restartQuiz: function() {
          window.location.href = '#home';
        }
    });

    return ResultviewView;
});
