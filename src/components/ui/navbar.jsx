import { motion, AnimatePresence } from "motion/react";
import { User, Menu, X, Home, LayoutGrid, Info, Utensils } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Beranda",
      href: "/",
      icon: Home,
    },
    {
      title: "Galery",
      href: "/menu",
      icon: LayoutGrid,
    },
    {
      title: "Rekomendasi",
      href: "/about",
      icon: Info,
    },
    {
      title: "Kuliner",
      href: "/contact",
      icon: Utensils,
    },
  ];

  const navIcon = [
    {
      icon: User,
      label: "Profile",
      href: "/auth/login",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="fixed w-full top-0 z-50">
        <div
          className={`mx-auto transition-all duration-300 ${
            isScrolled ? "md:max-w-7xl md:px-4 md:mt-4" : "w-full"
          }`}
        >
          <div
            className={`transition-all duration-300 ${
              isScrolled
                ? "md:bg-white/80 md:backdrop-blur-md md:shadow-2xl md:rounded-full bg-white/95 backdrop-blur-md shadow-lg"
                : "bg-transparent"
            }`}
          >
            <div className="md:px-20 px-4">
              <div className="flex justify-between items-center h-16 px-4">
                <div className="flex items-center space-x-3">
                  <button
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <div>
                      {isMobileMenuOpen ? (
                        <X size={24} className="text-gray-700" />
                      ) : (
                        <Menu size={24} className="text-gray-700" />
                      )}
                    </div>
                  </button>

                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    NgalamIner
                  </span>
                </div>

                <div className="hidden md:flex md:space-x-8 text-gray-700">
                  {navItems.slice(0, 4).map((nav, index) => (
                    <div key={index} className="relative group">
                      <Link
                        className="hover:text-orange-600 transition-colors duration-200 py-2 px-1 relative"
                        to={nav.href}
                      >
                        {nav.title}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 items-center text-gray-700">
                  {navIcon.map((item, index) => (
                    <Link
                      to={item.href}
                      className="p-2 hover:bg-gray-100 rounded-lg hover:text-orange-600 transition-all duration-200 ease-in-out relative group"
                      key={index}
                      title={item.label}
                    >
                      <item.icon size={20} />
                      <div className="absolute -inset-1 rounded-lg bg-orange-100 opacity-0 -z-10" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <motion.span
                    className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    NgalamIner
                  </motion.span>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <motion.div
                      animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <X size={24} className="text-gray-700" />
                    </motion.div>
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((nav, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
                    >
                      <Link
                        to={nav.href}
                        className="flex items-center space-x-4 p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group text-gray-700"
                        onClick={toggleMobileMenu}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-orange-100 text-orange-600"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <nav.icon size={20} />
                        </motion.div>
                        <span className="font-medium text-lg">{nav.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
