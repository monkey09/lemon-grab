export interface UseHasFiles {
  <T extends Record<string, unknown>>(body: T): boolean
}