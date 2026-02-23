import type { IDataObject } from 'n8n-workflow';

export interface ClickFunnelsContact extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	anonymous: boolean;
	email_address: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	time_zone: string;
	uuid: string;
	unsubscribed_at: string | null;
	last_notification_email_sent_at: string | null;
	fb_url: string;
	twitter_url: string;
	instagram_url: string;
	linkedin_url: string;
	website_url: string;
	tags: ClickFunnelsTag[];
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsTag extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	color: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsOrder extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	contact_id: number;
	total_amount: string;
	currency: string;
	payment_status: string;
	fulfillment_status: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsProduct extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	description: string;
	price: string;
	currency: string;
	product_type: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsCourse extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsEnrollment extends IDataObject {
	id: number;
	public_id: string;
	course_id: number;
	contact_id: number;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsFunnel extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsPage extends IDataObject {
	id: number;
	public_id: string;
	funnel_id: number;
	name: string;
	pathname: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsWebhook extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	url: string;
	event_type_ids: number[];
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsForm extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsFormSubmission extends IDataObject {
	id: number;
	public_id: string;
	form_id: number;
	contact_id: number;
	data: IDataObject;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsImage extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	url: string;
	alt_text: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsSegment extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsTeam extends IDataObject {
	id: number;
	public_id: string;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsWorkspace extends IDataObject {
	id: number;
	public_id: string;
	team_id: number;
	name: string;
	subdomain: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsShippingProfile extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsShippingRate extends IDataObject {
	id: number;
	public_id: string;
	shipping_profile_id: number;
	name: string;
	price: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsShippingZone extends IDataObject {
	id: number;
	public_id: string;
	shipping_profile_id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface ClickFunnelsShippingPackage extends IDataObject {
	id: number;
	public_id: string;
	workspace_id: number;
	name: string;
	weight: string;
	dimensions: string;
	created_at: string;
	updated_at: string;
}
