import React from 'react';
import {
  Shield,
  Bell,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter
} from 'react-icons/fa6';

export const PremiumFooter = () => {
  return (
    <footer id="contact" className="relative w-full bg-[#050505] pt-32 pb-6 flex flex-col items-center border-t border-white/[0.05] z-20">

      {/* Background Ambient Effects - Matching SINC 3D theme */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-[#23abe6]/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#23abe6]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Banner */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1728px] bg-[#23abe6] border border-cyan-500/20 rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-[0_0_40px_rgba(35,171,230,0.2)] z-20">
        <div className="mb-8 md:mb-0">
          <h2 className="text-white font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
            Don't Miss Out<br />the Future!
          </h2>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto">
          {/* Email Input Group */}
          <div className="flex items-center bg-white rounded-full p-2 pl-6 w-full md:w-[450px] shadow-lg shadow-black/10">
            <input
              type="email"
              placeholder="Enter email here..."
              className="bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none flex-grow text-sm"
            />
            <button className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white text-xs font-semibold py-3 px-5 rounded-full transition-colors shadow-md">
              Subscribe Now
              <span className="bg-[#23abe6] text-white rounded-full p-1.5 ml-2">
                <Bell size={14} fill="currentColor" />
              </span>
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 justify-start md:justify-end text-white">
            <span className="text-sm font-semibold">Follow us:</span>
            <div className="flex gap-2">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter].map((Icon, idx) => (
                <a key={idx} href="#" className="bg-black/20 hover:bg-[#23abe6] text-white p-2 rounded-full transition-colors shadow-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[1728px] mx-auto px-6 lg:px-0 mt-12 relative z-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="SINC 3D Logo" className="h-[45px] md:h-[60px] w-auto object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
              Every great solution start understand the time into learn about.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <a href="#" className="flex items-center gap-3 bg-[#0a0a0a] hover:bg-[#151515] rounded-lg px-4 py-2.5 w-[160px] transition-colors border border-white/5">
                <FaGooglePlay className="text-white" size={24} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/60 leading-none">GET IT ON</span>
                  <span className="text-sm font-semibold text-white leading-tight">Google Play</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-[#0a0a0a] hover:bg-[#151515] rounded-lg px-4 py-2.5 w-[160px] transition-colors border border-white/5">
                <FaApple className="text-white" size={24} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/60 leading-none">Download on the</span>
                  <span className="text-sm font-semibold text-white leading-tight">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-white text-[17px] font-semibold">Services</h4>
            <ul className="flex flex-col gap-4">
              {["Manage IT Service", "Cloud Computing", "Cyber Security", "Software Develop", "Change Manage", "IT Consulting"].map(lnk => (
                <li key={lnk}>
                  <a href="#" className="text-white/50 hover:text-[#23abe6] text-[15px] transition-colors duration-200">
                    {lnk}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h4 className="text-white text-[17px] font-semibold">Resources</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Contact Us" },
                { name: "Privacy Policy" },
                { name: "Recognitions" },
                { name: "Careers", badge: "NEW" },
                { name: "News" },
                { name: "Feedback" }
              ].map(lnk => (
                <li key={lnk.name}>
                  <a href="#" className="text-white/50 hover:text-[#23abe6] text-[15px] transition-colors duration-200 flex items-center gap-2">
                    {lnk.name}
                    {lnk.badge && (
                      <span className="bg-[#23abe6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                        {lnk.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-white text-[17px] font-semibold">Contact Info</h4>
            <div className="flex flex-col gap-5 text-white/50 text-[15px]">
              <p className="leading-relaxed">
                993 Renner Burg, West Rond,<br />MT 94251-030
              </p>
              <div className="flex flex-col gap-2">
                <p><strong className="text-white font-semibold">P:</strong> +1 (009) 544-7818</p>
                <p><strong className="text-white font-semibold">E:</strong> support@sinc3d.com</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={16} className="text-[#23abe6]" />
                <span>Mon-Fri 09am-06pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-10 md:pt-12 pb-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="text-white/50 text-sm">
            <strong className="text-white font-semibold">SINC 3D</strong> &copy; {new Date().getFullYear()}. All right reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy & Policy</a>
            <span className="text-white/20">•</span>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
