import { Calendar, Home, Info, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import UserMenu from "./user-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Calendar, label: "Eventos", to: "/events" },
    { icon: Info, label: "Acerca de", to: "/about" },
    { icon: Mail, label: "Contacto", to: "/contact" },
  ] as const;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-gray-200 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Desktop & Mobile Header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center space-x-2 font-bold text-gray-900 text-xl transition-colors hover:text-blue-600"
              onClick={closeMobileMenu}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block">EventApp</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 rounded-lg px-3 py-2 font-medium text-sm transition-all duration-200 hover:bg-gray-100 ${
                    isActive
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
                end
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-3 md:flex">
            {/* <ModeToggle /> */}
            <UserMenu />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* <ModeToggle /> */}
            <UserMenu />
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="relative z-50 border-gray-200 border-t bg-white md:hidden">
            <div className="space-y-2 py-4">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-lg px-4 py-3 font-medium text-base transition-all duration-200 ${
                      isActive
                        ? "border-blue-600 border-l-4 bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  end
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay - solo para cerrar al tocar fuera */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black bg-opacity-25 md:hidden"
          onClick={closeMobileMenu}
          style={{ top: "64px" }} // Empieza después del header
        />
      )}
    </header>
  );
}
