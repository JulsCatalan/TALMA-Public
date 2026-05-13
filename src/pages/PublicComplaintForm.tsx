import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Megaphone, AlertCircle, Loader2, CheckCircle2,
  Upload, X, FileText, MessageSquare, Lightbulb
} from 'lucide-react';
import { channelApi } from '../api/channel.api';
import { complaintApi } from '../api/complaint.api';
import toast from 'react-hot-toast';

import type {
  PublicChannelConfig,
  PublicChannelConfigActive,
  ComplaintCategories,
  CustomField
} from '../types/channel.types';
import type { RecordType } from '../types/complaint.types';

/* -------------------------------------------------- */
/* i18n */
/* -------------------------------------------------- */

type Lang = 'es' | 'en';

type Translations = {
  channelNotFound: string;
  channelNotFoundDesc: string;
  channelByTalma: string;

  complaintLabel: string;
  complaintDesc: string;
  complaintSubmit: string;
  complaintSuccessTitle: string;
  complaintSuccessDefault: string;

  grievanceLabel: string;
  grievanceDesc: string;
  grievanceSubmit: string;
  grievanceSuccessTitle: string;
  grievanceSuccessDefault: string;

  suggestionLabel: string;
  suggestionDesc: string;
  suggestionSubmit: string;
  suggestionSuccessTitle: string;
  suggestionSuccessDefault: string;

  sectionRecordType: string;
  sectionIdentity: string;
  sectionDetailsPrefix: string;
  sectionCustomFields: string;
  sectionFiles: string;

  sendAnonymously: string;
  sendAnonymouslyDesc: string;
  anonymousNotice: string;
  relationshipType: string;
  selectPlaceholder: string;
  relEmployee: string;
  relSupplier: string;
  relCustomer: string;
  relExternal: string;
  relOther: string;
  fullName: string;
  phone: string;
  email: string;
  companyRelationship: string;
  companyRelationshipPh: string;

  category: string;
  selectCategoryPh: string;
  complaintType: string;
  selectTypePh: string;
  title: string;
  titlePh: string;
  description: string;
  descPhComplaint: string;
  descPhGrievance: string;
  descPhSuggestion: string;
  incidentDate: string;
  incidentLocation: string;
  incidentLocationPh: string;
  involvedArea: string;
  involvedAreaPh: string;
  involvedPeople: string;
  involvedPeoplePh: string;
  witnesses: string;
  witnessesPh: string;
  evidenceDescription: string;
  evidenceDescriptionPh: string;

  clickToSelect: string;
  maxFilesInfo: (n: number, mb: number) => string;
  maxFilesError: (n: number) => string;
  fileTooLarge: (name: string, mb: number) => string;

  uploadingFiles: string;
  processing: string;
  doNotClose: string;
  sending: string;

  titleDescRequired: string;
  categoryTypeRequired: string;
  nameEmailRequired: string;
  sendError: string;
  invalidResponse: string;

  recordConfirmed: string;
  folio: string;
  trackingCode: string;
  trackingCodeNote: string;
  channelManagedBy: string;

  confidentialChannel: string;
  footerAdminBy: (name: string) => string;
  privacyPolicy: string;
  termsConditions: string;
  poweredBy: string;
};

