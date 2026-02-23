import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ClickFunnelsApi implements ICredentialType {
	name = 'clickFunnelsApi';
	displayName = 'ClickFunnels API';
	documentationUrl = 'https://developers.myclickfunnels.com/reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your ClickFunnels API Token. Get it from Account Settings → API Tokens.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://accounts.myclickfunnels.com/api/v2',
			url: '/me',
		},
	};
}
