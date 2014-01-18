/*global define*/

define([
    'underscore',
    'backbone',
    'models/QuestionModel'
], function (_, Backbone, QuestionModel) {
    'use strict';

    var QuestioncollectionCollection = Backbone.Collection.extend({
        
        model: QuestionModel,

        localStorage: new Backbone.LocalStorage("quiz-questions"),

        comparator: 'id'
    });

    return QuestioncollectionCollection;
});
