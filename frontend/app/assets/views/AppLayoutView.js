define(['marionette', 'jquery', 'underscore', 'backbone.radio',
  'text!./AppLayoutView.html', 'ComicCollectionView', 'FooterView'],
  function (Marionette, $, _, Radio, Template, ComicCollectionView, FooterView) {
    var template = _.template(Template);
    var pageRadio = Radio.channel('page');

    var AppLayoutView = Marionette.View.extend({
      template: template,

      regions: {
        body: '#body',
        footer: '#footer'
      },

      ui: {
        'searchBox': '.search-box'
      },

      events: {
        'keyup @ui.searchBox': 'search'
      },

      initialize: function () {
        this.currentPage = 1;
        this.list = [];
        this.inSearch = false;

        var url_string = window.location.href;
        var parts = window.location.pathname.split('/');

        if (parts.length > 1 && parts[1] == 'list') {
          var url = new URL(url_string);
          var page = url.searchParams.get("page");

          if (page) {
            this.currentPage = parseInt(page);
          }
        }

        this.listenTo(pageRadio, 'page:up', this.pageUp.bind(this));
        this.listenTo(pageRadio, 'page:down', this.pageDown.bind(this));

        $.get(window.api).done(function(response) {
          this.fetchList();
        }.bind(this));
      },

      fetchList: function () {
        $.get(window.api + 'list', { page: this.currentPage }).done(function(response) {
          this.list = response;
          this.render();
        }.bind(this));
      },

      onRender: function () {
        this.updateBodyAndFooter();
      },

      search: function () {
        setTimeout(function(){

          searchString = this.getUI('searchBox').val();
          if (searchString.length == 0) {
            this.inSearch = false;
            this.currentPage = 1;
            this.fetchList();
            return;
          }

          if (!this.inSearch) {
            this.currentPage = 1;
          }

          $.get(window.api + 'search', { search_string: searchString, page: this.currentPage }).done(function (response) {
            this.inSearch = true;
            this.list = response;
            this.updateBodyAndFooter();
          }.bind(this));
        }.bind(this), 500);
      },

      updateBodyAndFooter: function () {
        this.showChildView('footer', new FooterView({ nItems: this.list.length, page: this.currentPage }));
        this.showChildView('body', new ComicCollectionView({
          collection: new Backbone.Collection(this.list)
        }));
      },

      pageUp: function () {
        this.currentPage += 1;
        if (this.inSearch) {
          this.search();
          return;
        }

        this.fetchList();
      },

      pageDown: function () {
        this.currentPage -= 1;
        if (this.inSearch) {
          this.search();
          return;
        }

        this.fetchList();
      }
    });

    return AppLayoutView;
  });
