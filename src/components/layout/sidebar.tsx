'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  LayoutDashboard,
  UsersRound,
  PieChart,
  FlaskConical,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admissions', label: 'Admissions', icon: UsersRound, isAlias: (p: string) => p.startsWith('/patients') },
    { href: '/insights', label: 'Insights', icon: PieChart },
    { href: '/tools/alert-summarizer', label: 'AI Summarizer', icon: FlaskConical, isAlias: (p: string) => p.startsWith('/tools') },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
             <HeartPulse className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold font-headline text-sidebar-foreground">
            Bio Vision
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                    isActive={pathname === item.href || (item.isAlias && item.isAlias(pathname))}
                    className="w-full justify-start"
                    tooltip={item.label}
                >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/settings" passHref>
              <SidebarMenuButton
                isActive={pathname === '/settings'}
                className="w-full justify-start"
                tooltip="Settings"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
