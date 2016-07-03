$(document).ready(function() {
  var search = instantsearch({
    appId: 'N1ET6L5TKZ',
    apiKey: '62d7a87aaa63342d0e4540448b53e8a5',
    indexName: 'bestbuy_data',
    searchFunction: function(helper) {
      var searchResults = $('#hits');
      if (helper.state.query === '') {
        searchResults.hide();
        return;
      }
      helper.search();
      searchResults.show();
    }
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for products...'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 8,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination-container'
    })
  );

  search.start();

  function getTemplate(templateName) {
    return document.querySelector('#' + templateName + '-template').innerHTML;
  }

});