const translations: Record<Lang, Translations> = {
  es: {
    // Errores / estados
    channelNotFound: 'Canal no encontrado',
    channelNotFoundDesc: 'El canal que buscas no existe o ha sido eliminado. Verifica el enlace o contacta a la empresa que te lo compartió.',
    channelByTalma: 'Canal de denuncia por',

    // Record types
    complaintLabel: 'Denuncia',
    complaintDesc: 'Reporta un incidente, irregularidad o conducta indebida.',
    complaintSubmit: 'Enviar Denuncia',
    complaintSuccessTitle: 'Denuncia recibida',
    complaintSuccessDefault: 'Gracias por tu denuncia. Nuestro equipo legal revisará el caso con total confidencialidad y nos pondremos en contacto pronto.',

    grievanceLabel: 'Queja',
    grievanceDesc: 'Expresa una inconformidad sobre un servicio o trato recibido.',
    grievanceSubmit: 'Enviar Queja',
    grievanceSuccessTitle: 'Queja registrada',
    grievanceSuccessDefault: 'Hemos recibido tu queja. La revisaremos con atención y te contactaremos para darte seguimiento.',

    suggestionLabel: 'Sugerencia',
    suggestionDesc: 'Comparte ideas o propuestas para mejorar procesos.',
    suggestionSubmit: 'Enviar Sugerencia',
    suggestionSuccessTitle: 'Sugerencia recibida',
    suggestionSuccessDefault: 'Gracias por tu propuesta. La tendremos en cuenta para mejorar continuamente.',

    // Secciones
    sectionRecordType: '¿Qué deseas enviar?',
    sectionIdentity: 'Tu información',
    sectionDetailsPrefix: 'Detalles de la',
    sectionCustomFields: 'Información adicional',
    sectionFiles: 'Archivos adjuntos',

    // Identity
    sendAnonymously: 'Enviar de forma anónima',
    sendAnonymouslyDesc: 'Tu identidad será completamente confidencial.',
    anonymousNotice: 'Enviarás este registro de forma completamente anónima.',
    relationshipType: 'Tipo de relación',
    selectPlaceholder: 'Selecciona...',
    relEmployee: 'Empleado',
    relSupplier: 'Proveedor',
    relCustomer: 'Cliente',
    relExternal: 'Externo',
    relOther: 'Otro',
    fullName: 'Nombre completo',
    phone: 'Teléfono',
    email: 'Email',
    companyRelationship: 'Relación con la empresa',
    companyRelationshipPh: 'Ej: Empleado del departamento de ventas',

    // Detalles
    category: 'Categoría',
    selectCategoryPh: 'Selecciona una categoría...',
    complaintType: 'Tipo de denuncia',
    selectTypePh: 'Selecciona un tipo...',
    title: 'Título',
    titlePh: 'Resumen breve de la situación',
    description: 'Descripción',
    descPhComplaint: 'Describe con detalle lo sucedido, incluyendo fechas, lugares y personas...',
    descPhGrievance: 'Describe tu inconformidad con el mayor detalle posible...',
    descPhSuggestion: 'Describe tu propuesta o sugerencia de mejora...',
    incidentDate: 'Fecha del incidente',
    incidentLocation: 'Lugar del incidente',
    incidentLocationPh: 'Ej: Oficina central, Sucursal norte...',
    involvedArea: 'Área o departamento involucrado',
    involvedAreaPh: 'Ej: Recursos Humanos, Ventas...',
    involvedPeople: 'Personas involucradas',
    involvedPeoplePh: 'Nombres, cargos o descripciones...',
    witnesses: 'Testigos',
    witnessesPh: 'Personas que presenciaron los hechos...',
    evidenceDescription: 'Descripción de evidencia',
    evidenceDescriptionPh: 'Documentos, correos, registros u otra evidencia disponible...',

    // Files
    clickToSelect: 'Haz clic para seleccionar archivos',
    maxFilesInfo: (n: number, mb: number) => `Máx. ${n} archivos · ${mb}MB por archivo`,
    maxFilesError: (n: number) => `Máximo ${n} archivos permitidos`,
    fileTooLarge: (name: string, mb: number) => `${name} supera el tamaño máximo de ${mb}MB`,

    // Submit / progress
    uploadingFiles: 'Subiendo archivos...',
    processing: 'Procesando...',
    doNotClose: 'No cierres esta ventana hasta que el envío se complete.',
    sending: 'Enviando...',

    // Validaciones
    titleDescRequired: 'El título y la descripción son requeridos',
    categoryTypeRequired: 'La categoría y el tipo de denuncia son requeridos',
    nameEmailRequired: 'Nombre y email son requeridos',
    sendError: 'Error al enviar',
    invalidResponse: 'Respuesta inválida',

    // Success
    recordConfirmed: 'Registro confirmado',
    folio: 'Folio',
    trackingCode: 'Código de seguimiento',
    trackingCodeNote: 'Guarda este código para consultar el estado de tu registro.',
    channelManagedBy: 'Canal administrado por',

    // Footer
    confidentialChannel: 'Canal Confidencial',
    footerAdminBy: (name: string) => `Administrado por ${name} · Toda información tratada con confidencialidad`,
    privacyPolicy: 'Política de privacidad',
    termsConditions: 'Términos y condiciones',
    poweredBy: 'Powered by',
  },
  en: {
    // Errores / estados
    channelNotFound: 'Channel not found',
    channelNotFoundDesc: 'The channel you are looking for does not exist or has been removed. Please verify the link or contact the company that shared it with you.',
    channelByTalma: 'Whistleblower channel by',

    // Record types
    complaintLabel: 'Complaint',
    complaintDesc: 'Report an incident, irregularity, or misconduct.',
    complaintSubmit: 'Submit Complaint',
    complaintSuccessTitle: 'Complaint received',
    complaintSuccessDefault: 'Thank you for your complaint. Our legal team will review the case with full confidentiality and will contact you soon.',

    grievanceLabel: 'Grievance',
    grievanceDesc: 'Express a concern about a service or treatment received.',
    grievanceSubmit: 'Submit Grievance',
    grievanceSuccessTitle: 'Grievance registered',
    grievanceSuccessDefault: 'We have received your grievance. We will review it carefully and contact you for follow-up.',

    suggestionLabel: 'Suggestion',
    suggestionDesc: 'Share ideas or proposals to improve processes.',
    suggestionSubmit: 'Submit Suggestion',
    suggestionSuccessTitle: 'Suggestion received',
    suggestionSuccessDefault: 'Thank you for your proposal. We will take it into account for continuous improvement.',

    // Secciones
    sectionRecordType: 'What would you like to submit?',
    sectionIdentity: 'Your information',
    sectionDetailsPrefix: 'Details of the',
    sectionCustomFields: 'Additional information',
    sectionFiles: 'Attached files',

    // Identity
    sendAnonymously: 'Submit anonymously',
    sendAnonymouslyDesc: 'Your identity will remain completely confidential.',
    anonymousNotice: 'You will submit this record completely anonymously.',
    relationshipType: 'Relationship type',
    selectPlaceholder: 'Select...',
    relEmployee: 'Employee',
    relSupplier: 'Supplier',
    relCustomer: 'Customer',
    relExternal: 'External',
    relOther: 'Other',
    fullName: 'Full name',
    phone: 'Phone',
    email: 'Email',
    companyRelationship: 'Relationship with the company',
    companyRelationshipPh: 'E.g., Employee of the sales department',

    // Detalles
    category: 'Category',
    selectCategoryPh: 'Select a category...',
    complaintType: 'Complaint type',
    selectTypePh: 'Select a type...',
    title: 'Title',
    titlePh: 'Brief summary of the situation',
    description: 'Description',
    descPhComplaint: 'Describe in detail what happened, including dates, places, and people involved...',
    descPhGrievance: 'Describe your concern in as much detail as possible...',
    descPhSuggestion: 'Describe your proposal or improvement suggestion...',
    incidentDate: 'Incident date',
    incidentLocation: 'Incident location',
    incidentLocationPh: 'E.g., Main office, North branch...',
    involvedArea: 'Area or department involved',
    involvedAreaPh: 'E.g., Human Resources, Sales...',
    involvedPeople: 'People involved',
    involvedPeoplePh: 'Names, roles, or descriptions...',
    witnesses: 'Witnesses',
    witnessesPh: 'People who witnessed the events...',
    evidenceDescription: 'Evidence description',
    evidenceDescriptionPh: 'Documents, emails, records, or other available evidence...',

    // Files
    clickToSelect: 'Click to select files',
    maxFilesInfo: (n: number, mb: number) => `Max. ${n} files · ${mb}MB per file`,
    maxFilesError: (n: number) => `Maximum ${n} files allowed`,
    fileTooLarge: (name: string, mb: number) => `${name} exceeds the maximum size of ${mb}MB`,

    // Submit / progress
    uploadingFiles: 'Uploading files...',
    processing: 'Processing...',
    doNotClose: 'Do not close this window until the submission is complete.',
    sending: 'Sending...',

    // Validaciones
    titleDescRequired: 'Title and description are required',
    categoryTypeRequired: 'Category and complaint type are required',
    nameEmailRequired: 'Name and email are required',
    sendError: 'Submission error',
    invalidResponse: 'Invalid response',

    // Success
    recordConfirmed: 'Record confirmed',
    folio: 'Reference',
    trackingCode: 'Tracking code',
    trackingCodeNote: 'Save this code to check the status of your record.',
    channelManagedBy: 'Channel managed by',

    // Footer
    confidentialChannel: 'Confidential Channel',
    footerAdminBy: (name: string) => `Managed by ${name} · All information treated with confidentiality`,
    privacyPolicy: 'Privacy policy',
    termsConditions: 'Terms and conditions',
    poweredBy: 'Powered by',
  }
};

