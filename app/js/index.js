$(document).ready(function() {
  var search = instantsearch({
    appId: 'N1ET6L5TKZ',
    apiKey: '62d7a87aaa63342d0e4540448b53e8a5',
    indexName: 'bestbuy_data',
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'SEARCH FOR A PRODUCT...'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
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
        collapsed: false
      },
      attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
      templates: {
        header: 'CATEGORIES'
      },
      cssClasses: {
        list: 'category-list'
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
        header: 'BRANDS'
      },
      collapsible: {
        collapsed: true
      },
      cssClasses: {
        list: ['filter-list', 'checkbox'],
        item: 'filter-list-item'
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
        header: 'PRICE'
      },
      collapsible: {
        collapsed: true
      },
      cssClasses: {
        list: 'filter-list',
        item: 'filter-list-item',
        button: ['btn', 'btn-primary', 'btn-sm'],
        input: 'price-input'
      }
    })
  );
  
  search.addWidget(
    instantsearch.widgets.clearAll({
      container: '#clear-all',
      templates: {
        link: '<span class="glyphicon glyphicon-refresh"></span> RESET FILTERS'
      },
      autoHideContainer: false
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
