import Image from "next/image"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 mr-4">
          <Image src="/images/midwest-solar-power-logo.png" alt="Midwest Solar Power" width={150} height={50} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/dashboard/history" className="transition-colors hover:text-primary">
            History
          </Link>
          <Link href="/dashboard/reports" className="transition-colors hover:text-primary">
            Reports
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
