// src/pages/PublicComplaintForm.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, AlertCircle, Loader2, CheckCircle2, Upload, X } from 'lucide-react';
import { channelApi } from '../api/channel.api';
import { complaintApi } from '../api/complaint.api';
import toast from 'react-hot-toast';
import type { PublicChannelConfig, ComplaintCategories } from '../types/channel.types';

export default function PublicComplaintForm() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [submitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [channelConfig, setChannelConfig] = useState<PublicChannelConfig | null>(null);
  const [error, setError] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
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
        const config = response.data as PublicChannelConfig;

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

        if (!config.can_receive_complaints) {
          setError(
            config.subscription_message || 'Este canal no está disponible'
          );
        }
      } else {
        setChannelConfig(null);
        setError('Canal no encontrado');
      }
    } catch (error: any) {
      setChannelConfig(null);
      setError(error.message || 'Canal no encontrado');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      category: e.target.value,
      complaint_type: '' // Reset complaint_type cuando cambia la categoría
    });
  };

  const handleCustomFieldChange = (fieldId: string, value: string) => {
    setFormData({
      ...formData,
      custom_fields: {
        ...formData.custom_fields,
        [fieldId]: value
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (!channelConfig) return;
    
    if (files.length + selectedFiles.length > channelConfig.max_files) {
      toast.error(`Máximo ${channelConfig.max_files} archivos permitidos`);
      return;
    }

    const maxSizeMB = channelConfig.max_file_size_mb;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    for (const file of selectedFiles) {
      if (file.size > maxSizeBytes) {
        toast.error(`El archivo ${file.name} supera el tamaño máximo de ${maxSizeMB}MB`);
        return;
      }
    }

    setFiles([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validaciones mínimas
  if (!formData.category || !formData.complaint_type || !formData.title.trim()) {
    toast.error('Completa los campos requeridos');
    return;
  }

  if (!formData.is_anonymous) {
    if (!formData.complainant_name?.trim()) {
      toast.error('El nombre es requerido si la denuncia no es anónima');
      return;
    }

    if (!formData.complainant_email?.trim()) {
      toast.error('El email es requerido si la denuncia no es anónima');
      return;
    }
  }

  try {
    setLoading(true);

   const response = await complaintApi.submitPublic(slug!, formData, files);

if (!response.data) {
  throw new Error('Respuesta inválida del servidor');
}

setFolio(response.data.folio);
setTrackingCode(response.data.tracking_code ?? '');
setSubmitted(true);


    toast.success('Denuncia enviada correctamente');

  } catch (error: any) {
    toast.error(error.message || 'Error al enviar la denuncia');
  } finally {
    setLoading(false);
  }
};


  // Obtener las categorías activas
  const getActiveCategories = (): Array<{key: string, label: string}> => {
    if (!channelConfig?.complaint_categories) return [];
    
    return Object.entries(channelConfig.complaint_categories)
      .filter(([_, category]) => category.enabled)
      .map(([key, category]) => ({ key, label: category.label }));
  };

  // Obtener los tipos de denuncia de la categoría seleccionada
  const getComplaintTypesForCategory = () => {
    if (!channelConfig?.complaint_categories || !formData.category) return [];
    
    const category = channelConfig.complaint_categories[formData.category as keyof ComplaintCategories];
    if (!category) return [];
    
    return category.complaints.filter(complaint => complaint.enabled !== false);
  };

  const complainantTypeLabels: Record<string, string> = {
    employee: 'Empleado',
    supplier: 'Proveedor',
    customer: 'Cliente',
    external: 'Externo'
  };

  const isDisabled = !channelConfig?.can_receive_complaints;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-red mx-auto mb-4" />
          <p className="text-gray-600">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  if (error && !channelConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Canal no disponible</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!channelConfig) {
    return null;
  }

  if (submitted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: channelConfig.secondary_color }}
      >
        <div className="max-w-2xl w-full bg-white border border-gray-200 p-8 text-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${channelConfig.primary_color}20` }}
          >
            <CheckCircle2 
              className="w-8 h-8"
              style={{ color: channelConfig.primary_color }}
            />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">
            ¡Denuncia Recibida!
          </h2>
          <div className="text-gray-600 mb-6 whitespace-pre-line">
            {channelConfig.confirmation_message || 
              'Gracias por tu denuncia. Hemos recibido tu información y será revisada por nuestro equipo legal. Te contactaremos pronto.'}
          </div>
          
          <div className="bg-gray-50 border border-gray-200 p-4 mb-4">
            <p className="font-semibold text-gray-800 mb-2">Folio de la Denuncia:</p>
            <p className="text-2xl font-bold text-black font-mono">
              {folio}
            </p>
          </div>

          {formData.is_anonymous && trackingCode && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm text-left">
              <p className="font-semibold text-yellow-800 mb-2">Código de Seguimiento Anónimo:</p>
              <p className="text-xl text-yellow-700 font-mono font-bold">
                {trackingCode}
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                ⚠️ Guarda este código para dar seguimiento a tu denuncia de forma anónima
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const inputClassName = `w-full px-4 py-3 border border-gray-200 outline-none transition-all ${
    isDisabled 
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
      : 'bg-white text-black hover:border-gray-300 focus:border-gray-400'
  }`;

  const selectClassName = `w-full px-4 py-3 border border-gray-200 outline-none transition-all ${
    isDisabled 
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
      : 'bg-white text-black hover:border-gray-300 focus:border-gray-400'
  }`;

  const textareaClassName = `w-full px-4 py-3 border border-gray-200 outline-none resize-none transition-all ${
    isDisabled 
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
      : 'bg-white text-black hover:border-gray-300 focus:border-gray-400'
  }`;

  const activeCategories = getActiveCategories();
  const complaintTypes = getComplaintTypesForCategory();

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
              <h1 className="text-3xl font-bold text-black">
                {channelConfig.form_title}
              </h1>
              <p className="text-sm text-gray-600">{channelConfig.company_name}</p>
            </div>
          </div>

          {channelConfig.welcome_message && (
            <div className="text-gray-700 whitespace-pre-line border-t border-gray-200 pt-4">
              {channelConfig.welcome_message}
            </div>
          )}
        </div>

        {/* Alert */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Denunciante */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-4">Información del Denunciante</h2>
            
            {channelConfig.allow_anonymous_complaints && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                <label className={`flex items-start gap-3 ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    name="is_anonymous"
                    checked={formData.is_anonymous}
                    onChange={handleChange}
                    className="w-5 h-5 text-brand-red border-gray-300 focus:ring-brand-red mt-0.5"
                    style={{ accentColor: channelConfig.primary_color }}
                    disabled={isDisabled}
                  />
                  <div>
                    <p className="font-semibold text-black">Denunciar de forma anónima</p>
                    <p className="text-sm text-gray-600">
                      Tu identidad será completamente confidencial
                    </p>
                  </div>
                </label>
              </div>
            )}

            {!formData.is_anonymous && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Tipo de relación *
                  </label>
                  <select
                    name="complainant_type"
                    value={formData.complainant_type}
                    onChange={handleChange}
                    required
                    className={selectClassName}
                    disabled={isDisabled}
                  >
                    <option value="">Selecciona...</option>
                    {Object.entries(complainantTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="complainant_name"
                      value={formData.complainant_name}
                      onChange={handleChange}
                      required={!formData.is_anonymous}
                      className={inputClassName}
                      disabled={isDisabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="complainant_phone"
                      value={formData.complainant_phone}
                      onChange={handleChange}
                      className={inputClassName}
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="complainant_email"
                    value={formData.complainant_email}
                    onChange={handleChange}
                    required={!formData.is_anonymous}
                    className={inputClassName}
                    disabled={isDisabled}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Relación con la empresa
                  </label>
                  <input
                    type="text"
                    name="company_relationship"
                    value={formData.company_relationship}
                    onChange={handleChange}
                    placeholder="Ej: Empleado del departamento de..."
                    className={inputClassName}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Detalles de la Denuncia */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-black mb-4">Detalles de la Denuncia</h2>
            
            <div className="space-y-4">
              {/* Categoría de denuncia */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Categoría de denuncia *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  required
                  className={selectClassName}
                  disabled={isDisabled}
                >
                  <option value="">Selecciona una categoría...</option>
                  {activeCategories.map(category => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo específico de denuncia */}
              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Tipo de denuncia *
                  </label>
                  <select
                    name="complaint_type"
                    value={formData.complaint_type}
                    onChange={handleChange}
                    required
                    className={selectClassName}
                    disabled={isDisabled}
                  >
                    <option value="">Selecciona un tipo...</option>
                    {complaintTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Título de la denuncia *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Breve resumen de la situación"
                  className={inputClassName}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Descripción completa *
                </label>
                <textarea
                  name="full_description"
                  value={formData.full_description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe con detalle lo sucedido..."
                  className={textareaClassName}
                  disabled={isDisabled}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Fecha del incidente
                  </label>
                  <input
                    type="date"
                    name="incident_date"
                    value={formData.incident_date}
                    onChange={handleChange}
                    className={inputClassName}
                    disabled={isDisabled}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Lugar del incidente
                  </label>
                  <input
                    type="text"
                    name="incident_location"
                    value={formData.incident_location}
                    onChange={handleChange}
                    placeholder="Ej: Oficina, Sucursal..."
                    className={inputClassName}
                    disabled={isDisabled}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Área o departamento involucrado
                </label>
                <input
                  type="text"
                  name="involved_area"
                  value={formData.involved_area}
                  onChange={handleChange}
                  placeholder="Ej: Recursos Humanos, Ventas..."
                  className={inputClassName}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Personas involucradas
                </label>
                <textarea
                  name="involved_people"
                  value={formData.involved_people}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Nombres o descripciones de las personas involucradas..."
                  className={textareaClassName}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Testigos
                </label>
                <textarea
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Personas que presenciaron los hechos..."
                  className={textareaClassName}
                  disabled={isDisabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Descripción de evidencia
                </label>
                <textarea
                  name="evidence_description"
                  value={formData.evidence_description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe cualquier evidencia que respalde tu denuncia..."
                  className={textareaClassName}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>

          {/* Campos Personalizados */}
          {channelConfig.custom_fields && channelConfig.custom_fields.length > 0 && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-black mb-4">Información Adicional</h2>
              
              <div className="space-y-4">
                {channelConfig.custom_fields.map((field: any) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-black mb-2">
                      {field.label}
                    </label>
                    {field.type === 'text' ? (
                      <input
                        type="text"
                        value={formData.custom_fields[field.id] || ''}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        placeholder={field.label}
                        className={inputClassName}
                        disabled={isDisabled}
                      />
                    ) : (
                      <textarea
                        value={formData.custom_fields[field.id] || ''}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                        placeholder={field.label}
                        rows={4}
                        className={textareaClassName}
                        disabled={isDisabled}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Archivos Adjuntos */}
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
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          disabled={isDisabled}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {files.length < channelConfig.max_files && (
                  <div>
                    <label 
                      className={`block px-4 py-8 border-2 border-dashed text-center transition-colors ${
                        isDisabled 
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                          : 'border-gray-300 hover:border-gray-400 cursor-pointer'
                      }`}
                    >
                      <Upload className={`w-8 h-8 mx-auto mb-2 ${isDisabled ? 'text-gray-300' : 'text-gray-400'}`} />
                      <span className={`text-sm block ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                        Click para seleccionar archivos
                      </span>
                      <span className="text-xs text-gray-500 block mt-1">
                        o arrastra y suelta aquí
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept={channelConfig.allowed_file_types.join(',')}
                        disabled={isDisabled}
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={isDisabled || submitting}
              className="px-8 py-4 text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded"
              style={{ backgroundColor: channelConfig.primary_color }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Denuncia'
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4" style={{ color: channelConfig.primary_color }} />
            <p className="font-semibold">Canal Confidencial</p>
          </div>
          <p>
            Este canal es administrado por {channelConfig.company_name}
          </p>
          <p className="mt-2">
            Todas las denuncias son tratadas con confidencialidad y profesionalismo
          </p>
        </div>
      </div>
    </div>
  );
}