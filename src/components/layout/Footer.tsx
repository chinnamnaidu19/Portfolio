import React from 'react';
import { ArrowUp, Code2, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { profile } from '../../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
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

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Professional Title */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-mono font-bold text-lg text-slate-900">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-sans font-bold">
                {profile.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {profile.professionalTitle} — Dedicated to engineering scalable software architectures, high-performance backends with Java & Spring Boot, and modern React interfaces.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Open to Software Engineering Opportunities</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.slice(0, 7).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Profiles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Connect
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {profile.social.github && (
                <li>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </li>
              )}

              {profile.social.linkedin && (
                <li>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0A66C2] transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </li>
              )}

              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-slate-600 hover:text-indigo-600 transition-colors truncate block"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-indigo-600 hover:border-indigo-400 transition-colors shadow-sm cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
