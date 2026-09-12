import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Code2, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' }
  ];

  const sectionIds = navItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2 font-mono font-bold text-base sm:text-lg text-slate-900"
          >
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-sans font-bold tracking-tight text-slate-900">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50 p-1.5 rounded-full border border-slate-200">
            {navItems.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Resume button */}
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#resume');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-indigo-600/30 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 mt-2 px-4 pt-2 pb-6 space-y-2 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navItems.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <div className="flex gap-2">
              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#resume');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-50"
              >
                <span>Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
