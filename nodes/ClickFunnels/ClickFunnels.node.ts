import type {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	clickFunnelsApiRequest,
	clickFunnelsApiRequestAllItems,
	clickFunnelsAccountsApiRequest,
	clickFunnelsAccountsApiRequestAllItems,
	buildWorkspaceEndpoint,
	parseWorkspaceData,
	validateId,
} from './GenericFunctions';

import {
	contactOperations,
	contactFields,
	tagOperations,
	tagFields,
	orderOperations,
	orderFields,
	productOperations,
	productFields,
	courseOperations,
	courseFields,
	courseSectionOperations,
	courseSectionFields,
	courseLessonOperations,
	courseLessonFields,
	enrollmentOperations,
	enrollmentFields,
	funnelOperations,
	funnelFields,
	pageOperations,
	pageFields,
	webhookOperations,
	webhookFields,
	formOperations,
	formFields,
	formSubmissionOperations,
	formSubmissionFields,
	imageOperations,
	imageFields,
	segmentOperations,
	segmentFields,
	shippingProfileOperations,
	shippingProfileFields,
	shippingRateOperations,
	shippingRateFields,
	shippingZoneOperations,
	shippingZoneFields,
	shippingPackageOperations,
	shippingPackageFields,
	teamOperations,
	teamFields,
	workspaceOperations,
	workspaceFields,
} from './descriptions';

