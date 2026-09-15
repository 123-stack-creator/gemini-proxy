export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = 'generativelanguage.googleapis.com';

    // 构建代理认证信息
    const proxyAuth = env.PROXY_USER && env.PROXY_PASS 
      ? `Basic ${btoa(`${env.PROXY_USER}:${env.PROXY_PASS}`)}` 
      : null;

    // 设置上游代理请求
    const modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    });

    // 如果设置了住宅代理，则使用代理转发
    if (env.PROXY_HOST && env.PROXY_PORT) {
      const proxyUrl = `http://${env.PROXY_HOST}:${env.PROXY_PORT}`;
      return fetch(modifiedRequest, {
        cf: {
          proxyUrl: proxyUrl,
          proxyAuthorization: proxyAuth
        }
      });
    }

    // 未配置代理时默认直连
    return fetch(modifiedRequest);
  }
};
