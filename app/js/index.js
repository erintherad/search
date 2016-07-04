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
    instantsearch.widgets.hierarchicalMenu({
      container: '#hierarchical-categories',
      collapsible: {
        collapsed: true
      },
      attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
      templates: {
        header: 'Hierarchical categories'
      }
    })
  );
  
  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#brands',
      attributeName: 'brand',
      operator: 'or',
      limit: 10,
      templates: {
        header: 'Brands'
      },
      collapsible: {
        collapsed: true
      }
    })
  );
  
  search.addWidget(
    instantsearch.widgets.priceRanges({
      container: '#price',
      attributeName: 'price',
      labels: {
        currency: '$',
        separator: 'to',
        button: 'Go'
      },
      templates: {
        header: 'Price'
      },
      collapsible: {
        collapsed: true
      }
    })
  );
  
  search.addWidget(
    instantsearch.widgets.clearAll({
      container: '#clear-all',
      templates: {
        link: 'Reset everything'
      },
      autoHideContainer: false
    })
  );
  
  search.addWidget(
    instantsearch.widgets.sortBySelector({
      container: '#sort-by-container',
      indices: [
        {name: 'bestbuy_data', label: 'Most relevant'},
        {name: 'bestbuy_data_price_asc', label: 'Lowest price'},
        {name: 'bestbuy_data_price_desc', label: 'Highest price'}
      ]
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
