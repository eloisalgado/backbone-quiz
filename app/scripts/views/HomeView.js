/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/HomeModel',
    'text!../templates/HomeView.hbs'
], function ($, _, Backbone, HomeModel, HomeView) {
    'use strict';

    var HomeView = Backbone.View.extend({

        className: 'login-page',

        template: Handlebars.compile(HomeView),

        events: {
          'submit #form-login': 'submit',
          'click button.btn-danger': 'clearData'
        },

        initialize: function() {
          this.model = new HomeModel({
            id: 1
          });
        },

        // Events functions
        clearData: function() {
          window.location.href = '#reset';
        },

        // Render functions
        render: function() { 
          this.$el.html(this.template(this.model.toJSON()));
        },

        // Submit functions
        submit: function(event) {
          event.preventDefault();
          $('.messages-div').removeClass('alert alert-danger');
          var formElement = $(event.currentTarget);
          var username = formElement.find('#username');
          var email = formElement.find('#email');
          var errorMsg = '';
          if(username.val() == '') {
            errorMsg = 'Please, inform your name';
            username.focus();
          }
          else if(email.val() == '' || !this.validateEmail(email.val())) {
            errorMsg = 'Please, inform your e-mail';
            email.focus();
          }

          if(errorMsg !== '') {
            $('.messages-div').addClass('alert alert-danger').html(errorMsg);
          }
          else {
            this.model.setFields(username.val(), email.val());
            this.model.saveInfo(this.redirect);
            $('.messages-div').html('');
          }
        },

        // Other functions
        redirect: function() {
          window.location.href = '#question/1';
        },

        validateEmail: function(email) { 
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        } 

    });

    return HomeView;
});
