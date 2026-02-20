// channel.types.ts

export interface ComplaintType {
  value: string;
  enabled: boolean;
  label: string;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'textarea';
}

export interface ComplaintCategory {
  label: string;
  enabled: boolean;
  complaints: ComplaintType[];
}

export interface ComplaintCategories {
  crime: ComplaintCategory;
  service_opinion: ComplaintCategory;
  billing: ComplaintCategory;
  other: ComplaintCategory;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'textarea';
}

export interface PublicChannelConfigInactive {
  company_name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  can_receive_complaints: false;
  subscription_message: string;
}

export interface PublicChannelConfigActive {
  company_name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  form_title: string;
  welcome_message: string | null;
  confirmation_message: string | null;
  complaint_categories: ComplaintCategories;
  allow_anonymous_complaints: boolean;
  allow_file_attachments: boolean;
  max_files: number;
  max_file_size_mb: number;
  allowed_file_types: string[];
  custom_fields: CustomField[];
  can_receive_complaints: true;
  subscription_message: null;
}

export type PublicChannelConfig =
  | PublicChannelConfigActive
  | PublicChannelConfigInactive;

export type PublicChannelConfigResponse = PublicChannelConfig;