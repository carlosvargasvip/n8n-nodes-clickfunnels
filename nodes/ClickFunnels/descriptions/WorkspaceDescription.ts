import type { INodeProperties } from 'n8n-workflow';

// Team operations
export const teamOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a team by ID',
				action: 'Get a team',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many teams',
				action: 'Get many teams',
			},
		],
		default: 'getAll',
	},
];

export const teamFields: INodeProperties[] = [
	{
		displayName: 'Specific Team ID',
		name: 'specificTeamId',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of a specific team to retrieve. Leave empty to use the selected team from the dropdown above.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['team'],
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
				resource: ['team'],
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

// Workspace operations
export const workspaceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['workspace'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a workspace by ID',
				action: 'Get a workspace',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many workspaces',
				action: 'Get many workspaces',
			},
		],
		default: 'getAll',
	},
];

export const workspaceFields: INodeProperties[] = [
	{
		displayName: 'Specific Workspace ID',
		name: 'specificWorkspaceId',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['workspace'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of a specific workspace to retrieve. Leave empty to use the selected workspace from the dropdown above.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['workspace'],
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
				resource: ['workspace'],
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
