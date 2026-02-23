import type { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new tag',
				action: 'Create a tag',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a tag',
				action: 'Delete a tag',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many tags',
				action: 'Get many tags',
			},
		],
		default: 'getAll',
	},
];

export const tagFields: INodeProperties[] = [
	// ----------------------------------
	//         tag:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the tag',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Blue', value: '#4A90D9' },
			{ name: 'Green', value: '#7ED321' },
			{ name: 'Yellow', value: '#F5A623' },
			{ name: 'Red', value: '#D0021B' },
			{ name: 'Purple', value: '#9013FE' },
			{ name: 'Gray', value: '#9B9B9B' },
		],
		default: '#4A90D9',
		description: 'Color of the tag',
	},

	// ----------------------------------
	//         tag:delete
	// ----------------------------------
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the tag to delete',
	},

	// ----------------------------------
	//         tag:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
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
				resource: ['tag'],
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