export class ClickFunnels implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClickFunnels',
		name: 'clickFunnels',
		icon: 'file:clickfunnels.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ClickFunnels 2.0 API',
		defaults: {
			name: 'ClickFunnels',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clickFunnelsApi',
				required: true,
			},
		],
		properties: [
			// Team Selection (dynamic dropdown)
			{
				displayName: 'Team Name or ID',
				name: 'teamId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getTeams',
				},
				default: '',
				required: true,
				description: 'Select the team to work with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			// Workspace Selection (dynamic dropdown, depends on team)
			{
				displayName: 'Workspace Name or ID',
				name: 'workspaceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getWorkspaces',
					loadOptionsDependsOn: ['teamId'],
				},
				default: '',
				required: true,
				description: 'Select the workspace to work with. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Contact', value: 'contact' },
					{ name: 'Course', value: 'course' },
					{ name: 'Course Lesson', value: 'courseLesson' },
					{ name: 'Course Section', value: 'courseSection' },
					{ name: 'Enrollment', value: 'enrollment' },
					{ name: 'Form', value: 'form' },
					{ name: 'Form Submission', value: 'formSubmission' },
					{ name: 'Funnel', value: 'funnel' },
					{ name: 'Image', value: 'image' },
					{ name: 'Order', value: 'order' },
					{ name: 'Page', value: 'page' },
					{ name: 'Product', value: 'product' },
					{ name: 'Segment', value: 'segment' },
					{ name: 'Shipping Package', value: 'shippingPackage' },
					{ name: 'Shipping Profile', value: 'shippingProfile' },
					{ name: 'Shipping Rate', value: 'shippingRate' },
					{ name: 'Shipping Zone', value: 'shippingZone' },
					{ name: 'Tag', value: 'tag' },
					{ name: 'Team', value: 'team' },
					{ name: 'Webhook', value: 'webhook' },
					{ name: 'Workspace', value: 'workspace' },
				],
				default: 'contact',
			},
			// Operations
			...contactOperations,
			...tagOperations,
			...orderOperations,
			...productOperations,
			...courseOperations,
			...courseSectionOperations,
			...courseLessonOperations,
			...enrollmentOperations,
			...funnelOperations,
			...pageOperations,
			...webhookOperations,
			...formOperations,
			...formSubmissionOperations,
			...imageOperations,
			...segmentOperations,
			...shippingProfileOperations,
			...shippingRateOperations,
			...shippingZoneOperations,
			...shippingPackageOperations,
			...teamOperations,
			...workspaceOperations,
			// Fields
			...contactFields,
			...tagFields,
			...orderFields,
			...productFields,
			...courseFields,
			...courseSectionFields,
			...courseLessonFields,
			...enrollmentFields,
			...funnelFields,
			...pageFields,
			...webhookFields,
			...formFields,
			...formSubmissionFields,
			...imageFields,
			...segmentFields,
			...shippingProfileFields,
			...shippingRateFields,
			...shippingZoneFields,
			...shippingPackageFields,
			...teamFields,
			...workspaceFields,
		],
	};

	methods = {
		loadOptions: {
			// Load teams for dropdown
			async getTeams(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const teams = await clickFunnelsAccountsApiRequestAllItems.call(
					this,
					'GET',
					'/teams',
				);

				for (const team of teams) {
					returnData.push({
						name: team.name as string,
						value: team.id as number,
					});
				}

				return returnData;
			},

			// Load workspaces for dropdown (depends on selected team)
			async getWorkspaces(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const teamId = this.getCurrentNodeParameter('teamId') as number;

				if (!teamId) {
					return returnData;
				}

				const workspaces = await clickFunnelsAccountsApiRequestAllItems.call(
					this,
					'GET',
					`/teams/${teamId}/workspaces`,
				);

				for (const workspace of workspaces) {
					// Store both ID and subdomain in the value as JSON
					// This allows us to extract both when executing
					const valueData = {
						id: workspace.id as number,
						subdomain: workspace.subdomain as string,
					};
					returnData.push({
						name: `${workspace.name as string} (${workspace.subdomain as string})`,
						value: JSON.stringify(valueData),
					});
				}

				return returnData;
			},

			// Load tags for dropdown
			async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const workspaceDataStr = this.getCurrentNodeParameter('workspaceId') as string;

				if (!workspaceDataStr) {
					return returnData;
				}

				const { id: workspaceId, subdomain } = parseWorkspaceData(workspaceDataStr);
				const endpoint = buildWorkspaceEndpoint(workspaceId, '/tags');
				const tags = await clickFunnelsApiRequestAllItems.call(
					this,
					'GET',
					endpoint,
					{},
					{},
					subdomain,
				);

				for (const tag of tags) {
					returnData.push({
						name: tag.name as string,
						value: tag.id as number,
					});
				}

				return returnData;
			},

			// Load courses for dropdown
			async getCourses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const workspaceDataStr = this.getCurrentNodeParameter('workspaceId') as string;

				if (!workspaceDataStr) {
					return returnData;
				}

				const { id: workspaceId, subdomain } = parseWorkspaceData(workspaceDataStr);
				const endpoint = buildWorkspaceEndpoint(workspaceId, '/courses');
				const courses = await clickFunnelsApiRequestAllItems.call(
					this,
					'GET',
					endpoint,
					{},
					{},
					subdomain,
				);

				for (const course of courses) {
					returnData.push({
						name: course.name as string,
						value: course.id as number,
					});
				}

				return returnData;
			},

			// Load forms for dropdown
			async getForms(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const workspaceDataStr = this.getCurrentNodeParameter('workspaceId') as string;

				if (!workspaceDataStr) {
					return returnData;
				}

				const { id: workspaceId, subdomain } = parseWorkspaceData(workspaceDataStr);
				const endpoint = buildWorkspaceEndpoint(workspaceId, '/forms');
				const forms = await clickFunnelsApiRequestAllItems.call(
					this,
					'GET',
					endpoint,
					{},
					{},
					subdomain,
				);

				for (const form of forms) {
					returnData.push({
						name: form.name as string,
						value: form.id as number,
					});
				}

				return returnData;
			},

			// Load shipping profiles for dropdown
			async getShippingProfiles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const workspaceDataStr = this.getCurrentNodeParameter('workspaceId') as string;

				if (!workspaceDataStr) {
					return returnData;
				}

				const { id: workspaceId, subdomain } = parseWorkspaceData(workspaceDataStr);
				const endpoint = buildWorkspaceEndpoint(workspaceId, '/shipping/profiles');
				const profiles = await clickFunnelsApiRequestAllItems.call(
					this,
					'GET',
					endpoint,
					{},
					{},
					subdomain,
				);

				for (const profile of profiles) {
					returnData.push({
						name: profile.name as string,
						value: profile.id as number,
					});
				}

				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get workspace info from the selected dropdown value
		const workspaceDataStr = this.getNodeParameter('workspaceId', 0) as string;
		const teamId = this.getNodeParameter('teamId', 0) as number;

		const { id: workspaceId, subdomain } = parseWorkspaceData(workspaceDataStr);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Contact operations
				if (resource === 'contact') {
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = {
							contact: {
								email_address: email,
								...additionalFields,
							},
						};
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/contacts');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/contacts/${contactId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/contacts');
						const query: IDataObject = {};
						if (filters.email_address) query['filter[email_address]'] = filters.email_address;
						if (filters.tag_id) query['filter[tag_id]'] = filters.tag_id;

						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, query, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, query, subdomain);
						}
					} else if (operation === 'update') {
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { contact: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/contacts/${contactId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/contacts/${contactId}`, {}, {}, subdomain);
					} else if (operation === 'upsert') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const contactData: IDataObject = {
							email_address: email,
							...additionalFields,
						};
						// Convert comma-separated tag_ids string to array of numbers
						if (contactData.tag_ids && typeof contactData.tag_ids === 'string') {
							contactData.tag_ids = (contactData.tag_ids as string).split(',').map((id: string) => Number(id.trim()));
						}
						const body: IDataObject = { contact: contactData };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/contacts/upsert');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'applyTag') {
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						const tagId = validateId(this.getNodeParameter('tagId', i) as string, 'tag');
						const body: IDataObject = { contacts_tag: { tag_id: tagId } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/contacts/${contactId}/applied_tags`, body, {}, subdomain);
					} else if (operation === 'removeTag') {
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						const tagId = validateId(this.getNodeParameter('tagId', i) as string, 'tag');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/contacts/${contactId}/applied_tags/${tagId}`, {}, {}, subdomain);
					}
				}

				// Tag operations
				else if (resource === 'tag') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const color = this.getNodeParameter('color', i) as string;
						const body: IDataObject = { tag: { name, color } };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/tags');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'delete') {
						const tagId = validateId(this.getNodeParameter('tagId', i) as string, 'tag');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/tags/${tagId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/tags');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Order operations
				else if (resource === 'order') {
					if (operation === 'get') {
						const orderId = validateId(this.getNodeParameter('orderId', i) as string, 'order');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/orders/${orderId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/orders');
						const query: IDataObject = {};
						if (filters.contact_id) query['filter[contact_id]'] = filters.contact_id;
						if (filters.payment_status) query['filter[payment_status]'] = filters.payment_status;
						if (filters.fulfillment_status) query['filter[fulfillment_status]'] = filters.fulfillment_status;

						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, query, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, query, subdomain);
						}
					}
				}

				// Product operations
				else if (resource === 'product') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = { product: { name, ...additionalFields } };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/products');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const productId = validateId(this.getNodeParameter('productId', i) as string, 'product');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/products/${productId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/products');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const productId = validateId(this.getNodeParameter('productId', i) as string, 'product');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { product: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/products/${productId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const productId = validateId(this.getNodeParameter('productId', i) as string, 'product');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/products/${productId}`, {}, {}, subdomain);
					}
				}

				// Course operations
				else if (resource === 'course') {
					if (operation === 'get') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/${courseId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/courses');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Course Section operations
				else if (resource === 'courseSection') {
					if (operation === 'create') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = { courses_section: { title, ...additionalFields } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/courses/${courseId}/sections`, body, {}, subdomain);
					} else if (operation === 'get') {
						const sectionId = validateId(this.getNodeParameter('sectionId', i) as string, 'section');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/sections/${sectionId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/sections`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/${courseId}/sections`, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const sectionId = validateId(this.getNodeParameter('sectionId', i) as string, 'section');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { courses_section: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/courses/sections/${sectionId}`, body, {}, subdomain);
					}
				}

				// Course Lesson operations
				else if (resource === 'courseLesson') {
					if (operation === 'create') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const sectionId = validateId(this.getNodeParameter('sectionId', i) as string, 'section');
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = { courses_lesson: { title, ...additionalFields } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/courses/sections/${sectionId}/lessons`, body, {}, subdomain);
					} else if (operation === 'get') {
						const lessonId = validateId(this.getNodeParameter('lessonId', i) as string, 'lesson');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/lessons/${lessonId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const sectionId = validateId(this.getNodeParameter('sectionId', i) as string, 'section');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/courses/sections/${sectionId}/lessons`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/sections/${sectionId}/lessons`, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const lessonId = validateId(this.getNodeParameter('lessonId', i) as string, 'lesson');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { courses_lesson: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/courses/lessons/${lessonId}`, body, {}, subdomain);
					}
				}

				// Enrollment operations
				else if (resource === 'enrollment') {
					if (operation === 'create') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const contactId = validateId(this.getNodeParameter('contactId', i) as string, 'contact');
						const body: IDataObject = { enrollment: { contact_id: contactId } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/courses/${courseId}/enrollments`, body, {}, subdomain);
					} else if (operation === 'get') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const enrollmentId = validateId(this.getNodeParameter('enrollmentId', i) as string, 'enrollment');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/enrollments/${enrollmentId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const courseId = validateId(this.getNodeParameter('courseId', i) as string, 'course');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/courses/${courseId}/enrollments`, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Funnel operations
				else if (resource === 'funnel') {
					if (operation === 'get') {
						const funnelId = validateId(this.getNodeParameter('funnelId', i) as string, 'funnel');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/funnels/${funnelId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/funnels');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Page operations
				else if (resource === 'page') {
					if (operation === 'get') {
						const pageId = validateId(this.getNodeParameter('pageId', i) as string, 'page');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/pages/${pageId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/pages');
						const query: IDataObject = {};
						if (filters.funnel_pages === true) {
							query.funnel_pages = true;
						}
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, query, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.per_page = limit;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, query, subdomain);
						}
					}
				}

				// Webhook operations
				else if (resource === 'webhook') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const url = this.getNodeParameter('url', i) as string;
						const eventTypeIds = this.getNodeParameter('eventTypeIds', i) as string[];
						const body: IDataObject = {
							webhooks_outgoing_endpoint: {
								name,
								url,
								event_type_ids: eventTypeIds,
							},
						};
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/webhooks/outgoing/endpoints');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const webhookId = validateId(this.getNodeParameter('webhookId', i) as string, 'webhook');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/webhooks/outgoing/endpoints/${webhookId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/webhooks/outgoing/endpoints');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const webhookId = validateId(this.getNodeParameter('webhookId', i) as string, 'webhook');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { webhooks_outgoing_endpoint: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/webhooks/outgoing/endpoints/${webhookId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const webhookId = validateId(this.getNodeParameter('webhookId', i) as string, 'webhook');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/webhooks/outgoing/endpoints/${webhookId}`, {}, {}, subdomain);
					}
				}

				// Form operations
				else if (resource === 'form') {
					if (operation === 'get') {
						const formId = validateId(this.getNodeParameter('formId', i) as string, 'form');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/forms/${formId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/forms');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Form Submission operations
				else if (resource === 'formSubmission') {
					if (operation === 'get') {
						const submissionId = validateId(this.getNodeParameter('submissionId', i) as string, 'submission');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/forms/submissions/${submissionId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const formId = validateId(this.getNodeParameter('formId', i) as string, 'form');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/forms/${formId}/submissions`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/forms/${formId}/submissions`, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Image operations
				else if (resource === 'image') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const url = this.getNodeParameter('url', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = { image: { name, url, ...additionalFields } };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/images');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const imageId = validateId(this.getNodeParameter('imageId', i) as string, 'image');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/images/${imageId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/images');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const imageId = validateId(this.getNodeParameter('imageId', i) as string, 'image');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { image: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/images/${imageId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const imageId = validateId(this.getNodeParameter('imageId', i) as string, 'image');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/images/${imageId}`, {}, {}, subdomain);
					}
				}

				// Segment operations
				else if (resource === 'segment') {
					if (operation === 'get') {
						const segmentId = validateId(this.getNodeParameter('segmentId', i) as string, 'segment');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/segments/${segmentId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/segments');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					}
				}

				// Shipping Profile operations
				else if (resource === 'shippingProfile') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body: IDataObject = { shipping_profile: { name } };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/shipping/profiles');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const profileId = validateId(this.getNodeParameter('shippingProfileId', i) as string, 'shipping profile');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/profiles/${profileId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/shipping/profiles');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const profileId = validateId(this.getNodeParameter('shippingProfileId', i) as string, 'shipping profile');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { shipping_profile: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/shipping/profiles/${profileId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const profileId = validateId(this.getNodeParameter('shippingProfileId', i) as string, 'shipping profile');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/shipping/profiles/${profileId}`, {}, {}, subdomain);
					}
				}

				// Shipping Rate operations
				else if (resource === 'shippingRate') {
					if (operation === 'create') {
						const zoneId = validateId(this.getNodeParameter('shippingZoneId', i) as string, 'shipping zone');
						const name = this.getNodeParameter('name', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const body: IDataObject = { shipping_rate: { name, price } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/shipping/zones/${zoneId}/rates`, body, {}, subdomain);
					} else if (operation === 'get') {
						const rateId = validateId(this.getNodeParameter('shippingRateId', i) as string, 'shipping rate');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/rates/${rateId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const zoneId = validateId(this.getNodeParameter('shippingZoneId', i) as string, 'shipping zone');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/shipping/zones/${zoneId}/rates`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/zones/${zoneId}/rates`, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const rateId = validateId(this.getNodeParameter('shippingRateId', i) as string, 'shipping rate');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { shipping_rate: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/shipping/rates/${rateId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const rateId = validateId(this.getNodeParameter('shippingRateId', i) as string, 'shipping rate');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/shipping/rates/${rateId}`, {}, {}, subdomain);
					}
				}

				// Shipping Zone operations
				else if (resource === 'shippingZone') {
					if (operation === 'create') {
						const profileId = validateId(this.getNodeParameter('shippingProfileId', i) as string, 'shipping profile');
						const name = this.getNodeParameter('name', i) as string;
						const body: IDataObject = { shipping_zone: { name } };
						responseData = await clickFunnelsApiRequest.call(this, 'POST', `/shipping/profiles/${profileId}/zones`, body, {}, subdomain);
					} else if (operation === 'get') {
						const zoneId = validateId(this.getNodeParameter('shippingZoneId', i) as string, 'shipping zone');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/zones/${zoneId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const profileId = validateId(this.getNodeParameter('shippingProfileId', i) as string, 'shipping profile');
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', `/shipping/profiles/${profileId}/zones`, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/profiles/${profileId}/zones`, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const zoneId = validateId(this.getNodeParameter('shippingZoneId', i) as string, 'shipping zone');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { shipping_zone: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/shipping/zones/${zoneId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const zoneId = validateId(this.getNodeParameter('shippingZoneId', i) as string, 'shipping zone');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/shipping/zones/${zoneId}`, {}, {}, subdomain);
					}
				}

				// Shipping Package operations
				else if (resource === 'shippingPackage') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const body: IDataObject = { shipping_package: { name } };
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/shipping/packages');
						responseData = await clickFunnelsApiRequest.call(this, 'POST', endpoint, body, {}, subdomain);
					} else if (operation === 'get') {
						const packageId = validateId(this.getNodeParameter('shippingPackageId', i) as string, 'shipping package');
						responseData = await clickFunnelsApiRequest.call(this, 'GET', `/shipping/packages/${packageId}`, {}, {}, subdomain);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = buildWorkspaceEndpoint(workspaceId, '/shipping/packages');
						if (returnAll) {
							responseData = await clickFunnelsApiRequestAllItems.call(this, 'GET', endpoint, {}, {}, subdomain);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit }, subdomain);
						}
					} else if (operation === 'update') {
						const packageId = validateId(this.getNodeParameter('shippingPackageId', i) as string, 'shipping package');
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const body: IDataObject = { shipping_package: updateFields };
						responseData = await clickFunnelsApiRequest.call(this, 'PUT', `/shipping/packages/${packageId}`, body, {}, subdomain);
					} else if (operation === 'delete') {
						const packageId = validateId(this.getNodeParameter('shippingPackageId', i) as string, 'shipping package');
						responseData = await clickFunnelsApiRequest.call(this, 'DELETE', `/shipping/packages/${packageId}`, {}, {}, subdomain);
					}
				}

				// Team operations (uses Accounts API)
				else if (resource === 'team') {
					if (operation === 'get') {
						const specificTeamId = this.getNodeParameter('specificTeamId', i, '') as string;
						const id = specificTeamId ? validateId(specificTeamId, 'team') : validateId(teamId, 'team');
						const endpoint = `/teams/${id}`;
						responseData = await clickFunnelsAccountsApiRequest.call(this, 'GET', endpoint);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const endpoint = '/teams';
						if (returnAll) {
							responseData = await clickFunnelsAccountsApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsAccountsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit });
						}
					}
				}

				// Workspace operations (uses Accounts API)
				else if (resource === 'workspace') {
					if (operation === 'get') {
						const specificWorkspaceId = this.getNodeParameter('specificWorkspaceId', i, '') as string;
						const id = specificWorkspaceId ? validateId(specificWorkspaceId, 'workspace') : validateId(workspaceId, 'workspace');
						const validTeamId = validateId(teamId, 'team');
						const endpoint = `/teams/${validTeamId}/workspaces/${id}`;
						responseData = await clickFunnelsAccountsApiRequest.call(this, 'GET', endpoint);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const validTeamId = validateId(teamId, 'team');
						const endpoint = `/teams/${validTeamId}/workspaces`;
						if (returnAll) {
							responseData = await clickFunnelsAccountsApiRequestAllItems.call(this, 'GET', endpoint);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = await clickFunnelsAccountsApiRequest.call(this, 'GET', endpoint, {}, { per_page: limit });
						}
					}
				}

				// Handle response
				if (responseData !== undefined) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
