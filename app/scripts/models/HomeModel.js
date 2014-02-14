/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var HomeModel = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage("user-info"),

        defaults: {
          user: {
            name: '',
            email: ''
          }
        },

        initialize: function() {
          this.fetch();
        },

        setFields: function(name, email) {
          this.user = {
            name: name,
            email: email
          };
        },

        getUsername: function() {
          var user = this.get('user');
          return user.name;
        },

        getEmail: function() {
          var user = this.get('user');
          return user.email;
        },

        saveInfo: function(callback) {
          this.save(
            {
              user: this.user
            }
          );
          if(typeof callback === 'function') {
            callback();
          }
        }
    });

    return HomeModel;
});
