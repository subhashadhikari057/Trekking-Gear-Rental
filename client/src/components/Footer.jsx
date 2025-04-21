import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About / Contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#4338ca] tracking-wide">TREKGEAR</h2>
              <div className="h-1 w-12 bg-[#4338ca] mt-2 mb-4"></div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Premium trekking and outdoor equipment rental for adventurers of all levels.
            </p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 mt-1 text-[#4338ca] group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Gyaneshwor,Kathmandu
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-[#4338ca] group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">9800000000</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-[#4338ca] group-hover:text-indigo-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">info@trekgear.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <div className="h-1 w-12 bg-[#4338ca] mt-2 mb-4"></div>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li><Link to="/" className="hover:text-[#4338ca] hover:translate-x-1 duration-200">Home</Link></li>
              <li><Link to="/browse-gear" className="hover:text-[#4338ca] hover:translate-x-1 duration-200">Browse Gear</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#4338ca] hover:translate-x-1 duration-200">How It Works</Link></li>
              <li><Link to="/about-us" className="hover:text-[#4338ca] hover:translate-x-1 duration-200">About Us</Link></li>
              <li><Link to="/FAQ" className="hover:text-[#4338ca] hover:translate-x-1 duration-200">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
              <div className="h-1 w-12 bg-[#4338ca] mt-2 mb-4"></div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Subscribe to our newsletter for the latest gear updates and special offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4338ca]"
              />
              <button className="w-full px-4 py-2 bg-[#4338ca] hover:bg-indigo-800 text-white font-medium rounded">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-slate-800 p-2.5 rounded-full hover:bg-[#4338ca] transition-all duration-300 hover:scale-110"
                  aria-label={Icon.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-950 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} TrekGear. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-slate-400 text-sm hover:text-[#4338ca] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-slate-400 text-sm hover:text-[#4338ca] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
