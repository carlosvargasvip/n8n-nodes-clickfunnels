import type { INodeProperties } from 'n8n-workflow';

export const courseLessonOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new course lesson',
				action: 'Create a course lesson',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a course lesson by ID',
				action: 'Get a course lesson',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many course lessons',
				action: 'Get many course lessons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a course lesson',
				action: 'Update a course lesson',
			},
		],
		default: 'getAll',
	},
];

export const courseLessonFields: INodeProperties[] = [
	// ----------------------------------
	//         courseLesson:create
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the course',
	},
	{
		displayName: 'Section ID',
		name: 'sectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the section to add the lesson to',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the lesson',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'The content/body of the lesson. Supports # for headings, ## for subheadings, and - for bullet lists.',
			},
			{
				displayName: 'Lesson Image ID',
				name: 'lesson_image_id',
				type: 'string',
				default: '',
				description: 'The ID of a workspace image to use for the lesson',
			},
		],
	},

	// ----------------------------------
	//         courseLesson:get
	// ----------------------------------
	{
		displayName: 'Lesson ID',
		name: 'lessonId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the lesson',
	},

	// ----------------------------------
	//         courseLesson:getAll
	// ----------------------------------
	{
		displayName: 'Section ID',
		name: 'sectionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'The ID of the section to list lessons from',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['courseLesson'],
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
				resource: ['courseLesson'],
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
	//         courseLesson:update
	// ----------------------------------
	{
		displayName: 'Lesson ID',
		name: 'lessonId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the lesson to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['courseLesson'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the lesson',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'The content/body of the lesson',
			},
		],
	},
];
