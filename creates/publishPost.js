const { catcasterRequest } = require('../lib/request');

module.exports = {
  key: 'publish_post',
  noun: 'Post',
  display: {
    label: 'Publish Post',
    description: 'Publishes a post now via POST /api/v1/posts/:id/publish',
  },
  operation: {
    inputFields: [
      { key: 'postId', label: 'Post ID', type: 'string', required: true },
      {
        key: 'confirmationId',
        label: 'Confirmation ID',
        type: 'string',
        required: false,
        helpText: 'Required when the API returns 409 CONFIRMATION_REQUIRED',
      },
    ],
    perform: async (z, bundle) => {
      const bodyPayload = {};
      if (bundle.inputData.confirmationId) {
        bodyPayload.confirmationId = bundle.inputData.confirmationId;
      }
      const body = await catcasterRequest(z, bundle, {
        method: 'POST',
        path: `/api/v1/posts/${bundle.inputData.postId}/publish`,
        body: bodyPayload,
      });
      return body.data ?? body;
    },
    sample: { id: '00000000-0000-4000-8000-000000000010', status: 'published' },
  },
};