/* -------------------------------------------------- */
/* Type Guard */
/* -------------------------------------------------- */

function isActiveChannel(
  config: PublicChannelConfig | null
): config is PublicChannelConfigActive {
  return !!config && config.can_receive_complaints === true;
}

/* -------------------------------------------------- */
/* Record type config (sin texto, solo metadatos) */
/* -------------------------------------------------- */

const ALL_RECORD_TYPES = [
  { type: 'complaint' as RecordType, icon: FileText },
  { type: 'grievance' as RecordType, icon: MessageSquare },
  { type: 'suggestion' as RecordType, icon: Lightbulb }
] as const;

const DEFAULT_ENABLED_TYPES: RecordType[] = ['complaint', 'grievance', 'suggestion'];

function getRecordTypeTexts(type: RecordType, t: Translations) {
  switch (type) {
    case 'complaint':
      return {
        label: t.complaintLabel,
        description: t.complaintDesc,
        submitLabel: t.complaintSubmit,
        successTitle: t.complaintSuccessTitle,
        successDefault: t.complaintSuccessDefault,
      };
    case 'grievance':
      return {
        label: t.grievanceLabel,
        description: t.grievanceDesc,
        submitLabel: t.grievanceSubmit,
        successTitle: t.grievanceSuccessTitle,
        successDefault: t.grievanceSuccessDefault,
      };
    case 'suggestion':
      return {
        label: t.suggestionLabel,
        description: t.suggestionDesc,
        submitLabel: t.suggestionSubmit,
        successTitle: t.suggestionSuccessTitle,
        successDefault: t.suggestionSuccessDefault,
      };
  }
}

/* -------------------------------------------------- */
/* Límites de caracteres */
/* -------------------------------------------------- */

const CHAR_LIMITS = {
  title: 120,
  complainant_name: 100,
  company_relationship: 200,
  incident_location: 150,
  involved_area: 150,
};

/* -------------------------------------------------- */
/* UI helpers */
/* -------------------------------------------------- */

