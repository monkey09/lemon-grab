import { useIsFile } from ".."
import { UseHasFiles } from "./types"

export const useHasFiles: UseHasFiles = body => 
  !!Object.values(body).find(item => 
    useIsFile(item) || (Array.isArray(item) && useIsFile(item[0])))