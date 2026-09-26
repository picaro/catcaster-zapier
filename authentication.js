const { catcasterRequest } = require('./lib/request');

const testAuthentication = async (z, bundle) => {
  const body = await catcasterRequest(z, bundle, { method: 'GET', path: '/api/v1/projects' });
  if (!body || !Array.isArray(body.data)) {
    throw new Error('Invalid API key or base URL');
  }
  return body;
};

module.exports = {
  type: 'custom',
  test: testAuthentication,
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      required: true,
      type: 'password',
      helpText: 'Create in CatCaster Settings → Developer',
    },
    {
      key: 'baseUrl',
      label: 'Base URL',
      required: false,
      default: 'https://www.catcaster.com',
    },
  ],
  connectionLabel: '{{bundle.authData.baseUrl}}',
};
