import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

interface IClickFunnelsResponse {
	body: IDataObject | IDataObject[];
	headers: {
		'pagination-next'?: string;
		link?: string;
	};
}

/**
 * Validate that a subdomain contains only safe characters (alphanumeric, hyphens)
 */
function validateSubdomain(subdomain: string): void {
	if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(subdomain)) {
		throw new Error(`Invalid workspace subdomain: "${subdomain}". Subdomain must contain only letters, numbers, and hyphens.`);
	}
}

/**
 * Validate that a resource ID is a valid numeric string
 */
export function validateId(id: string | number, resourceName: string): string {
	const idStr = String(id);
	if (!/^\d+$/.test(idStr)) {
		throw new Error(`Invalid ${resourceName} ID: "${idStr}". ID must be a numeric value.`);
	}
	return idStr;
}

/**
 * Safely parse JSON workspace data, returning id and subdomain
 */
export function parseWorkspaceData(workspaceDataStr: string): { id: number; subdomain: string } {
	let parsed: { id: number; subdomain: string };
	try {
		parsed = JSON.parse(workspaceDataStr);
	} catch {
		throw new Error('Invalid workspace selection. Please select a workspace from the dropdown.');
	}

	if (!parsed || typeof parsed.id !== 'number' || typeof parsed.subdomain !== 'string') {
		throw new Error('Invalid workspace data. Please re-select a workspace from the dropdown.');
	}

	validateSubdomain(parsed.subdomain);
	return parsed;
}

/**
 * Make an API request to ClickFunnels Accounts API
 */
export async function clickFunnelsAccountsApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: `https://accounts.myclickfunnels.com/api/v2${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'clickFunnelsApi',
			options,
		);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to ClickFunnels Accounts API with full response (including headers)
 */
async function clickFunnelsAccountsApiRequestWithHeaders(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IClickFunnelsResponse> {
	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: `https://accounts.myclickfunnels.com/api/v2${endpoint}`,
		json: true,
		resolveWithFullResponse: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'clickFunnelsApi',
			options,
		);
		return {
			body: response.body,
			headers: {
				'pagination-next': response.headers['pagination-next'],
				link: response.headers['link'],
			},
		};
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to ClickFunnels Workspace API
 */
export async function clickFunnelsApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	subdomain?: string,
): Promise<IDataObject | IDataObject[]> {
	if (!subdomain) {
		throw new Error('Workspace subdomain is required for this API call');
	}
	validateSubdomain(subdomain);

	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: `https://${subdomain}.myclickfunnels.com/api/v2${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'clickFunnelsApi',
			options,
		);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to ClickFunnels Workspace API with full response (including headers)
 */
async function clickFunnelsApiRequestWithHeaders(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	subdomain?: string,
): Promise<IClickFunnelsResponse> {
	if (!subdomain) {
		throw new Error('Workspace subdomain is required for this API call');
	}
	validateSubdomain(subdomain);

	const options: IRequestOptions = {
		method,
		body,
		qs: query,
		uri: `https://${subdomain}.myclickfunnels.com/api/v2${endpoint}`,
		json: true,
		resolveWithFullResponse: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(query).length === 0) {
		delete options.qs;
	}

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'clickFunnelsApi',
			options,
		);
		return {
			body: response.body,
			headers: {
				'pagination-next': response.headers['pagination-next'],
				link: response.headers['link'],
			},
		};
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request to ClickFunnels and return all items (handles pagination via headers)
 */
export async function clickFunnelsApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	subdomain?: string,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let nextCursor: string | undefined;

	do {
		// Add cursor to query if we have one
		const currentQuery = { ...query };
		if (nextCursor) {
			currentQuery.after = nextCursor;
		}

		const response = await clickFunnelsApiRequestWithHeaders.call(
			this,
			method,
			endpoint,
			body,
			currentQuery,
			subdomain,
		);

		// Handle different response formats
		const responseBody = response.body;
		if (Array.isArray(responseBody)) {
			returnData.push(...responseBody);
		} else if (responseBody && typeof responseBody === 'object') {
			// Single object response
			returnData.push(responseBody as IDataObject);
		}

		// Get next cursor from headers
		nextCursor = response.headers['pagination-next'];

		// Safety limit to prevent infinite loops
		if (returnData.length > 10000) {
			break;
		}
	} while (nextCursor);

	return returnData;
}

/**
 * Make a paginated request to Accounts API (handles pagination via headers)
 */
export async function clickFunnelsAccountsApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let nextCursor: string | undefined;

	do {
		// Add cursor to query if we have one
		const currentQuery = { ...query };
		if (nextCursor) {
			currentQuery.after = nextCursor;
		}

		const response = await clickFunnelsAccountsApiRequestWithHeaders.call(
			this,
			method,
			endpoint,
			body,
			currentQuery,
		);

		// Handle different response formats
		const responseBody = response.body;
		if (Array.isArray(responseBody)) {
			returnData.push(...responseBody);
		} else if (responseBody && typeof responseBody === 'object') {
			// Single object response
			returnData.push(responseBody as IDataObject);
		}

		// Get next cursor from headers
		nextCursor = response.headers['pagination-next'];

		// Safety limit to prevent infinite loops
		if (returnData.length > 10000) {
			break;
		}
	} while (nextCursor);

	return returnData;
}

/**
 * Build the workspace-scoped endpoint
 */
export function buildWorkspaceEndpoint(workspaceId: number | string, path: string): string {
	const id = validateId(workspaceId, 'workspace');
	return `/workspaces/${id}${path}`;
}
