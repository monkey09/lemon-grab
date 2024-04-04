import { useLocale } from "next-intl"
import { isRtlLang } from "rtl-detect"
import { UseDirection } from "./types"

export const useDirection: UseDirection = () => 
  isRtlLang(useLocale()) ? "rtl" : "ltr"