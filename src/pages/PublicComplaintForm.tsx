import { useState, useEffect } from 'react';
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
/* Type Guard */
/* -------------------------------------------------- */

function isActiveChannel(
  config: PublicChannelConfig | null
): config is PublicChannelConfigActive {
  return !!config && config.can_receive_complaints === true;
}

/* -------------------------------------------------- */
/* Record type config */
/* -------------------------------------------------- */

const ALL_RECORD_TYPES = [
  {
    type: 'complaint' as RecordType,
    label: 'Denuncia',
    description: 'Reporta un incidente, irregularidad o conducta indebida.',
    submitLabel: 'Enviar Denuncia',
    successTitle: 'Denuncia recibida',
    successDefault:
      'Gracias por tu denuncia. Nuestro equipo legal revisará el caso con total confidencialidad y nos pondremos en contacto pronto.',
    icon: FileText
  },
  {
    type: 'grievance' as RecordType,
    label: 'Queja',
    description: 'Expresa una inconformidad sobre un servicio o trato recibido.',
    submitLabel: 'Enviar Queja',
    successTitle: 'Queja registrada',
    successDefault:
      'Hemos recibido tu queja. La revisaremos con atención y te contactaremos para darte seguimiento.',
    icon: MessageSquare
  },
  {
    type: 'suggestion' as RecordType,
    label: 'Sugerencia',
    description: 'Comparte ideas o propuestas para mejorar procesos.',
    submitLabel: 'Enviar Sugerencia',
    successTitle: 'Sugerencia recibida',
    successDefault:
      'Gracias por tu propuesta. La tendremos en cuenta para mejorar continuamente.',
    icon: Lightbulb
  }
] as const;

const DEFAULT_ENABLED_TYPES: RecordType[] = ['complaint', 'grievance', 'suggestion'];

/* -------------------------------------------------- */
/* UI helpers */
/* -------------------------------------------------- */

const inputCls = (disabled: boolean) =>
  `w-full px-4 py-3 border text-sm outline-none transition-colors ${
    disabled
      ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-white border-gray-300 text-gray-900 hover:border-gray-500 focus:border-gray-900'
  }`;

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
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

/* ================================================== */
/* Componente principal */
/* ================================================== */

