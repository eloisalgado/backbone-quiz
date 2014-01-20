/*global define*/

define([
    'jquery',
    'backbone',
    'localstorage',
    'utils',
    'bootstrap'
], function ($, Backbone, localstorage, utils) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({

        routes: {
          // Home
          '': 'home',
          'home': 'home',
          'home/*path': 'home',

          // Question page
          'question/:questionId': 'questionPage',

          // Result page
          'result': 'resultPage',

          // Clear data
          'reset': 'clearData'
        },

        route: function(route, name, callback) {
          return Backbone.Router.prototype.route.call(this, route, name, function() {
            this.trigger.apply(this, ['beforeroute'].concat(_.toArray(arguments)));
            if (!callback) callback = this[name];
            if (callback) callback.apply(this, arguments);
            var hash = window.location.hash;
            if(hash === '') {
              hash = '#home';
            }
            utils.setBreadcumbs(hash);
          });
        },

        initialize: function() {
          Backbone.history.start({root: '#'});
          this.loadData();
        },

        // Home
        home: function() {
          var that = this;
          require(['views/HomeView'], function(HomeView) {
            var homeView = new HomeView();
            that.render(homeView);
          });
        },

        // Question page
        questionPage: function(questionId) {
          var that = this;
          require(['views/QuestionView', 'models/QuestionModel'], function(QuestionView, QuestionModel) {
            var questionView = new QuestionView({
              model: new QuestionModel({
                id: questionId
              })
            });
            that.render(questionView);
          });
        },

        // Result page
        resultPage: function() {
          var that = this;
          require(['views/ResultView', 'models/ResultModel', 'collections/QuestionCollection'], function(ResultView, ResultModel, QuestionCollection) {
            var resultView = new ResultView({
              collection: new QuestionCollection({
                model: ResultModel
              })
            });
            that.render(resultView);
          });
        },

        // Render
        render: function(view) {
          if(this.currentView) {
            this.currentView.remove();
          }
          this.currentView = view;
          view.render();
          $('#main-content').html(view.el);
        },

        // Data functions
        loadData: function() {
          require(['models/QuestionModel'], function(QuestionModel) {
            var questionModel = new QuestionModel();
            questionModel.loadData();
          });
        },

        clearData: function() {
          localStorage.clear();
          this.loadData();
          window.location.href = '#home/' + new Date().valueOf();
        }
    });

    return RouterRouter;
});
