// src/services/api/http.ts

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

// Manejo de respuestas
export const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const data = await response.json();

  if (!response.ok) {
    throw {
      success: false,
      message: data.message || "Error en la petición",
      errors: data.errors
    };
  }

  return data;
};

// Headers globales
export const getHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

export { API_URL };
export type { ApiResponse };
