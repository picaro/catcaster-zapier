const DEFAULT_BASE = 'https://www.catcaster.com';

function baseUrl(bundle) {
  const raw = bundle.authData.baseUrl || DEFAULT_BASE;
  return raw.replace(/\/$/, '');
}

function authHeaders(bundle) {
  return {
    Authorization: `Bearer ${bundle.authData.apiKey}`,
    Accept: 'application/json',
  };
}

async function catcasterRequest(z, bundle, { method, path, body, headers = {} }) {
  const response = await z.request({
    method,
    url: `${baseUrl(bundle)}${path}`,
    headers: { ...authHeaders(bundle), ...headers },
    body,
  });
  return response.json;
}

module.exports = { baseUrl, catcasterRequest };
