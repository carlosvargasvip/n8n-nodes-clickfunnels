import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contact',
				action: 'Create a contact',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact',
				action: 'Delete a contact',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a contact by ID',
				action: 'Get a contact',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many contacts',
				action: 'Get many contacts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a contact',
				action: 'Update a contact',
			},
			{
				name: 'Upsert',
				value: 'upsert',
				description: 'Create or update a contact (matched by email)',
				action: 'Upsert a contact',
			},
			{
				name: 'Apply Tag',
				value: 'applyTag',
				description: 'Apply a tag to a contact',
				action: 'Apply tag to a contact',
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				description: 'Remove a tag from a contact',
				action: 'Remove tag from a contact',
			},
		],
		default: 'getAll',
	},
];

export const contactFields: INodeProperties[] = [
	// ----------------------------------
	//         contact:create
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email address of the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'First name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'Last name of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'Time zone of the contact (e.g., America/New_York)',
			},
			{
				displayName: 'Facebook URL',
				name: 'fb_url',
				type: 'string',
				default: '',
				description: 'Facebook profile URL',
			},
			{
				displayName: 'Twitter URL',
				name: 'twitter_url',
				type: 'string',
				default: '',
				description: 'Twitter profile URL',
			},
			{
				displayName: 'Instagram URL',
				name: 'instagram_url',
				type: 'string',
				default: '',
				description: 'Instagram profile URL',
			},
			{
				displayName: 'LinkedIn URL',
				name: 'linkedin_url',
				type: 'string',
				default: '',
				description: 'LinkedIn profile URL',
			},
			{
				displayName: 'Website URL',
				name: 'website_url',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
		],
	},

	// ----------------------------------
	//         contact:get
	// ----------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the contact',
	},

	// ----------------------------------
	//         contact:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['contact'],
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
				resource: ['contact'],
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
				resource: ['contact'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email_address',
				type: 'string',
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Tag ID',
				name: 'tag_id',
				type: 'string',
				default: '',
				description: 'Filter by tag ID',
			},
		],
	},

	// ----------------------------------
	//         contact:update
	// ----------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the contact to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email_address',
				type: 'string',
				default: '',
				description: 'Email address of the contact',
			},
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'First name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'Last name of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'Time zone of the contact',
			},
			{
				displayName: 'Facebook URL',
				name: 'fb_url',
				type: 'string',
				default: '',
				description: 'Facebook profile URL',
			},
			{
				displayName: 'Twitter URL',
				name: 'twitter_url',
				type: 'string',
				default: '',
				description: 'Twitter profile URL',
			},
			{
				displayName: 'Instagram URL',
				name: 'instagram_url',
				type: 'string',
				default: '',
				description: 'Instagram profile URL',
			},
			{
				displayName: 'LinkedIn URL',
				name: 'linkedin_url',
				type: 'string',
				default: '',
				description: 'LinkedIn profile URL',
			},
			{
				displayName: 'Website URL',
				name: 'website_url',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
		],
	},

	// ----------------------------------
	//         contact:upsert
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['upsert'],
			},
		},
		default: '',
		description: 'Email address of the contact (used to match existing contacts)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['upsert'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				description: 'First name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				description: 'Last name of the contact',
			},
			{
				displayName: 'Phone Number',
				name: 'phone_number',
				type: 'string',
				default: '',
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Time Zone',
				name: 'time_zone',
				type: 'string',
				default: '',
				description: 'Time zone of the contact (e.g., America/New_York)',
			},
			{
				displayName: 'Facebook URL',
				name: 'fb_url',
				type: 'string',
				default: '',
				description: 'Facebook profile URL',
			},
			{
				displayName: 'Twitter URL',
				name: 'twitter_url',
				type: 'string',
				default: '',
				description: 'Twitter profile URL',
			},
			{
				displayName: 'Instagram URL',
				name: 'instagram_url',
				type: 'string',
				default: '',
				description: 'Instagram profile URL',
			},
			{
				displayName: 'LinkedIn URL',
				name: 'linkedin_url',
				type: 'string',
				default: '',
				description: 'LinkedIn profile URL',
			},
			{
				displayName: 'Website URL',
				name: 'website_url',
				type: 'string',
				default: '',
				description: 'Website URL',
			},
			{
				displayName: 'Tag IDs',
				name: 'tag_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tag IDs to assign to the contact',
			},
		],
	},

	// ----------------------------------
	//         contact:applyTag/removeTag
	// ----------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['applyTag', 'removeTag'],
			},
		},
		default: '',
		description: 'The ID of the contact',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['applyTag', 'removeTag'],
			},
		},
		default: '',
		description: 'The ID of the tag to apply or remove',
	},
];
