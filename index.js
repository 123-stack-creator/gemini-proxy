export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = 'generativelanguage.googleapis.com';

    // 构建代理请求
    const modifiedRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    });

    return fetch(modifiedRequest);
  }
};
