"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  User,
  Inbox,
  MessageCircle,
  Handshake,
  Clock,
  Wallet,
  Settings,
  Building2,
  Search,
  Send,
  LogOut,
  ChevronsUpDown,
} from "lucide-react"

const ICON_MAP = {
  LayoutDashboard,
  User,
  Inbox,
  MessageCircle,
  Handshake,
  Clock,
  Wallet,
  Settings,
  Building2,
  Search,
  Send,
}

interface NavItem {
  title: string
  href: string
  icon: keyof typeof ICON_MAP
  badge?: number
}

interface AppSidebarProps {
  items: NavItem[]
  spaceLabel: string
}

export function AppSidebar({ items, spaceLabel }: AppSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="text-lg font-bold text-primary group-data-[collapsible=icon]:hidden">
          CollabWithMe
        </Link>
        <Link href="/" className="text-lg font-bold text-primary hidden group-data-[collapsible=icon]:block">
          C
        </Link>
        <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          {spaceLabel}
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = ICON_MAP[item.icon]
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && item.badge > 0 && (
                      <SidebarMenuBadge className="bg-destructive text-destructive-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {user?.name.split(" ").map((n) => n[0]).join("") ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name ?? "Utilisateur"}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email ?? ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/">Accueil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Deconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
