const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

export const audioService = {
  getQueue
};

function getQueue(endpoint) {
  return fetch(`${apiUrl + endpoint}`, { method: 'GET'})
    .then(result => {
      return result.json();
    })
    .then(data => {
      let queue = {
        list: data.tracks,
        index: 0
      };

      return queue;
    });
}
