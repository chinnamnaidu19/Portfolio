import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  User
} from 'lucide-react';
import { 
  GithubIcon, 
  LinkedinIcon 
} from '../ui/Icons';
import { profile } from '../../data/profile';
import { analyticsService } from '../../services/analyticsService';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleDownloadResume = () => {
    analyticsService.trackEvent('RESUME_DOWNLOAD', 'Hero_Resume_Download');
    const link = document.createElement('a');
    link.href = profile.resumeURL;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 bg-white overflow-hidden"
    >
      {/* Very subtle background accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Desktop grid layout / Mobile stacked layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Mobile Profile Photo (Shown on top for mobile screens) */}
          <div className="lg:hidden flex justify-center pt-2">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-white border border-slate-200 shadow-sm overflow-hidden">
                {!imageError ? (
                  <img
                    src={profile.profilePhoto}
                    alt={`${profile.name} - Software Engineer`}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center rounded-xl text-slate-400 p-2 text-center">
                    <User className="w-10 h-10 mb-1 text-slate-400" />
                    <span className="text-[10px] font-mono font-medium">Add photo in /public/images/profile.jpg</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Left Column - Main Intro, Headings, Bio, CTAs & Socials */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-indigo-600">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {profile.name}
              </h1>
              <div className="pt-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
                  {profile.professionalTitle}
                </h2>
              </div>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profile.shortBio}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Primary Filled Button */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Outlined Button */}
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-indigo-600" />
                <span>Download Resume</span>
              </button>

              {/* Contact Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Platform Links */}
            <div className="pt-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {profile.social.github && (
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-medium transition-all shadow-sm"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}

                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-[#0A66C2] text-xs font-medium transition-all shadow-sm"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column - Desktop Profile Photo Card */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-sm">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Photo container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {!imageError ? (
                    <img
                      src={profile.profilePhoto}
                      alt={`${profile.name} - Software Engineer`}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                      <User className="w-16 h-16 mb-2 text-slate-300" />
                      <p className="text-xs font-medium text-slate-600">{profile.name}</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Place your photo at /public/images/profile.jpg
                      </p>
                    </div>
                  )}
                </div>

                {/* Profile Badge details */}
                <div className="pt-4 pb-1 text-center">
                  <h3 className="font-bold text-base text-slate-900">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-medium text-indigo-600 mt-0.5">
                    {profile.professionalTitle}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
                    <span>📍 {profile.location}</span>
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
