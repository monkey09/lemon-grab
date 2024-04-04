import { AppShell } from "@/components/bytes"
import { Navbar, Sidebar } from "@/components/layout"

export interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: Readonly<MainLayoutProps>) => {
  return (
    <AppShell navbar={<Navbar />} sidebar={<Sidebar />}>
      {children}
    </AppShell>
  )
}

export default MainLayout