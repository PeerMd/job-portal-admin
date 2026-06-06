import { useState } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Briefcase, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import useAppDispatch from "@/hooks/useAppDispatch"
import { logout } from "@/features/auth/authSlice"

const AdminLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/admin/login")
  }

  const navLinks = [
    {
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { to: "/admin/jobs", icon: <Briefcase size={18} />, label: "Jobs" },
  ]

  const SidebarContent = ({ showLabel }: { showLabel: boolean }) => (
    <>
      {/* Logo */}
      <div
        className={`border-b border-gray-700 flex items-center ${showLabel ? "p-6" : "p-4 justify-center"}`}
      >
        {showLabel ? (
          <h1 className="text-xl font-bold">Job Portal Admin</h1>
        ) : (
          <Briefcase size={22} />
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-3 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            title={link.label}
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center rounded-md transition-colors ${
                showLabel ? "gap-3 px-4 py-2" : "justify-center p-3"
              } ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`
            }
          >
            {link.icon}
            {showLabel && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className={`border-t border-gray-700 p-3`}>
        <button
          onClick={handleLogout}
          className={`flex items-center w-full rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors ${
            showLabel ? "gap-3 px-4 py-2" : "justify-center p-3"
          }`}
        >
          <LogOut size={18} />
          {showLabel && <span>Logout</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop Sidebar — full w-64 */}
      <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col flex-shrink-0">
        <SidebarContent showLabel={true} />
      </aside>

      {/* Tablet Sidebar — icon only w-16 */}
      <aside className="hidden md:flex lg:hidden w-16 bg-gray-900 text-white flex-col flex-shrink-0">
        <SidebarContent showLabel={false} />
      </aside>

      {/* Mobile Overlay Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          {/* Drawer */}
          <aside className="relative z-50 w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
            <SidebarContent showLabel={true} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center gap-4 px-4 py-3 bg-white border-b">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </Button>
          <h1 className="text-lg font-bold text-gray-800">Job Portal Admin</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-x-hidden overflow-y-auto">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
