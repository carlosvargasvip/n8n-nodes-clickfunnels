import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new webhook',
				action: 'Create a webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete a webhook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a webhook by ID',
				action: 'Get a webhook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many webhooks',
				action: 'Get many webhooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook',
				action: 'Update a webhook',
			},
		],
		default: 'getAll',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//         webhook:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the webhook',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'https://example.com/webhook',
		description: 'URL to send webhook payloads to',
	},
	{
		displayName: 'Event Types',
		name: 'eventTypeIds',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Contact Created', value: 'contact.created' },
			{ name: 'Contact Updated', value: 'contact.updated' },
			{ name: 'Contact Deleted', value: 'contact.deleted' },
			{ name: 'Order Created', value: 'order.created' },
			{ name: 'Order Updated', value: 'order.updated' },
			{ name: 'Form Submitted', value: 'form.submitted' },
			{ name: 'Enrollment Created', value: 'enrollment.created' },
		],
		default: [],
		description: 'Event types to subscribe to',
	},

	// ----------------------------------
	//         webhook:get/delete
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the webhook',
	},

	// ----------------------------------
	//         webhook:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         webhook:update
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the webhook to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the webhook',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'URL to send webhook payloads to',
			},
			{
				displayName: 'Event Types',
				name: 'eventTypeIds',
				type: 'multiOptions',
				options: [
					{ name: 'Contact Created', value: 'contact.created' },
					{ name: 'Contact Updated', value: 'contact.updated' },
					{ name: 'Contact Deleted', value: 'contact.deleted' },
					{ name: 'Order Created', value: 'order.created' },
					{ name: 'Order Updated', value: 'order.updated' },
					{ name: 'Form Submitted', value: 'form.submitted' },
					{ name: 'Enrollment Created', value: 'enrollment.created' },
				],
				default: [],
				description: 'Event types to subscribe to',
			},
		],
	},
];
