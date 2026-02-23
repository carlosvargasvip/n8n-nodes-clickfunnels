import type { INodeProperties } from 'n8n-workflow';

export const imageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new image',
				action: 'Create an image',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an image',
				action: 'Delete an image',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an image by ID',
				action: 'Get an image',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many images',
				action: 'Get many images',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an image',
				action: 'Update an image',
			},
		],
		default: 'getAll',
	},
];

export const imageFields: INodeProperties[] = [
	// ----------------------------------
	//         image:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the image',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'https://example.com/image.jpg',
		description: 'URL of the image',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Alt Text',
				name: 'alt_text',
				type: 'string',
				default: '',
				description: 'Alt text for the image',
			},
		],
	},

	// ----------------------------------
	//         image:get/delete
	// ----------------------------------
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the image',
	},

	// ----------------------------------
	//         image:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['image'],
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
				resource: ['image'],
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
	//         image:update
	// ----------------------------------
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the image to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the image',
			},
			{
				displayName: 'Alt Text',
				name: 'alt_text',
				type: 'string',
				default: '',
				description: 'Alt text for the image',
			},
		],
	},
];