const inputCls = (disabled: boolean) =>
  `w-full px-4 py-3 border text-sm outline-none transition-colors ${
    disabled
      ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-white border-gray-300 text-gray-900 hover:border-gray-500 focus:border-gray-900'
  }`;

function CharCount({ value, max }: { value: string; max: number }) {
  const remaining = max - value.length;
  const isNear = remaining <= 20;
  const isOver = remaining < 0;
  return (
    <span className={`text-xs tabular-nums ${
      isOver ? 'text-red-500 font-semibold' : isNear ? 'text-amber-500' : 'text-gray-300'
    }`}>
      {value.length}/{max}
    </span>
  );
}

function Field({
  label,
  required,
  charLimit,
  charValue,
  children
}: {
  label: string;
  required?: boolean;
  charLimit?: number;
  charValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {charLimit !== undefined && charValue !== undefined && (
          <CharCount value={charValue} max={charLimit} />
        )}
      </div>
      {children}
    </div>
  );
}

function Section({
  step,
  title,
  primaryColor,
  children
}: {
  step: number;
  title: string;
  primaryColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-100">
        <span
          className="w-6 h-6 flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          {step}
        </span>
        <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase">
          {title}
        </h2>
      </div>
      <div className="px-8 py-7">{children}</div>
    </div>
  );
}

/* -------------------------------------------------- */
/* Language Toggle */
/* -------------------------------------------------- */

