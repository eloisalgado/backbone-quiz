/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var HomeModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage("user-info"),

        defaults: {
          username: '',
          email: ''
        },

        initialize: function() {
          this.fetch(); 
        },

        getUsername: function() {
          return this.get('username');
        },

        getEmail: function() {
          return this.get('email');
        },

        saveInfo: function(callback) {
          this.save({
            username: this.get('username'),
            email: this.get('email')
          });
          if(typeof callback === 'function') {
            callback();
          }
        }
    });

    return HomeModel;
});
