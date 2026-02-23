import type { INodeProperties } from 'n8n-workflow';

export const courseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['course'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course by ID',
				action: 'Get a course',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many courses',
				action: 'Get many courses',
			},
		],
		default: 'getAll',
	},
];

export const courseFields: INodeProperties[] = [
	// ----------------------------------
	//         course:get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the course',
	},

	// ----------------------------------
	//         course:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['course'],
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
				resource: ['course'],
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

// Enrollment operations and fields
export const enrollmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new enrollment',
				action: 'Create an enrollment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an enrollment by ID',
				action: 'Get an enrollment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many enrollments',
				action: 'Get many enrollments',
			},
		],
		default: 'getAll',
	},
];

export const enrollmentFields: INodeProperties[] = [
	// ----------------------------------
	//         enrollment:create
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the course',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the contact to enroll',
	},

	// ----------------------------------
	//         enrollment:get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the course',
	},
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the enrollment',
	},

	// ----------------------------------
	//         enrollment:getAll
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'The ID of the course',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['enrollment'],
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
				resource: ['enrollment'],
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
