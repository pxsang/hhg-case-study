const BASE_URL = 'https://60c03057b8d3670017554728.mockapi.io/api/v1';

const serialize = function(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

const _sendRequest = (url: string, data: any, method: string) => {
  const ajax = () => {
    const sendRequest = () => {
      const defaultOptions = {
        method,
      };

      let options;

      let queryString = '';
      if (method === 'GET') {
        queryString = data ? '?' + serialize(data) : '';
      } else {
        options = {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }

      return fetch(BASE_URL + url + queryString, { ...defaultOptions, ...options })
        .then(response => {
          if (!response.ok) {
            // throw new Error("Bad response from server");
            return response.json().then(error => Promise.reject(error));
          }
          return response;
        })
        .then(response => {
          return response.json();
        })
        .then(json => {
          return json;
        });
    };

    return sendRequest().then(
      success => {
        return success;
      },
      error => {
        return Promise.reject(error);
      },
    );
  };

  return ajax();
}

class Api {
  static get(url: string, data?: any) {
    return _sendRequest(
      url,
      data,
      'GET',
    );
  }

  static post(url: string, data?: any) {
    return _sendRequest(
      url,
      data,
      'POST',
    );
  }

  static put(url: string, data?: any) {
    return _sendRequest(
      url,
      data,
      'PUT',
    );
  }
}

export default Api;