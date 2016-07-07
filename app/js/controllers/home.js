function homeController($scope, manageData) {
  'ngInject';

  $scope.thumbnails = manageData.getThumbnails();

  $scope.$on('changeCollectionData', () => {
    $scope.thumbnails = manageData.getThumbnails();
  })

  $scope.openVideo = function(index) {
    let url = manageData.obtainUrl(index);

    jQuery('iframe').attr('src', url);
  }
}

homeController.$inject = ['$scope', 'manageData'];

export default {
  name: 'homeController',
  fn: homeController
};
