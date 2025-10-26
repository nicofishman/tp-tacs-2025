import {
  Calendar,
  Home,
  Info,
  LayoutDashboard,
  Mail,
  Menu,
  UserCircle,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "./auth-provider";
import UserMenu from "./user-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const publicLinks = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Calendar, label: "Eventos", to: "/events" },
    { icon: Info, label: "Acerca de", to: "/about" },
    { icon: Mail, label: "Contacto", to: "/contact" },
  ] as const;

  const roleLinks =
    user?.rol === "ORGANIZADOR"
      ? [{ icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" }]
      : user?.rol === "PARTICIPANTE"
        ? [
            {
              icon: UserCircle,
              label: "Mis inscripciones",
              to: "/my-inscriptions",
            },
          ]
        : [];

  const links = isAuthenticated ? [...roleLinks, ...publicLinks] : publicLinks;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-gray-200 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 font-bold text-gray-900 text-xl hover:text-blue-600"
          onClick={closeMobileMenu}
        >
          <Calendar className="h-6 w-6 text-blue-600" />
          <span>EventApp</span>
        </NavLink>

        {/* Links Desktop */}
        <nav className="hidden space-x-6 md:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-1 rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User menu + mobile */}
        <div className="flex items-center space-x-3">
          <UserMenu />
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-gray-200 border-t bg-white md:hidden">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-3 ${
                  isActive
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
