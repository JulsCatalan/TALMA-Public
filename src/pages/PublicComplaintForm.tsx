import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, AlertCircle, Loader2, CheckCircle2, Upload, X } from 'lucide-react';
import { channelApi } from '../api/channel.api';
import { complaintApi } from '../api/complaint.api';
import toast from 'react-hot-toast';

import type {
  PublicChannelConfig,
  PublicChannelConfigActive,
  ComplaintCategories,
  CustomField
} from '../types/channel.types';

/* -------------------------------------------------- */
/* Type Guard */
/* -------------------------------------------------- */

function isActiveChannel(
  config: PublicChannelConfig | null
): config is PublicChannelConfigActive {
  return !!config && config.can_receive_complaints === true;
}

/* -------------------------------------------------- */

export default function PublicComplaintForm() {
  const { slug } = useParams<{ slug: string }>();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [channelConfig, setChannelConfig] =
    useState<PublicChannelConfig | null>(null);
  const [, setError] = useState('');
  const [, setTrackingCode] = useState('');
  const [folio, setFolio] = useState('');

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

  /* -------------------------------------------------- */
  /* Load Channel */
  /* -------------------------------------------------- */

  useEffect(() => {
    if (slug) {
      loadChannelConfig();
    }
  }, [slug]);

  const loadChannelConfig = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await channelApi.getPublicConfig(slug!);

      if (response.success && response.data) {
        const config = response.data;

        if (!config.can_receive_complaints) {
          setChannelConfig(config);
          setError(config.subscription_message);
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

        setChannelConfig({
          ...config,
          allowed_file_types: allowedFileTypes
        });
      } else {
        setChannelConfig(null);
        setError('Canal no encontrado');
      }
    } catch (err: unknown) {
      setChannelConfig(null);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Canal no encontrado');
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------- */
  /* Handlers */
  /* -------------------------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
      complaint_type: ''
    }));
  };

  const handleCustomFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: {
        ...prev.custom_fields,
        [fieldId]: value
      }
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
        toast.error(
          `El archivo ${file.name} supera el tamaño máximo de ${channelConfig.max_file_size_mb}MB`
        );
        return;
      }
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  /* -------------------------------------------------- */
  /* Submit */
  /* -------------------------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isActiveChannel(channelConfig)) return;

    if (!formData.category || !formData.complaint_type || !formData.title.trim()) {
      toast.error('Completa los campos requeridos');
      return;
    }

    if (!formData.full_description.trim()) {
      toast.error('La descripción completa es requerida');
      return;
    }

    if (!formData.is_anonymous) {
      if (!formData.complainant_name.trim()) {
        toast.error('El nombre es requerido');
        return;
      }
      if (!formData.complainant_email.trim()) {
        toast.error('El email es requerido');
        return;
      }
    }

    try {
      setSubmitting(true);

      const response = await complaintApi.submitPublic(slug!, formData, files);

      if (!response.data) throw new Error('Respuesta inválida');

      setFolio(response.data.folio);
      setTrackingCode(response.data.tracking_code ?? '');
      setSubmitted(true);

      toast.success('Denuncia enviada correctamente');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Error al enviar la denuncia');
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------------------------------------- */
  /* Helpers */
  /* -------------------------------------------------- */

  const getActiveCategories = () => {
    if (!isActiveChannel(channelConfig)) return [];

    return Object.entries(channelConfig.complaint_categories)
      .filter(([, category]) => category.enabled)
      .map(([key, category]) => ({
        key,
        label: category.label
      }));
  };

  const getComplaintTypesForCategory = () => {
    if (!isActiveChannel(channelConfig)) return [];
    if (!formData.category) return [];

    const categories = channelConfig.complaint_categories;

    if (!(formData.category in categories)) return [];

    const category =
      categories[formData.category as keyof ComplaintCategories];

    return category.complaints.filter(c => c.enabled !== false);
  };

  /* -------------------------------------------------- */
  /* Render Shortened for clarity (UI intact) */
  /* -------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!channelConfig) return null;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
        <p>Folio: {folio}</p>
      </div>
    );
  }

  const activeCategories = getActiveCategories();
  const complaintTypes = getComplaintTypesForCategory();

  // Reemplaza todo el return con esto:
return (
  <div
    className="min-h-screen py-12 px-6"
    style={{ backgroundColor: channelConfig.secondary_color }}
  >
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="bg-white border border-gray-200 p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          {channelConfig.logo_url ? (
            <img
              src={channelConfig.logo_url}
              alt={channelConfig.company_name}
              className="h-16 w-auto object-contain"
            />
          ) : (
            <div
              className="w-16 h-16 flex items-center justify-center rounded"
              style={{ backgroundColor: channelConfig.primary_color }}
            >
              <Shield className="w-10 h-10 text-white" />
            </div>
          )}
          <div>
            {/* ✅ form_title solo en activo */}
            <h1 className="text-3xl font-bold text-black">
              {isActiveChannel(channelConfig)
                ? channelConfig.form_title
                : channelConfig.company_name}
            </h1>
            <p className="text-sm text-gray-600">{channelConfig.company_name}</p>
          </div>
        </div>

        {/* ✅ welcome_message solo en activo */}
        {isActiveChannel(channelConfig) && channelConfig.welcome_message && (
          <div className="text-gray-700 whitespace-pre-line border-t border-gray-200 pt-4">
            {channelConfig.welcome_message}
          </div>
        )}
      </div>

      {/* Alert canal inactivo */}
      {!channelConfig.can_receive_complaints && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm text-red-700 font-semibold">
                {channelConfig.subscription_message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form — solo si canal activo */}
      {isActiveChannel(channelConfig) && (
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Información del Denunciante */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-4">Información del Denunciante</h2>

            {/* ✅ allow_anonymous_complaints solo en activo — ya narroweado */}
            {channelConfig.allow_anonymous_complaints && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                <label className={`flex items-start gap-3 ${submitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleChange}
                    className="w-5 h-5 border-gray-300 mt-0.5"
                    style={{ accentColor: channelConfig.primary_color }}
                    disabled={submitting}
                  />
                  <div>
                    <p className="font-semibold text-black">Denunciar de forma anónima</p>
                    <p className="text-sm text-gray-600">Tu identidad será completamente confidencial</p>
                  </div>
                </label>
              </div>
            )}

            {!formData.is_anonymous && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tipo de relación *</label>
                  <select
                    name="complainant_type"
                    value={formData.complainant_type}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  >
                    <option value="">Selecciona...</option>
                    <option value="employee">Empleado</option>
                    <option value="supplier">Proveedor</option>
                    <option value="customer">Cliente</option>
                    <option value="external">Externo</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="complainant_name"
                      value={formData.complainant_name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="complainant_phone"
                      value={formData.complainant_phone}
                      onChange={handleChange}
                      disabled={submitting}
                      className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email *</label>
                  <input
                    type="email"
                    name="complainant_email"
                    value={formData.complainant_email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Relación con la empresa</label>
                  <input
                    type="text"
                    name="company_relationship"
                    value={formData.company_relationship}
                    onChange={handleChange}
                    placeholder="Ej: Empleado del departamento de..."
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Detalles de la Denuncia */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-4">Detalles de la Denuncia</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Categoría *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                >
                  <option value="">Selecciona una categoría...</option>
                  {activeCategories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tipo de denuncia *</label>
                  <select
                    name="complaint_type"
                    value={formData.complaint_type}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  >
                    <option value="">Selecciona un tipo...</option>
                    {complaintTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-black mb-2">Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Breve resumen de la situación"
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Descripción completa *</label>
                <textarea
                  name="full_description"
                  value={formData.full_description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe con detalle lo sucedido..."
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Fecha del incidente</label>
                  <input
                    type="date"
                    name="incident_date"
                    value={formData.incident_date}
                    onChange={handleChange}
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Lugar del incidente</label>
                  <input
                    type="text"
                    name="incident_location"
                    value={formData.incident_location}
                    onChange={handleChange}
                    placeholder="Ej: Oficina, Sucursal..."
                    disabled={submitting}
                    className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Área o departamento involucrado</label>
                <input
                  type="text"
                  name="involved_area"
                  value={formData.involved_area}
                  onChange={handleChange}
                  placeholder="Ej: Recursos Humanos, Ventas..."
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Personas involucradas</label>
                <textarea
                  name="involved_people"
                  value={formData.involved_people}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Nombres o descripciones..."
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Testigos</label>
                <textarea
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Personas que presenciaron los hechos..."
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Descripción de evidencia</label>
                <textarea
                  name="evidence_description"
                  value={formData.evidence_description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe cualquier evidencia..."
                  disabled={submitting}
                  className={`w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                />
              </div>
            </div>
          </div>

          {/* Campos Personalizados — ✅ narroweado dentro del form */}
          {channelConfig.custom_fields.length > 0 && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-4">Información Adicional</h2>
              <div className="space-y-4">
                {channelConfig.custom_fields.map((field: CustomField) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-black mb-2">{field.label}</label>
                    {field.type === 'text' ? (
                      <input
                        type="text"
                        value={formData.custom_fields[field.id] || ''}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        placeholder={field.label}
                        disabled={submitting}
                        className={`w-full px-4 py-3 border border-gray-200 outline-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                      />
                    ) : (
                      <textarea
                        value={formData.custom_fields[field.id] || ''}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        placeholder={field.label}
                        rows={4}
                        disabled={submitting}
                        className={`w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${submitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black'}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Archivos Adjuntos — ✅ narroweado dentro del form */}
          {channelConfig.allow_file_attachments && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-4">Archivos Adjuntos (Opcional)</h2>
              <div className="space-y-4">
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <Upload className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          disabled={submitting}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {files.length < channelConfig.max_files && (
                  <div>
                    <label className={`block px-4 py-8 border-2 border-dashed text-center transition-colors ${submitting ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-gray-400 cursor-pointer'}`}>
                      <Upload className={`w-8 h-8 mx-auto mb-2 ${submitting ? 'text-gray-300' : 'text-gray-400'}`} />
                      <span className={`text-sm block ${submitting ? 'text-gray-400' : 'text-gray-600'}`}>
                        Click para seleccionar archivos
                      </span>
                      <span className="text-xs text-gray-500 block mt-1">o arrastra y suelta aquí</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept={channelConfig.allowed_file_types.join(',')}
                        disabled={submitting}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Máximo {channelConfig.max_files} archivos. Tamaño máximo: {channelConfig.max_file_size_mb}MB por archivo.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-4 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded"
              style={{ backgroundColor: channelConfig.primary_color }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : 'Enviar Denuncia'}
            </button>
          </div>
        </form>
      )}

      {/* Footer — siempre visible, solo usa branding */}
      <div className="mt-8 text-center text-sm text-gray-600 bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4" style={{ color: channelConfig.primary_color }} />
          <p className="font-semibold">Canal Confidencial</p>
        </div>
        <p>Este canal es administrado por {channelConfig.company_name}</p>
        <p className="mt-2">Todas las denuncias son tratadas con confidencialidad y profesionalismo</p>
      </div>

    </div>
  </div>
);

}