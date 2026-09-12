import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center'
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide mb-3 bg-indigo-50 text-indigo-700 border border-indigo-200/80 ${align === 'center' ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        <span>{badge}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
