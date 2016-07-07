function request($http) {
  'ngInject';

  const service = {};

  service.get = function(key) {
    gapi.client.setApiKey('AIzaSyCkEWVAoWEmKPUDGFxXzSZWHHyWxsJiEXU');

    return new Promise((resolve, reject) => {
      gapi.client.load('youtube', 'v3', function() {
        let request = gapi.client.youtube.search.list({
          q: key,
          maxResults: 50,
          part: 'snippet',
          order: 'rating'
        });

        request.execute(function(response) {
          resolve(JSON.stringify(response.result));
        })
      })
    })
  }

  return service;
}

export default {
  name: 'request',
  fn: request
};
