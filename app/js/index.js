$(document).ready(function() {
  var client = algoliasearch('N1ET6L5TKZ', '62d7a87aaa63342d0e4540448b53e8a5'),
      index = client.initIndex('bestbuy_data'),
      $input = $('input');

  $input.keyup(function() {
    index.search($input.val(), {
      hitsPerPage: 10,
      facets: '*'
    }, searchCallback);
  }).focus();
});

function searchCallback(err, content) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(content);
}
