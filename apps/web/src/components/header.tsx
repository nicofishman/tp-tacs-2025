import { NavLink } from "react-router";
import { useState } from "react";
import { Menu, X, Calendar, Home, Info, Mail } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const links = [
		{ to: "/", label: "Home", icon: Home },
		{ to: "/events", label: "Eventos", icon: Calendar },
		{ to: "/about", label: "Acerca de", icon: Info },
		{ to: "/contact", label: "Contacto", icon: Mail },
	] as const;

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
			<div className="container mx-auto px-4">
				{/* Desktop & Mobile Header */}
				<div className="flex items-center justify-between h-16">
					{/* Logo/Brand */}
					<div className="flex-shrink-0">
						<NavLink 
							to="/" 
							className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
							onClick={closeMobileMenu}
						>
							<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<Calendar className="w-5 h-5 text-white" />
							</div>
							<span className="hidden sm:block">EventApp</span>
						</NavLink>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{links.map(({ to, label, icon: Icon }) => (
							<NavLink
								key={to}
								to={to}
								className={({ isActive }) =>
									`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
										isActive
											? "text-blue-600 bg-blue-50 font-semibold"
											: "text-gray-700 hover:text-gray-900"
									}`
								}
								end
							>
								<Icon className="w-4 h-4" />
								<span>{label}</span>
							</NavLink>
						))}
					</nav>

					{/* Desktop Actions */}
					<div className="hidden md:flex items-center space-x-3">
						{/* <ModeToggle /> */}
						<UserMenu />
					</div>

					{/* Mobile Actions */}
					<div className="flex items-center space-x-3 md:hidden">
						{/* <ModeToggle /> */}
						<UserMenu />
						<button
							onClick={toggleMobileMenu}
							className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-gray-200 bg-white relative z-50">
						<div className="py-4 space-y-2">
							{links.map(({ to, label, icon: Icon }) => (
								<NavLink
									key={to}
									to={to}
									onClick={closeMobileMenu}
									className={({ isActive }) =>
										`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
											isActive
												? "text-blue-600 bg-blue-50 font-semibold border-l-4 border-blue-600"
												: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										}`
									}
									end
								>
									<Icon className="w-5 h-5" />
									<span>{label}</span>
								</NavLink>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Mobile Menu Overlay - solo para cerrar al tocar fuera */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
					onClick={closeMobileMenu}
					style={{ top: '64px' }} // Empieza después del header
				/>
			)}
		</header>
	);
}