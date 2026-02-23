import type { INodeProperties } from 'n8n-workflow';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['form'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a form by ID',
				action: 'Get a form',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many forms',
				action: 'Get many forms',
			},
		],
		default: 'getAll',
	},
];

export const formFields: INodeProperties[] = [
	// ----------------------------------
	//         form:get
	// ----------------------------------
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the form',
	},

	// ----------------------------------
	//         form:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['form'],
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
				resource: ['form'],
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

// Form Submission operations and fields
export const formSubmissionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['formSubmission'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a form submission by ID',
				action: 'Get a form submission',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many form submissions',
				action: 'Get many form submissions',
			},
		],
		default: 'getAll',
	},
];

export const formSubmissionFields: INodeProperties[] = [
	// ----------------------------------
	//         formSubmission:get
	// ----------------------------------
	{
		displayName: 'Submission ID',
		name: 'submissionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['formSubmission'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the form submission',
	},

	// ----------------------------------
	//         formSubmission:getAll
	// ----------------------------------
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['formSubmission'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'The ID of the form',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['formSubmission'],
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
				resource: ['formSubmission'],
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
