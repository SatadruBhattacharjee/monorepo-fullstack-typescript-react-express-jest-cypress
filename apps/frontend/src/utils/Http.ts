const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: 'get' }
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: 'post',
    headers: requestHeaders,
    body: JSON.stringify(body)
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};
