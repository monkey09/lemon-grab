import { AppShellProps } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"

export const AppShell = ({ navbar, sidebar, children }: AppShellProps) => {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 h-[60px] border-b bg-background z-10">
        {navbar}
      </header>
      <aside className="fixed right-0 top-0 bottom-0 w-[300px] mt-[60px] border-l">
        {sidebar}
      </aside>
      <main className="pt-[60px] h-screen overflow-hidden px-[300px]">
        <ScrollArea className="w-full h-full app-shell-scroll-area">
          <div className="px-3 pt-3">
            {children}
          </div>
        </ScrollArea>
      </main>
      <aside className="fixed left-0 top-0 bottom-0 w-[300px] mt-[60px] border-r">
        {/* {sidebar} */}
      </aside>
    </>
  )
}