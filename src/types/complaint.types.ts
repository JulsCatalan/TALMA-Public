/**
 * Submit public complaint (request)
 */
export interface SubmitPublicComplaintData {
  complainant_type: string;
  is_anonymous: boolean;
  complainant_name?: string;
  complainant_email?: string;
  complainant_phone?: string;
  company_relationship?: string;
  category: string;
  complaint_type: string;
  title: string;
  full_description: string;
  incident_date?: string;
  incident_location?: string;
  involved_area?: string;
  involved_people?: string;
  witnesses?: string;
  evidence_description?: string;
  custom_fields?: Record<string, string>;
}

/**
 * Submit public complaint (response payload)
 */
export interface SubmitComplaintResponse {
  folio: string;
  tracking_code: string | null;
  complaint_id: string;
}
