define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'text!./FooterView.html'],
function ($, _, Backbone, Marionette, Radio, FooterViewTemplate) {
  var template = _.template(FooterViewTemplate);
  var pageRadio = Radio.channel('page');

  var FooterView = Marionette.View.extend({
    className: 'footer',
    template: template,

    ui: {
      'pageUp': '.page-up',
      'pageDown': '.page-down'
    },

    events: {
      'click @ui.pageUp': 'pageUp',
      'click @ui.pageDown': 'pageDown'
    },

    templateContext: function () {
      return {
        nItems: this.getOption('nItems'),
        page: this.getOption('page')
      };
    },

    pageUp: function () {
      if (this.getUI('pageUp').hasClass('disabled')) {
        return;
      }

      pageRadio.trigger('page:up');
    },

    pageDown: function () {
      if (this.getUI('pageDown').hasClass('disabled')) {
        return;
      }

      pageRadio.trigger('page:down');
    }
  });

  return FooterView;
});
