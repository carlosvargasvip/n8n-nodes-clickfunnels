import type { INodeProperties } from 'n8n-workflow';

export const courseSectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new course section',
				action: 'Create a course section',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course section by ID',
				action: 'Get a course section',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many course sections',
				action: 'Get many course sections',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a course section',
				action: 'Update a course section',
			},
		],
		default: 'getAll',
	},
];

export const courseSectionFields: INodeProperties[] = [
	// ----------------------------------
	//         courseSection:create
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the course to add the section to',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the section',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the section',
			},
		],
	},

	// ----------------------------------
	//         courseSection:get
	// ----------------------------------
	{
		displayName: 'Section ID',
		name: 'sectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the section',
	},

	// ----------------------------------
	//         courseSection:getAll
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
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
				resource: ['courseSection'],
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
				resource: ['courseSection'],
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
	//         courseSection:update
	// ----------------------------------
	{
		displayName: 'Section ID',
		name: 'sectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the section to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['courseSection'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the section',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the section',
			},
			{
				displayName: 'Days Till Drip Access',
				name: 'days_till_drip_access',
				type: 'number',
				default: 0,
				description: 'Number of days until drip access is granted',
			},
			{
				displayName: 'Hidden From Non-Members',
				name: 'is_hidden_from_non_members',
				type: 'boolean',
				default: false,
				description: 'Whether to hide this section from non-members',
			},
		],
	},
];
