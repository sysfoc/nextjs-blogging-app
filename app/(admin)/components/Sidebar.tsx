import {
  Folder,
  Home,
  Inbox,
  Newspaper,
  Pen,
  Pencil,
  Rss,
  Tag,
  UserRoundPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Visit Site",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/admin",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UserRoundPlus,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: Folder,
  },
  {
    title: "Sub-categories",
    url: "/admin/sub-category",
    icon: Tag,
  },
  {
    title: "Posts",
    url: "/admin/blogs",
    icon: Pencil,
  },
  {
    title: "Blogs",
    url: "/admin/blog-posts",
    icon: Rss,
  },
  {
    title: "News",
    url: "/admin/news",
    icon: Newspaper,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild>
                <Link href='/admin' className='!text-white hover:!bg-white/10'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg border border-white text-sidebar-primary-foreground'>
                    <Pen className='size-4' />
                  </div>
                  <div className='flex flex-col gap-0.5 leading-none'>
                    <span className='font-semibold'>Next Blogging</span>
                    <span className='text-xs'>Admin Panel</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className='!text-white'>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className='!text-white hover:!bg-white/10'
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
