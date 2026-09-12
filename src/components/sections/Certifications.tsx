import React, { useState, useEffect, useCallback } from 'react';
import { 
  Award, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { DataStateWrapper } from '../ui/DataStateWrapper';
import { certificationService } from '../../services/certificationService';
import { portfolioService } from '../../services/portfolioService';
import { certificationsData } from '../../data/portfolioData';
import type { CertificationItem } from '../../types/portfolio';

export const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationItem[]>(certificationsData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await certificationService.getCertifications();
      if (data && data.length > 0) {
        setCertifications(data);
      } else {
        setCertifications(certificationsData);
      }
    } catch (err) {
      console.warn('Certifications API fetch error, falling back to local dataset:', err);
      setError(null);
      setCertifications(certificationsData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
    const unsubscribe = portfolioService.onDataChanged(() => {
      fetchCertifications();
    });
    return () => unsubscribe();
  }, [fetchCertifications]);

  return (
    <section id="certifications" className="py-20 lg:py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Credentials"
          title="Credentials & Recognition"
          subtitle="Professional certifications and industry-recognized programs that reflect my technical skills, practical experience, and continuous learning."
        />

        <DataStateWrapper
          isLoading={isLoading}
          error={error}
          isEmpty={certifications.length === 0}
          onRetry={fetchCertifications}
          emptyTitle="No Certifications Found"
          emptyMessage="No certification credentials currently listed."
          skeletonType="grid"
          loadingCount={3}
        >
          <div className="space-y-8">
            {/* Subsection Header with Item Count Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl" role="img" aria-label="Scroll">📜</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Professional Certifications
                </h3>
              </div>
              <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {certifications.length} {certifications.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Responsive Grid: 3 columns on lg, 2 on md, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {certifications.map((cert) => {
                const certLink = cert.certificateUrl || cert.credentialUrl;
                const hasValidLink = Boolean(certLink && certLink.trim().length > 0);

                return (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                  >
                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600" />

                    <div className="space-y-4">
                      {/* Top Row: Icon, Organization, Date, and Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">
                              {cert.organization || cert.issuer}
                            </span>
                            {(cert.date || cert.issuedDate || cert.issueDate) && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                                <Calendar className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                                <span>{cert.date || cert.issuedDate || cert.issueDate}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {cert.badgeText && (
                          <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                            {cert.badgeText}
                          </span>
                        )}
                      </div>

                      {/* Certification Title */}
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pt-1 leading-snug">
                        {cert.title}
                      </h4>

                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {cert.type && (
                          <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {cert.type}
                          </span>
                        )}
                        {cert.status && (
                          <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {cert.status}
                          </span>
                        )}
                      </div>

                      {/* Public Credential ID (if applicable, e.g. TCS iON) */}
                      {Boolean(cert.credentialId && cert.credentialId.trim().length > 0) && (
                        <div className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                          Credential ID: <span className="text-slate-800 font-semibold select-all">{cert.credentialId}</span>
                        </div>
                      )}

                      {/* Description */}
                      {cert.description && (
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      {/* Skills Covered */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                            Skills Covered:
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill) => (
                              <Badge key={skill} variant="slate" size="sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer: Verified Credential & View Certificate button */}
                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Verified Credential</span>
                      </div>

                      {hasValidLink ? (
                        <a
                          href={certLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-xs cursor-pointer"
                        >
                          <span>View Certificate</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DataStateWrapper>
      </div>
    </section>
  );
};

export default Certifications;
