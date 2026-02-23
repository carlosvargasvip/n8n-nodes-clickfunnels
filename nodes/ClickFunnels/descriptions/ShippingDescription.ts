import type { INodeProperties } from 'n8n-workflow';

// Shipping Profile
export const shippingProfileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['shippingProfile'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a shipping profile',
				action: 'Create a shipping profile',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shipping profile',
				action: 'Delete a shipping profile',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a shipping profile',
				action: 'Get a shipping profile',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many shipping profiles',
				action: 'Get many shipping profiles',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a shipping profile',
				action: 'Update a shipping profile',
			},
		],
		default: 'getAll',
	},
];

export const shippingProfileFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingProfile'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the shipping profile',
	},
	{
		displayName: 'Shipping Profile ID',
		name: 'shippingProfileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingProfile'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the shipping profile',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['shippingProfile'],
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
				resource: ['shippingProfile'],
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
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['shippingProfile'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the shipping profile',
			},
		],
	},
];

// Shipping Rate
export const shippingRateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['shippingRate'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a shipping rate',
				action: 'Create a shipping rate',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shipping rate',
				action: 'Delete a shipping rate',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a shipping rate',
				action: 'Get a shipping rate',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many shipping rates',
				action: 'Get many shipping rates',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a shipping rate',
				action: 'Update a shipping rate',
			},
		],
		default: 'getAll',
	},
];

export const shippingRateFields: INodeProperties[] = [
	{
		displayName: 'Shipping Zone ID',
		name: 'shippingZoneId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingRate'],
				operation: ['create', 'getAll'],
			},
		},
		default: '',
		description: 'The ID of the shipping zone',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingRate'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the shipping rate',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingRate'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Price of the shipping rate',
	},
	{
		displayName: 'Shipping Rate ID',
		name: 'shippingRateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingRate'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the shipping rate',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['shippingRate'],
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
				resource: ['shippingRate'],
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
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['shippingRate'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the shipping rate',
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Price of the shipping rate',
			},
		],
	},
];

// Shipping Zone
export const shippingZoneOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['shippingZone'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a shipping zone',
				action: 'Create a shipping zone',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shipping zone',
				action: 'Delete a shipping zone',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a shipping zone',
				action: 'Get a shipping zone',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many shipping zones',
				action: 'Get many shipping zones',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a shipping zone',
				action: 'Update a shipping zone',
			},
		],
		default: 'getAll',
	},
];

export const shippingZoneFields: INodeProperties[] = [
	{
		displayName: 'Shipping Profile ID',
		name: 'shippingProfileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingZone'],
				operation: ['create', 'getAll'],
			},
		},
		default: '',
		description: 'The ID of the shipping profile',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingZone'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the shipping zone',
	},
	{
		displayName: 'Shipping Zone ID',
		name: 'shippingZoneId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingZone'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the shipping zone',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['shippingZone'],
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
				resource: ['shippingZone'],
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
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['shippingZone'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the shipping zone',
			},
		],
	},
];

// Shipping Package
export const shippingPackageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['shippingPackage'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a shipping package',
				action: 'Create a shipping package',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a shipping package',
				action: 'Delete a shipping package',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a shipping package',
				action: 'Get a shipping package',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many shipping packages',
				action: 'Get many shipping packages',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a shipping package',
				action: 'Update a shipping package',
			},
		],
		default: 'getAll',
	},
];

export const shippingPackageFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingPackage'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the shipping package',
	},
	{
		displayName: 'Shipping Package ID',
		name: 'shippingPackageId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['shippingPackage'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: '',
		description: 'The ID of the shipping package',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['shippingPackage'],
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
				resource: ['shippingPackage'],
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
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['shippingPackage'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the shipping package',
			},
		],
	},
];
