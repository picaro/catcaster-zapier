const { catcasterRequest } = require('../lib/request');

function buildHookTrigger({ key, label, description, eventType }) {
  return {
    key,
    noun: 'Post',
    display: { label, description },
    operation: {
      type: 'hook',
      inputFields: [
        {
          key: 'projectId',
          label: 'Project ID',
          type: 'string',
          required: true,
          helpText: 'Workspace UUID (Settings → Developer or GET /api/v1/projects)',
        },
      ],
      performSubscribe: async (z, bundle) => {
        const body = await catcasterRequest(z, bundle, {
          method: 'POST',
          path: '/api/v1/webhooks',
          body: {
            projectId: bundle.inputData.projectId,
            url: bundle.targetUrl,
            events: [eventType],
            description: `Zapier ${label}`,
          },
        });
        const endpoint = body?.data;
        if (!endpoint?.id) {
          throw new Error('Webhook registration failed');
        }
        return { id: endpoint.id, projectId: bundle.inputData.projectId };
      },
      performUnsubscribe: async (z, bundle) => {
        const { id, projectId } = bundle.subscribeData || {};
        if (!id || !projectId) return {};
        await catcasterRequest(z, bundle, {
          method: 'DELETE',
          path: `/api/v1/webhooks/${id}?projectId=${encodeURIComponent(projectId)}`,
        });
        return {};
      },
      perform: async (z, bundle) => {
        const payload = bundle.cleanedRequest || {};
        return [payload];
      },
      sample: {
        id: 'wh_evt_sample',
        type: eventType,
        createdAt: new Date().toISOString(),
        data: {
          postId: '00000000-0000-4000-8000-000000000001',
          workspaceId: '00000000-0000-4000-8000-000000000002',
          status: eventType === 'post.published' ? 'published' : 'failed',
        },
      },
    },
  };
}

module.exports = {
  postPublished: buildHookTrigger({
    key: 'post_published',
    label: 'Post Published',
    description: 'Fires when CatCaster successfully publishes a post (outbound webhook).',
    eventType: 'post.published',
  }),
  postFailed: buildHookTrigger({
    key: 'post_failed',
    label: 'Post Failed',
    description: 'Fires when a scheduled or immediate publish fails.',
    eventType: 'post.failed',
  }),
};
