const zapier = require('zapier-platform-core');
const authentication = require('./authentication');
const { postPublished, postFailed } = require('./triggers/postLifecycleHook');
const createDraft = require('./creates/createDraft');
const publishPost = require('./creates/publishPost');

const addAuthHeader = (request, z, bundle) => {
  if (bundle.authData?.apiKey) {
    request.headers = request.headers || {};
    request.headers.Authorization = `Bearer ${bundle.authData.apiKey}`;
  }
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  authentication,
  beforeRequest: [addAuthHeader],
  triggers: {
    [postPublished.key]: postPublished,
    [postFailed.key]: postFailed,
  },
  creates: {
    [createDraft.key]: createDraft,
    [publishPost.key]: publishPost,
  },
};
