function manageData(request, $q, $rootScope) {
  'ngInject';

  let urlWatchBase = 'http://www.youtube.com/embed/';

  if (!localStorage.lastSearchs || !(JSON.parse(localStorage.lastSearchs) instanceof Array)) {
    localStorage.lastSearchs = JSON.stringify([]);
  }

  function service() {}

  service.prototype.search = function(key) {
    let deferred = $q.defer();
    let oldData = JSON.parse(localStorage.lastSearchs);

    request.get(key).then((data) => {
      oldData.unshift(data);
      localStorage.lastSearchs = JSON.stringify(oldData);
      $rootScope.$broadcast('changeCollectionData');

      deferred.resolve(data);
    }, (error) => {
      throw error;
    })

    return deferred.promise;
  }

  service.prototype.obtainUrl = function(index = 0) {
    let elements = this.getLast();
    let url = '';
    let element;

    if (elements.items) {
      url = `${urlWatchBase}${elements.items[index].id.videoId}`;
    }

    return url;
  }

  service.prototype.getThumbnails = function() {
    let element = JSON.parse(localStorage.lastSearchs)[0];
    let thumbnails = [];

    if (element) {
      thumbnails = JSON.parse(element)
                       .items
                       .map((element) => {
                         return element.snippet.thumbnails
                       })
    }

    return thumbnails;
  }

  service.prototype.getAll = function() {
    return JSON.parse(localStorage.lastSearchs);
  }

  service.prototype.getLast = function() {
    return JSON.parse(JSON.parse(localStorage.lastSearchs)[0] || "{}");
  }

  service.prototype.getLasts = function(amount) {
    if (typeof amount !== 'number') {
      throw new error('amount need be a number');
    }

    return JSON.parse(localStorage.lastSearchs).slice(0, amount - 1);
  }

  return new service();
}

export default {
  name: 'manageData',
  fn: manageData
};
