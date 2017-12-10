define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'text!./ComicView.html'],
function ($, _, Backbone, Marionette, Radio, ComicViewTemplate) {
  var template = _.template(ComicViewTemplate);

  var ComicView = Marionette.View.extend({
    className: 'card-outer',
    template: template,

    initialize: function () {
      this.titleInfo = this.getTitleInfo();
    },

    ui: {
      'card': '.card',
      'hover': '.hover',
      'overlay': '.background-overlay',
      'info': '.title-info'
    },

    events: {
      'mouseenter': 'mouseEnter',
      'mouseleave': 'mouseLeave',
      'click': 'cardSelected'
    },

    templateContext: function () {
      return {
        favorite: this.model.get('favorite'),
        cover: this.model.get('cover'),
        titleInfo: this.titleInfo,
        marvelID: this.model.get('marvel_id')
      };
    },

    getTitleInfo: function () {
      var name = this.model.get('name');
      var parts = name.split(' ');
      var issueNumberIndex = -1;

      for (var i = 0; i < parts.length; i++) {
        if (parts[i][0] === '#') {
          issueNumberIndex = i;
          break;
        }
      }

      var issueNumber = '#1';

      if (issueNumberIndex == -1) {
        issueNumberIndex = parts.length;
      } else {
        issueNumber = parts[issueNumberIndex];
      }

      var year = parts[issueNumberIndex - 1].replace('(', '').replace(')', '');
      var title = parts.slice(0, issueNumberIndex - 1).join(' ');

      return {
        issueNumber: issueNumber,
        year: year,
        title: title
      };
    },

    mouseEnter: function () {
      this.getUI('overlay').removeClass('display-none');
      this.getUI('info').removeClass('display-none');

      if (!this.model.get('favorite')) {
        this.getUI('hover').removeClass('display-none');
      }
    },

    mouseLeave: function () {
      this.getUI('overlay').addClass('display-none');
      this.getUI('info').addClass('display-none');
      this.getUI('hover').addClass('display-none');
    },

    cardSelected: function () {
      this.model.attributes.favorite = !this.model.get('favorite');
      this.render();

      $.post(window.api + 'comic_modify', { marvel_id: this.model.get('marvel_id'), favorite: this.model.get('favorite') });
    },

  });

  return ComicView;
});
