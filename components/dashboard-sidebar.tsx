"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Home, History, Settings, Users, FileText, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ElementType
  title: string
  isActive?: boolean
  onClick?: () => void
}

function NavItem({ href, icon: Icon, title, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  )
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = "/dashboard" // In a real app, use usePathname() from next/navigation

  const navItems = [
    { href: "/dashboard", icon: Home, title: "Dashboard" },
    { href: "/dashboard/history", icon: History, title: "History" },
    { href: "/dashboard/reports", icon: FileText, title: "Reports" },
    { href: "/dashboard/analytics", icon: BarChart3, title: "Analytics" },
    { href: "/dashboard/team", icon: Users, title: "Team" },
    { href: "/dashboard/settings", icon: Settings, title: "Settings" },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={pathname === item.href}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden md:flex flex-col w-64 border-r bg-background h-[calc(100vh-4rem)]">{sidebarContent}</div>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2 mt-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
