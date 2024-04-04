import { useTranslations } from "next-intl"
import { Cities } from "@/components/sections"

const HomePage = () => {
  const t = useTranslations()
  return (
    <section>
      <Cities />
    </section>
  )
}

export default HomePage