export default function PublicComplaintForm() {
  const { slug } = useParams<{ slug: string }>();

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

        // Setear el primer tipo habilitado como default
        const enabledTypes: RecordType[] =
          Array.isArray(config.enabled_record_types) && config.enabled_record_types.length > 0
            ? config.enabled_record_types
            : DEFAULT_ENABLED_TYPES;

        setRecordType(enabledTypes[0]);
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

  // Lista de tipos visibles según configuración del canal
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
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
      toast.error(`Máximo ${channelConfig.max_files} archivos permitidos`);
      return;
    }
    const maxSizeBytes = channelConfig.max_file_size_mb * 1024 * 1024;
    for (const file of selectedFiles) {
      if (file.size > maxSizeBytes) {
        toast.error(`${file.name} supera el tamaño máximo de ${channelConfig.max_file_size_mb}MB`);
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
      toast.error('El título y la descripción son requeridos');
      return;
    }
    if (recordType === 'complaint' && (!formData.category || !formData.complaint_type)) {
      toast.error('La categoría y el tipo de denuncia son requeridos');
      return;
    }
    if (!formData.is_anonymous) {
      if (!formData.complainant_name.trim() || !formData.complainant_email.trim()) {
        toast.error('Nombre y email son requeridos');
        return;
      }
    }

    try {
      setSubmitting(true);
      setUploadProgress(0);

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
      if (!response.data) throw new Error('Respuesta inválida');

      setFolio(response.data.folio);
      setTrackingCode(response.data.tracking_code ?? '');
      setSubmitted(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al enviar');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">Canal no encontrado</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            El canal que buscas no existe o ha sido eliminado. Verifica el enlace o
            contacta a la empresa que te lo compartió.
          </p>
          <div className="pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Megaphone className="w-3.5 h-3.5" />
            <span>
              Canal de denuncia por{' '}
              <span className="font-semibold text-gray-600">TALMA TECH</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!channelConfig) return null;

  const primaryColor = channelConfig.primary_color;
  const secondaryColor = channelConfig.secondary_color;

  /* ---- Success ---- */
  if (submitted) {
    const current = ALL_RECORD_TYPES.find(r => r.type === recordType)!;

    const confirmMsg =
      isActiveChannel(channelConfig) && channelConfig.confirmation_message
        ? channelConfig.confirmation_message
        : current.successDefault;

    return (
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
                {current.successTitle}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Registro confirmado</h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-8 whitespace-pre-line">
                {confirmMsg}
              </p>

              <div className="space-y-3 text-left">
                <div className="bg-gray-50 border border-gray-200 px-5 py-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Folio
                  </p>
                  <p className="text-xl font-bold text-gray-900 font-mono">{folio}</p>
                </div>

                {trackingCode && (
                  <div className="border border-amber-200 bg-amber-50 px-5 py-4">
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                      Código de seguimiento
                    </p>
                    <p className="text-xl font-bold text-amber-900 font-mono">{trackingCode}</p>
                    <p className="text-xs text-amber-600 mt-2">
                      Guarda este código para consultar el estado de tu registro.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
            <Megaphone className="w-3.5 h-3.5" />
            <span>
              Canal administrado por{' '}
              <span className="font-semibold text-gray-500">{channelConfig.company_name}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Form ---- */

  const activeCategories = getActiveCategories();
  const complaintTypes = getComplaintTypesForCategory();
  const isComplaint = recordType === 'complaint';
  const currentType = ALL_RECORD_TYPES.find(r => r.type === recordType)!;
  const visibleRecordTypes = getEnabledRecordTypes();
  let step = 1;

  return (
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

            {/* PASO 1 — Tipo de registro
                Solo se muestra si hay más de un tipo habilitado.
                Si hay exactamente 1, ya está preseleccionado y no hay nada que elegir. */}
            {visibleRecordTypes.length > 1 && (
              <Section step={step++} title="¿Qué deseas enviar?" primaryColor={primaryColor}>
                <div className={`grid gap-3 ${
                  visibleRecordTypes.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
                }`}>
                  {visibleRecordTypes.map(({ type, label, description, icon: Icon }) => {
                    const active = recordType === type;
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
                        <p className="text-sm font-bold text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{description}</p>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* PASO 2 — Identidad */}
            <Section step={step++} title="Tu información" primaryColor={primaryColor}>
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
                    <p className="text-sm font-semibold text-gray-900">Enviar de forma anónima</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Tu identidad será completamente confidencial.
                    </p>
                  </label>
                </div>
              )}

              {formData.is_anonymous ? (
                <p className="text-sm text-gray-400 italic">
                  Enviarás este registro de forma completamente anónima.
                </p>
              ) : (
                <div className="space-y-5">
                  <Field label="Tipo de relación" required>
                    <select
                      name="complainant_type"
                      value={formData.complainant_type}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className={inputCls(submitting)}
                    >
                      <option value="">Selecciona...</option>
                      <option value="employee">Empleado</option>
                      <option value="supplier">Proveedor</option>
                      <option value="customer">Cliente</option>
                      <option value="external">Externo</option>
                    </select>
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Nombre completo" required>
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
                    <Field label="Teléfono">
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

                  <Field label="Email" required>
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

                  <Field label="Relación con la empresa">
                    <input
                      type="text"
                      name="company_relationship"
                      value={formData.company_relationship}
                      onChange={handleChange}
                      placeholder="Ej: Empleado del departamento de ventas"
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
              title={`Detalles de la ${currentType.label}`}
              primaryColor={primaryColor}
            >
              <div className="space-y-5">
                {isComplaint && (
                  <>
                    <Field label="Categoría" required>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        required
                        disabled={submitting}
                        className={inputCls(submitting)}
                      >
                        <option value="">Selecciona una categoría...</option>
                        {activeCategories.map(cat => (
                          <option key={cat.key} value={cat.key}>{cat.label}</option>
                        ))}
                      </select>
                    </Field>

                    {formData.category && (
                      <Field label="Tipo de denuncia" required>
                        <select
                          name="complaint_type"
                          value={formData.complaint_type}
                          onChange={handleChange}
                          required
                          disabled={submitting}
                          className={inputCls(submitting)}
                        >
                          <option value="">Selecciona un tipo...</option>
                          {complaintTypes.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </Field>
                    )}
                  </>
                )}

                <Field label="Título" required>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Resumen breve de la situación"
                    disabled={submitting}
                    className={inputCls(submitting)}
                  />
                </Field>

                <Field label="Descripción" required>
                  <textarea
                    name="full_description"
                    value={formData.full_description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={
                      isComplaint
                        ? 'Describe con detalle lo sucedido, incluyendo fechas, lugares y personas...'
                        : recordType === 'grievance'
                        ? 'Describe tu inconformidad con el mayor detalle posible...'
                        : 'Describe tu propuesta o sugerencia de mejora...'
                    }
                    disabled={submitting}
                    className={`${inputCls(submitting)} resize-none`}
                  />
                </Field>

                {isComplaint && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Fecha del incidente">
                        <input
                          type="date"
                          name="incident_date"
                          value={formData.incident_date}
                          onChange={handleChange}
                          disabled={submitting}
                          className={inputCls(submitting)}
                        />
                      </Field>
                      <Field label="Lugar del incidente">
                        <input
                          type="text"
                          name="incident_location"
                          value={formData.incident_location}
                          onChange={handleChange}
                          placeholder="Ej: Oficina central, Sucursal norte..."
                          disabled={submitting}
                          className={inputCls(submitting)}
                        />
                      </Field>
                    </div>

                    <Field label="Área o departamento involucrado">
                      <input
                        type="text"
                        name="involved_area"
                        value={formData.involved_area}
                        onChange={handleChange}
                        placeholder="Ej: Recursos Humanos, Ventas..."
                        disabled={submitting}
                        className={inputCls(submitting)}
                      />
                    </Field>

                    <Field label="Personas involucradas">
                      <textarea
                        name="involved_people"
                        value={formData.involved_people}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Nombres, cargos o descripciones..."
                        disabled={submitting}
                        className={`${inputCls(submitting)} resize-none`}
                      />
                    </Field>

                    <Field label="Testigos">
                      <textarea
                        name="witnesses"
                        value={formData.witnesses}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Personas que presenciaron los hechos..."
                        disabled={submitting}
                        className={`${inputCls(submitting)} resize-none`}
                      />
                    </Field>

                    <Field label="Descripción de evidencia">
                      <textarea
                        name="evidence_description"
                        value={formData.evidence_description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Documentos, correos, registros u otra evidencia disponible..."
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
              <Section step={step++} title="Información adicional" primaryColor={primaryColor}>
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
              <Section step={step++} title="Archivos adjuntos" primaryColor={primaryColor}>
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
                        Haz clic para seleccionar archivos
                      </span>
                      <span className="text-xs text-gray-400">
                        Máx. {channelConfig.max_files} archivos · {channelConfig.max_file_size_mb}MB por archivo
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
                      {uploadProgress < 100 ? 'Subiendo archivos...' : 'Procesando...'}
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
                      No cierres esta ventana hasta que el envío se complete.
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
                      Enviando...
                    </>
                  ) : (
                    currentType.submitLabel
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="bg-white border border-gray-200 px-6 py-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <p className="text-xs font-semibold text-gray-600">Canal Confidencial</p>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            Administrado por {channelConfig.company_name} · Toda información tratada con confidencialidad
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="/privacidad" className="text-xs text-gray-500 hover:text-gray-700 underline">
              Política de privacidad
            </a>
            <a href="/terminos" className="text-xs text-gray-500 hover:text-gray-700 underline">
              Términos y condiciones
            </a>
          </div>
          <p className="text-xs text-gray-400">
            Powered by{' '}
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
  );
}