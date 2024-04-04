export interface UseFormData {
  <T extends Record<string, any>>(body: T): FormData
} 