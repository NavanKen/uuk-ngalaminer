const footerNavigation = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Galeri",
    href: "/",
  },
  {
    name: "Rekomendasi",
    href: "/",
  },
  {
    name: "Kuliner",
    href: "/",
  },
];

import { Link } from "react-router";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t mt-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
              NgalamIner
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-md">
              Jelajahi Kuliner Malang yang kaya akan cita rasa dan tradisi. Dari
              jajanan legendaris hingga makanan kekinian, setiap sajian
              menghadirkan kehangatan khas Kota Malang.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Navigasi
            </h3>
            <div className="flex flex-col gap-3">
              {footerNavigation.map((nav, key) => (
                <Link
                  key={key}
                  to={nav.href}
                  className="text-slate-600 hover:text-orange-600 text-sm transition-all duration-100 hover:translate-x-1 transform inline-block"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Kontak
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                <span>Kota Malang, Jawa Timur</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-orange-600" />
                <span>info@kulinermalang.id</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-orange-600" />
                <span>+62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 ApanApin. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link
                to="/privacy"
                className="hover:text-orange-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-orange-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
