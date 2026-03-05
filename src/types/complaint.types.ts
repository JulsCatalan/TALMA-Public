export type RecordType = 'complaint' | 'grievance' | 'suggestion';

/**
 * Submit public complaint (request)
 * record_type discrimina qué campos son requeridos
 */
interface BaseSubmitData {
  record_type: RecordType;
  complainant_type: string;
  is_anonymous: boolean;
  complainant_name?: string;
  complainant_email?: string;
  complainant_phone?: string;
  company_relationship?: string;
  title: string;
  full_description: string;
  custom_fields?: Record<string, string>;
}

interface SubmitComplaintData extends BaseSubmitData {
  record_type: 'complaint';
  category: string;
  complaint_type: string;
  incident_date?: string;
  incident_location?: string;
  involved_area?: string;
  involved_people?: string;
  witnesses?: string;
  evidence_description?: string;
}

interface SubmitSimpleData extends BaseSubmitData {
  record_type: 'grievance' | 'suggestion';
}

export type SubmitPublicComplaintData = SubmitComplaintData | SubmitSimpleData;

/**
 * Submit public complaint (response payload)
 */
export interface SubmitComplaintResponse {
  folio: string;
  tracking_code: string | null;
  complaint_id: string;
  record_type: RecordType;
}