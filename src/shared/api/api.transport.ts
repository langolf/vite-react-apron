import axios, { AxiosError } from "axios";
import { ApiErrorDataDtoSchema } from "./api.contracts";
import { normalizeValidationErrors } from "./api.lib";
import { API_BASE_URL } from "@/shared/config/config";

export const api = axios.create({ baseURL: API_BASE_URL });

export function attachAuthInterceptor(getAuthToken: () => string | undefined) {
  api.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const validation = ApiErrorDataDtoSchema.safeParse(error.response?.data);

    if (!validation.success) {
      return Promise.reject(error);
    }

    const normalizedErrorResponse = {
      ...error.response!,
      data: normalizeValidationErrors(validation.data),
    };

    return Promise.reject(
      new AxiosError(
        error.message,
        error.code,
        error.config,
        error.request,
        normalizedErrorResponse
      )
    );
  }
);
