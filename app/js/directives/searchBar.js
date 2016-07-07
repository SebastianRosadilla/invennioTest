function searchBar(manageData) {
  'ngInject'

  let link = function(scope, element) {
    let jQueryElement = jQuery(element).find('input');
    scope.data = '';

    jQueryElement.keypress((event) => {
      if (event.which == 13) {
        manageData.search(scope.data).then(
          (data) => {},
          (error) => {
            throw error
          }
        )
      }
    })
  }

  return {
    restrict: 'EA',
    templateUrl: 'directives/searchBar.html',
    scope: true,
    link: link
  };
}

export default {
  name: 'searchBar',
  fn: searchBar
};
