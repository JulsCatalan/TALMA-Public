import { API_URL, handleResponse } from "./http";
import type {
  ApiResponse,
} from "./http";

import type {
  SubmitPublicComplaintData,
  SubmitComplaintResponse,
} from "../types/complaint.types";

export const complaintApi = {
  /**
   * Submit public complaint
   * POST /api/complaints/public/:slug/submit
   */
  submitPublic: async (
    slug: string,
    data: SubmitPublicComplaintData,
    files: File[] = []
  ): Promise<ApiResponse<SubmitComplaintResponse>> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "custom_fields") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    files.forEach(file => {
      formData.append("files", file);
    });

    const response = await fetch(
      `${API_URL}/complaints/public/${slug}/submit`,
      {
        method: "POST",
        body: formData,
      }
    );

    return handleResponse<SubmitComplaintResponse>(response);
  },
};
