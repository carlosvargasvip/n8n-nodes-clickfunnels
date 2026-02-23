import type { INodeProperties } from 'n8n-workflow';

export const funnelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['funnel'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a funnel by ID',
				action: 'Get a funnel',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many funnels',
				action: 'Get many funnels',
			},
		],
		default: 'getAll',
	},
];

export const funnelFields: INodeProperties[] = [
	// ----------------------------------
	//         funnel:get
	// ----------------------------------
	{
		displayName: 'Funnel ID',
		name: 'funnelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['funnel'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the funnel',
	},

	// ----------------------------------
	//         funnel:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['funnel'],
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
				resource: ['funnel'],
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
];

// Page operations and fields
export const pageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['page'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a page by ID',
				action: 'Get a page',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many pages',
				action: 'Get many pages',
			},
		],
		default: 'getAll',
	},
];

export const pageFields: INodeProperties[] = [
	// ----------------------------------
	//         page:get
	// ----------------------------------
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the page',
	},

	// ----------------------------------
	//         page:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
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
				resource: ['page'],
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
				resource: ['page'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Funnel Pages Only',
				name: 'funnel_pages',
				type: 'boolean',
				default: false,
				description: 'Whether to only return pages that are part of funnels',
			},
		],
	},
];
