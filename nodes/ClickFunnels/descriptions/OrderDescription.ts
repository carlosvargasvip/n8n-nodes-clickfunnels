import type { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an order by ID',
				action: 'Get an order',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many orders',
				action: 'Get many orders',
			},
		],
		default: 'getAll',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------
	//         order:get
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the order',
	},

	// ----------------------------------
	//         order:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['order'],
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
				resource: ['order'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contact_id',
				type: 'string',
				default: '',
				description: 'Filter by contact ID',
			},
			{
				displayName: 'Payment Status',
				name: 'payment_status',
				type: 'string',
				default: '',
				placeholder: 'e.g. paid, pending, failed, refunded',
				description: 'Filter by payment status',
			},
			{
				displayName: 'Fulfillment Status',
				name: 'fulfillment_status',
				type: 'string',
				default: '',
				placeholder: 'e.g. fulfilled, unfulfilled, partial',
				description: 'Filter by fulfillment status',
			},
		],
	},
];
