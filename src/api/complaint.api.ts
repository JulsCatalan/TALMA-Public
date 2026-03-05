import { API_URL } from "./http";
import type { ApiResponse } from "./http";
import type {
  SubmitPublicComplaintData,
  SubmitComplaintResponse,
} from "../types/complaint.types";

export const complaintApi = {
  /**
   * Submit public complaint / grievance / suggestion
   * POST /api/complaints/public/:slug/submit
   *
   * onProgress: callback con porcentaje 0-100 durante la subida
   */
  submitPublic: (
    slug: string,
    data: SubmitPublicComplaintData,
    files: File[] = [],
    onProgress?: (percent: number) => void
  ): Promise<ApiResponse<SubmitComplaintResponse>> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (key === "custom_fields") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      files.forEach(file => formData.append("files", file));

      const xhr = new XMLHttpRequest();

      if (onProgress) {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        });
      }

      xhr.addEventListener("load", async () => {
        try {
          const json = JSON.parse(xhr.responseText) as ApiResponse<SubmitComplaintResponse>;
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(json);
          } else {
            reject(new Error((json as { message?: string }).message ?? "Error al enviar"));
          }
        } catch {
          reject(new Error("Respuesta inválida del servidor"));
        }
      });

      xhr.addEventListener("error", () => reject(new Error("Error de red al enviar")));
      xhr.addEventListener("abort", () => reject(new Error("Envío cancelado")));

      xhr.open("POST", `${API_URL}/complaints/public/${slug}/submit`);
      xhr.send(formData);
    });
  },
};