import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a segment by ID',
				action: 'Get a segment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many segments',
				action: 'Get many segments',
			},
		],
		default: 'getAll',
	},
];

export const segmentFields: INodeProperties[] = [
	// ----------------------------------
	//         segment:get
	// ----------------------------------
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the segment',
	},

	// ----------------------------------
	//         segment:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['segment'],
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
				resource: ['segment'],
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
