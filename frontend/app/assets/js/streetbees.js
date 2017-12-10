requirejs.config({
  paths: {
    'jquery': './vendors/jquery-3.1.1.min',
    'underscore': './vendors/underscore.min',
    'backbone': './vendors/backbone.min',
    'backbone.radio': './vendors/backbone.radio.min',
    'marionette': './vendors/backbone.marionette.min',
    'underscore': './vendors/underscore.min',
    'text': './vendors/text',
    'AppLayoutView': '../views/AppLayoutView',
    'ComicCollectionView': '../views/ComicCollectionView',
    'ComicView': '../views/ComicView',
    'FooterView': '../views/FooterView'
  }
});

define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'AppLayoutView'],
function ($, _, Backbone, Marionette, Radio, AppLayoutView) {
  var StreetBees = Marionette.Application.extend({
    region: 'body',
    onStart: function () {
      this.showView(new AppLayoutView());
    }
  });

  var streetbees = new StreetBees();
  streetbees.start();
});