function LangToggle({
  lang,
  onChange,
  disabled,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  primaryColor?: string;
  disabled?: boolean;
}) {
  const baseBtn = 'text-xs tracking-wide transition-colors';
  const active = 'text-gray-900 font-semibold';
  const inactive = 'text-gray-400 hover:text-gray-600 font-medium';

  return (
    <div className="fixed top-5 left-5 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange('es')}
        disabled={disabled}
        className={`${baseBtn} ${lang === 'es' ? active : inactive} ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        ES
      </button>
      <span className="text-black text-xs select-none">|</span>
      <button
        type="button"
        onClick={() => onChange('en')}
        disabled={disabled}
        className={`${baseBtn} ${lang === 'en' ? active : inactive} ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        EN
      </button>
    </div>
  );
}

/* ================================================== */
/* Componente principal */
/* ================================================== */

export default function PublicComplaintForm() {
  const { slug } = useParams<{ slug: string }>();

  // ✅ i18n: idioma siempre arranca en español, sin persistencia
  const [lang, setLang] = useState<Lang>('es');
  const t = translations[lang];

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [channelConfig, setChannelConfig] = useState<PublicChannelConfig | null>(null);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<'not_found' | 'inactive' | null>(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [folio, setFolio] = useState('');
  const [recordType, setRecordType] = useState<RecordType>('complaint');

  // ✅ Fix: ref para capturar el recordType exacto al momento del submit
  const submittedRecordTypeRef = useRef<RecordType>('complaint');

  const [formData, setFormData] = useState({
    complainant_type: '',
    is_anonymous: false,
    complainant_name: '',
    complainant_email: '',
    complainant_phone: '',
    company_relationship: '',
    category: '',
    complaint_type: '',
    title: '',
    full_description: '',
    incident_date: '',
    incident_location: '',
    involved_area: '',
    involved_people: '',
    witnesses: '',
    evidence_description: '',
    custom_fields: {} as Record<string, string>
  });

  const [files, setFiles] = useState<File[]>([]);

  /* ---- Load channel ---- */

  useEffect(() => {
    if (slug) loadChannelConfig();
  }, [slug]);

  const loadChannelConfig = async () => {
    try {
      setLoading(true);
      setError('');
      setErrorType(null);

      const response = await channelApi.getPublicConfig(slug!);

      if (response.success && response.data) {
        const config = response.data;

        if (!config.can_receive_complaints) {
          setChannelConfig(config);
          setError(config.subscription_message);
          setErrorType('inactive');
          return;
        }

        let allowedFileTypes: string[] = [];
        if (Array.isArray(config.allowed_file_types)) {
          allowedFileTypes = config.allowed_file_types;
        } else if (typeof config.allowed_file_types === 'string') {
          try {
            allowedFileTypes = JSON.parse(config.allowed_file_types);
          } catch {
            allowedFileTypes = [];
          }
        }

        const enabledTypes: RecordType[] =
          Array.isArray(config.enabled_record_types) && config.enabled_record_types.length > 0
            ? config.enabled_record_types
            : DEFAULT_ENABLED_TYPES;

        setRecordType(enabledTypes[0]);
        submittedRecordTypeRef.current = enabledTypes[0];
        setChannelConfig({ ...config, allowed_file_types: allowedFileTypes });
      } else {
        setChannelConfig(null);
        setError('Canal no encontrado');
        setErrorType('not_found');
      }
    } catch (err: unknown) {
      setChannelConfig(null);
      setError(err instanceof Error ? err.message : 'Canal no encontrado');
      setErrorType('not_found');
    } finally {
      setLoading(false);
    }
  };

  /* ---- Helpers ---- */

  const getEnabledRecordTypes = () => {
    if (!isActiveChannel(channelConfig)) return ALL_RECORD_TYPES;
    const enabled: RecordType[] =
      Array.isArray(channelConfig.enabled_record_types) && channelConfig.enabled_record_types.length > 0
        ? channelConfig.enabled_record_types
        : DEFAULT_ENABLED_TYPES;
    return ALL_RECORD_TYPES.filter(r => enabled.includes(r.type));
  };

  /* ---- Handlers ---- */

  const handleRecordTypeChange = (type: RecordType) => {
    setRecordType(type);
    submittedRecordTypeRef.current = type;
    if (type !== 'complaint') {
      setFormData(prev => ({
        ...prev,
        category: '', complaint_type: '', incident_date: '', incident_location: '',
        involved_area: '', involved_people: '', witnesses: '', evidence_description: ''
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }
    const limit = CHAR_LIMITS[name as keyof typeof CHAR_LIMITS];
    if (limit && value.length > limit) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, category: e.target.value, complaint_type: '' }));
  };

  const handleCustomFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: { ...prev.custom_fields, [fieldId]: value }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActiveChannel(channelConfig)) return;
    const selectedFiles = Array.from(e.target.files ?? []);

    if (files.length + selectedFiles.length > channelConfig.max_files) {
      toast.error(t.maxFilesError(channelConfig.max_files));
      return;
    }
    const maxSizeBytes = channelConfig.max_file_size_mb * 1024 * 1024;
    for (const file of selectedFiles) {
      if (file.size > maxSizeBytes) {
        toast.error(t.fileTooLarge(file.name, channelConfig.max_file_size_mb));
        return;
      }
    }
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) =>
    setFiles(prev => prev.filter((_, i) => i !== index));

  /* ---- Submit ---- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isActiveChannel(channelConfig)) return;

    if (!formData.title.trim() || !formData.full_description.trim()) {
      toast.error(t.titleDescRequired);
      return;
    }
    if (recordType === 'complaint' && (!formData.category || !formData.complaint_type)) {
      toast.error(t.categoryTypeRequired);
      return;
    }
    if (!formData.is_anonymous) {
      if (!formData.complainant_name.trim() || !formData.complainant_email.trim()) {
        toast.error(t.nameEmailRequired);
        return;
      }
    }

    try {
      setSubmitting(true);
      setUploadProgress(0);

      submittedRecordTypeRef.current = recordType;

      const base = {
        record_type: recordType,
        complainant_type: formData.complainant_type,
        is_anonymous: formData.is_anonymous,
        complainant_name: formData.complainant_name || undefined,
        complainant_email: formData.complainant_email || undefined,
        complainant_phone: formData.complainant_phone || undefined,
        company_relationship: formData.company_relationship || undefined,
        title: formData.title,
        full_description: formData.full_description,
        custom_fields:
          Object.keys(formData.custom_fields).length > 0
            ? formData.custom_fields
            : undefined
      };

      const payload =
        recordType === 'complaint'
          ? {
              ...base,
              record_type: 'complaint' as const,
              category: formData.category,
              complaint_type: formData.complaint_type,
              incident_date: formData.incident_date || undefined,
              incident_location: formData.incident_location || undefined,
              involved_area: formData.involved_area || undefined,
              involved_people: formData.involved_people || undefined,
              witnesses: formData.witnesses || undefined,
              evidence_description: formData.evidence_description || undefined
            }
          : { ...base, record_type: recordType as 'grievance' | 'suggestion' };

      const response = await complaintApi.submitPublic(slug!, payload, files, setUploadProgress);
      if (!response.data) throw new Error(t.invalidResponse);

      setFolio(response.data.folio);
      setTrackingCode(response.data.tracking_code ?? '');
      setSubmitted(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : t.sendError);
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  /* ---- Form helpers ---- */

  const getActiveCategories = () => {
    if (!isActiveChannel(channelConfig)) return [];
    return Object.entries(channelConfig.complaint_categories)
      .filter(([, cat]) => cat.enabled)
      .map(([key, cat]) => ({ key, label: cat.label }));
  };

  const getComplaintTypesForCategory = () => {
    if (!isActiveChannel(channelConfig) || !formData.category) return [];
    const cats = channelConfig.complaint_categories;
    if (!(formData.category in cats)) return [];
    return cats[formData.category as keyof ComplaintCategories].complaints.filter(
      c => c.enabled !== false
    );
  };

  /* ================================================== */
  /* RENDER */
  /* ================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
      </div>
    );
  }

  if (errorType === 'not_found') {
    return (
      <>
        <LangToggle lang={lang} onChange={setLang} primaryColor="#002D56" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
          <div className="max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <Megaphone className="w-8 h-8 text-gray-300" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">{t.channelNotFound}</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              {t.channelNotFoundDesc}
            </p>
            <div className="pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Megaphone className="w-3.5 h-3.5" />
              <span>
                {t.channelByTalma}{' '}
                <span className="font-semibold text-gray-600">TALMA TECH</span>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!channelConfig) return null;

  const primaryColor = channelConfig.primary_color;
  const secondaryColor = channelConfig.secondary_color;

  /* ---- Success ---- */
  if (submitted) {
    const currentTexts = getRecordTypeTexts(submittedRecordTypeRef.current, t);

    const confirmMsg =
      isActiveChannel(channelConfig) && channelConfig.confirmation_message
        ? channelConfig.confirmation_message
        : currentTexts.successDefault;

    return (
      <>
        <LangToggle lang={lang} onChange={setLang} primaryColor={primaryColor} />
        <div
          className="min-h-screen flex items-center justify-center px-6 py-16"
          style={{ backgroundColor: secondaryColor }}
        >
          <div className="max-w-lg w-full">
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: primaryColor }} />
              <div className="p-10 text-center">
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${primaryColor}18` }}
                >
                  <CheckCircle2 className="w-7 h-7" style={{ color: primaryColor }} />
                </div>

                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: primaryColor }}
                >
                  {currentTexts.successTitle}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.recordConfirmed}</h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-8 whitespace-pre-line">
                  {confirmMsg}
                </p>

                <div className="space-y-3 text-left">
                  <div className="bg-gray-50 border border-gray-200 px-5 py-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      {t.folio}
                    </p>
                    <p className="text-xl font-bold text-gray-900 font-mono">{folio}</p>
                  </div>

                  {trackingCode && (
                    <div className="border border-amber-200 bg-amber-50 px-5 py-4">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                        {t.trackingCode}
                      </p>
                      <p className="text-xl font-bold text-amber-900 font-mono">{trackingCode}</p>
                      <p className="text-xs text-amber-600 mt-2">
                        {t.trackingCodeNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
              <Megaphone className="w-3.5 h-3.5" />
              <span>
                {t.channelManagedBy}{' '}
                <span className="font-semibold text-gray-500">{channelConfig.company_name}</span>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ---- Form ---- */

  const activeCategories = getActiveCategories();
  const complaintTypes = getComplaintTypesForCategory();
  const isComplaint = recordType === 'complaint';
  const currentTexts = getRecordTypeTexts(recordType, t);
  const visibleRecordTypes = getEnabledRecordTypes();
  let step = 1;

  return (
    <>
      <LangToggle lang={lang} onChange={setLang} primaryColor={primaryColor} disabled={submitting} />
      <div
        className="min-h-screen py-14 px-4"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-2xl mx-auto space-y-4">

          {/* ---- Header empresa ---- */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: primaryColor }} />
            <div className="px-8 py-7">
              <div className="flex items-center gap-4 mb-5">
                {channelConfig.logo_url ? (
                  <img
                    src={channelConfig.logo_url}
                    alt={channelConfig.company_name}
                    className="h-20 w-auto object-contain shrink-0"
                  />
                ) : (
                  <div
                    className="w-16 h-16 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {isActiveChannel(channelConfig)
                      ? channelConfig.form_title
                      : channelConfig.company_name}
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium">
                    {channelConfig.company_name}
                  </p>
                </div>
              </div>

              {isActiveChannel(channelConfig) && channelConfig.welcome_message && (
                <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5">
                  {channelConfig.welcome_message}
                </p>
              )}
            </div>
          </div>

          {/* ---- Canal inactivo ---- */}
          {!channelConfig.can_receive_complaints && (
            <div className="bg-white border border-gray-200 p-5 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{channelConfig.subscription_message}</p>
            </div>
          )}

          {/* ---- Form ---- */}
          {isActiveChannel(channelConfig) && (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* PASO 1 — Tipo de registro */}
              {visibleRecordTypes.length > 1 && (
                <Section step={step++} title={t.sectionRecordType} primaryColor={primaryColor}>
                  <div className={`grid gap-3 ${
                    visibleRecordTypes.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
                  }`}>
                    {visibleRecordTypes.map(({ type, icon: Icon }) => {
                      const active = recordType === type;
                      const texts = getRecordTypeTexts(type, t);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleRecordTypeChange(type)}
                          disabled={submitting}
                          className={`relative text-left p-5 border-2 transition-all ${
                            active ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                          } ${submitting ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                          {active && (
                            <div
                              className="absolute top-0 left-0 right-0 h-0.5"
                              style={{ backgroundColor: primaryColor }}
                            />
                          )}
                          <Icon
                            className="w-5 h-5 mb-3 transition-colors"
                            style={{ color: active ? primaryColor : '#9ca3af' }}
                          />
                          <p className="text-sm font-bold text-gray-900">{texts.label}</p>
                          <p className="text-xs text-gray-500 mt-2 leading-relaxed">{texts.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </Section>
              )}

              {/* PASO 2 — Identidad */}
              <Section step={step++} title={t.sectionIdentity} primaryColor={primaryColor}>
                {channelConfig.allow_anonymous_complaints && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-gray-50 border border-gray-200">
                    <input
                      type="checkbox"
                      name="is_anonymous"
                      id="is_anonymous"
                      checked={formData.is_anonymous}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer"
                      style={{ accentColor: primaryColor }}
                      disabled={submitting}
                    />
                    <label htmlFor="is_anonymous" className="cursor-pointer select-none">
                      <p className="text-sm font-semibold text-gray-900">{t.sendAnonymously}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {t.sendAnonymouslyDesc}
                      </p>
                    </label>
                  </div>
                )}

                {formData.is_anonymous ? (
                  <p className="text-sm text-gray-400 italic">
                    {t.anonymousNotice}
                  </p>
                ) : (
                  <div className="space-y-5">
                    <Field label={t.relationshipType} required>
                      <select
                        name="complainant_type"
                        value={formData.complainant_type}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className={inputCls(submitting)}
                      >
                        <option value="">{t.selectPlaceholder}</option>
                        <option value="employee">{t.relEmployee}</option>
                        <option value="supplier">{t.relSupplier}</option>
                        <option value="customer">{t.relCustomer}</option>
                        <option value="external">{t.relExternal}</option>
                        <option value="other">{t.relOther}</option>
                      </select>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label={t.fullName}
                        required
                        charLimit={CHAR_LIMITS.complainant_name}
                        charValue={formData.complainant_name}
                      >
                        <input
                          type="text"
                          name="complainant_name"
                          value={formData.complainant_name}
                          onChange={handleChange}
                          required
                          disabled={submitting}
                          className={inputCls(submitting)}
                        />
                      </Field>
                      <Field label={t.phone}>
                        <input
                          type="tel"
                          name="complainant_phone"
                          value={formData.complainant_phone}
                          onChange={handleChange}
                          disabled={submitting}
                          className={inputCls(submitting)}
                        />
                      </Field>
                    </div>

                    <Field label={t.email} required>
                      <input
                        type="email"
                        name="complainant_email"
                        value={formData.complainant_email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className={inputCls(submitting)}
                      />
                    </Field>

                    <Field
                      label={t.companyRelationship}
                      charLimit={CHAR_LIMITS.company_relationship}
                      charValue={formData.company_relationship}
                    >
                      <input
                        type="text"
                        name="company_relationship"
                        value={formData.company_relationship}
                        onChange={handleChange}
                        placeholder={t.companyRelationshipPh}
                        disabled={submitting}
                        className={inputCls(submitting)}
                      />
                    </Field>
                  </div>
                )}
              </Section>

              {/* PASO 3 — Detalles */}
              <Section
                step={step++}
                title={`${t.sectionDetailsPrefix} ${currentTexts.label}`}
                primaryColor={primaryColor}
              >
                <div className="space-y-5">
                  {isComplaint && (
                    <>
                      <Field label={t.category} required>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleCategoryChange}
                          required
                          disabled={submitting}
                          className={inputCls(submitting)}
                        >
                          <option value="">{t.selectCategoryPh}</option>
                          {activeCategories.map(cat => (
                            <option key={cat.key} value={cat.key}>{cat.label}</option>
                          ))}
                        </select>
                      </Field>

                      {formData.category && (
                        <Field label={t.complaintType} required>
                          <select
                            name="complaint_type"
                            value={formData.complaint_type}
                            onChange={handleChange}
                            required
                            disabled={submitting}
                            className={inputCls(submitting)}
                          >
                            <option value="">{t.selectTypePh}</option>
                            {complaintTypes.map(ct => (
                              <option key={ct.value} value={ct.value}>{ct.label}</option>
                            ))}
                          </select>
                        </Field>
                      )}
                    </>
                  )}

                  <Field
                    label={t.title}
                    required
                    charLimit={CHAR_LIMITS.title}
                    charValue={formData.title}
                  >
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder={t.titlePh}
                      disabled={submitting}
                      className={inputCls(submitting)}
                    />
                  </Field>

                  <Field label={t.description} required>
                    <textarea
                      name="full_description"
                      value={formData.full_description}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={
                        isComplaint
                          ? t.descPhComplaint
                          : recordType === 'grievance'
                          ? t.descPhGrievance
                          : t.descPhSuggestion
                      }
                      disabled={submitting}
                      className={`${inputCls(submitting)} resize-none`}
                    />
                  </Field>

                  {isComplaint && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field label={t.incidentDate}>
                          <input
                            type="date"
                            name="incident_date"
                            value={formData.incident_date}
                            onChange={handleChange}
                            disabled={submitting}
                            className={inputCls(submitting)}
                          />
                        </Field>
                        <Field
                          label={t.incidentLocation}
                          charLimit={CHAR_LIMITS.incident_location}
                          charValue={formData.incident_location}
                        >
                          <input
                            type="text"
                            name="incident_location"
                            value={formData.incident_location}
                            onChange={handleChange}
                            placeholder={t.incidentLocationPh}
                            disabled={submitting}
                            className={inputCls(submitting)}
                          />
                        </Field>
                      </div>

                      <Field
                        label={t.involvedArea}
                        charLimit={CHAR_LIMITS.involved_area}
                        charValue={formData.involved_area}
                      >
                        <input
                          type="text"
                          name="involved_area"
                          value={formData.involved_area}
                          onChange={handleChange}
                          placeholder={t.involvedAreaPh}
                          disabled={submitting}
                          className={inputCls(submitting)}
                        />
                      </Field>

                      <Field label={t.involvedPeople}>
                        <textarea
                          name="involved_people"
                          value={formData.involved_people}
                          onChange={handleChange}
                          rows={3}
                          placeholder={t.involvedPeoplePh}
                          disabled={submitting}
                          className={`${inputCls(submitting)} resize-none`}
                        />
                      </Field>

                      <Field label={t.witnesses}>
                        <textarea
                          name="witnesses"
                          value={formData.witnesses}
                          onChange={handleChange}
                          rows={3}
                          placeholder={t.witnessesPh}
                          disabled={submitting}
                          className={`${inputCls(submitting)} resize-none`}
                        />
                      </Field>

                      <Field label={t.evidenceDescription}>
                        <textarea
                          name="evidence_description"
                          value={formData.evidence_description}
                          onChange={handleChange}
                          rows={3}
                          placeholder={t.evidenceDescriptionPh}
                          disabled={submitting}
                          className={`${inputCls(submitting)} resize-none`}
                        />
                      </Field>
                    </>
                  )}
                </div>
              </Section>

              {/* PASO N — Campos personalizados */}
              {channelConfig.custom_fields.length > 0 && (
                <Section step={step++} title={t.sectionCustomFields} primaryColor={primaryColor}>
                  <div className="space-y-5">
                    {channelConfig.custom_fields.map((field: CustomField) => (
                      <Field key={field.id} label={field.label}>
                        {field.type === 'text' ? (
                          <input
                            type="text"
                            value={formData.custom_fields[field.id] || ''}
                            onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                            placeholder={field.label}
                            disabled={submitting}
                            className={inputCls(submitting)}
                          />
                        ) : (
                          <textarea
                            value={formData.custom_fields[field.id] || ''}
                            onChange={e => handleCustomFieldChange(field.id, e.target.value)}
                            placeholder={field.label}
                            rows={4}
                            disabled={submitting}
                            className={`${inputCls(submitting)} resize-none`}
                          />
                        )}
                      </Field>
                    ))}
                  </div>
                </Section>
              )}

              {/* PASO N — Archivos */}
              {channelConfig.allow_file_attachments && (
                <Section step={step++} title={t.sectionFiles} primaryColor={primaryColor}>
                  <div className="space-y-3">
                    {files.length > 0 && (
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 px-4 py-3 border border-gray-200"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Upload className="w-4 h-4 text-gray-400 shrink-0" />
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <span className="text-xs text-gray-400 shrink-0">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              disabled={submitting}
                              className="ml-3 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {files.length < channelConfig.max_files && (
                      <label
                        className={`flex flex-col items-center justify-center gap-2 px-4 py-10 border-2 border-dashed transition-colors ${
                          submitting
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-300 hover:border-gray-400 cursor-pointer'
                        }`}
                      >
                        <Upload className={`w-6 h-6 ${submitting ? 'text-gray-300' : 'text-gray-400'}`} />
                        <span className={`text-sm ${submitting ? 'text-gray-400' : 'text-gray-600'}`}>
                          {t.clickToSelect}
                        </span>
                        <span className="text-xs text-gray-400">
                          {t.maxFilesInfo(channelConfig.max_files, channelConfig.max_file_size_mb)}
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          accept={channelConfig.allowed_file_types.join(',')}
                          disabled={submitting}
                        />
                      </label>
                    )}
                  </div>
                </Section>
              )}

              {/* Error inline */}
              {error && (
                <div className="bg-white border border-gray-200 p-4 flex gap-3">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit */}
              <div className="space-y-3 pt-1">
                {submitting && (
                  <div className="bg-white border border-gray-200 px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">
                        {uploadProgress < 100 ? t.uploadingFiles : t.processing}
                      </span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: primaryColor }}
                      >
                        {uploadProgress < 100 ? `${uploadProgress}%` : '✓'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 ease-out"
                        style={{
                          width: `${uploadProgress}%`,
                          backgroundColor: primaryColor
                        }}
                      />
                    </div>
                    {uploadProgress < 100 && (
                      <p className="text-xs text-gray-400 mt-2">
                        {t.doNotClose}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3.5 text-white text-sm font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      currentTexts.submitLabel
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="bg-white border border-gray-200 px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-xs font-semibold text-gray-600">{t.confidentialChannel}</p>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              {t.footerAdminBy(channelConfig.company_name)}
            </p>
            <div className="flex justify-center gap-4 mb-2">
              <a href="/privacidad" className="text-xs text-gray-500 hover:text-gray-700 underline">
                {t.privacyPolicy}
              </a>
              <a href="/terminos" className="text-xs text-gray-500 hover:text-gray-700 underline">
                {t.termsConditions}
              </a>
            </div>
            <p className="text-xs text-gray-400">
              {t.poweredBy}{' '}
              <a
                href="https://talmatech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-500 hover:text-gray-700 underline"
              >
                TALMATECH
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}