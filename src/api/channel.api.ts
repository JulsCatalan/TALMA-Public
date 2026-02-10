// src/services/api/channel.api.ts
import { API_URL, getHeaders, handleResponse } from "./http";
import type {
  PublicChannelConfigResponse,
} from "../types/channel.types";

export const channelApi = {

  /**
   * Get public channel config (no auth)
   * GET /api/channel/config/:slug
   */
  getPublicConfig: async (slug: string) => {
    const response = await fetch(`${API_URL}/channel/config/${slug}`, {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse<PublicChannelConfigResponse>(response);
  }
};