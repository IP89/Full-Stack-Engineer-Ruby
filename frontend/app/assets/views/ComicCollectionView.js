define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'ComicView'],
function ($, _, Backbone, Marionette, Radio, ComicView) {
  var ComicCollectionView = Marionette.CollectionView.extend({
    className: 'card-collection',
    childView: ComicView
  });

  return ComicCollectionView;
});
