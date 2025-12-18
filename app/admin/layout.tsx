import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='px-4 flex-1 bg-gradient-to-t from-[#FE4F70]/40 to-[#FFA387]/40 overflow-x-auto'> {/* ADD overflow-x-auto */}
        <SidebarTrigger className="md:hidden"/>
        {children}
      </main>
    </SidebarProvider>
  );
}