const { catcasterRequest } = require('../lib/request');

module.exports = {
  key: 'create_draft',
  noun: 'Draft',
  display: {
    label: 'Create Draft',
    description: 'Creates a draft post via POST /api/v1/drafts',
  },
  operation: {
    inputFields: [
      { key: 'projectId', label: 'Project ID', type: 'string', required: true },
      { key: 'content', label: 'Content', type: 'text', required: true },
      {
        key: 'channelIds',
        label: 'Channel IDs',
        type: 'string',
        required: false,
        helpText: 'Comma-separated channel UUIDs (optional if set in body JSON)',
      },
      {
        key: 'bodyJson',
        label: 'Extra body (JSON)',
        type: 'text',
        required: false,
        helpText: 'Optional additional fields merged into the draft payload',
      },
    ],
    perform: async (z, bundle) => {
      let extra = {};
      if (bundle.inputData.bodyJson) {
        extra = JSON.parse(bundle.inputData.bodyJson);
      }
      const channel_ids = bundle.inputData.channelIds
        ? bundle.inputData.channelIds.split(',').map((s) => s.trim()).filter(Boolean)
        : extra.channel_ids;

      const payload = {
        projectId: bundle.inputData.projectId,
        content: bundle.inputData.content,
        ...extra,
      };
      if (channel_ids?.length) payload.channel_ids = channel_ids;

      const body = await catcasterRequest(z, bundle, {
        method: 'POST',
        path: '/api/v1/drafts',
        body: payload,
      });
      return body.data ?? body;
    },
    sample: {
      id: '00000000-0000-4000-8000-000000000010',
      status: 'draft',
    },
  },
};
