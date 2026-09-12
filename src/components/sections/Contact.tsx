import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { SectionHeading } from '../ui/SectionHeading';
import { Toast } from '../ui/Toast';
import { contactService } from '../../services/contactService';
import { portfolioService } from '../../services/portfolioService';
import { profile } from '../../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: 'Please resolve the highlighted form errors before submitting.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmittedSuccess(false);

    try {
      await contactService.submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

      setSubmittedSuccess(true);
      setToast({
        message: 'Thank you! Your message has been sent successfully.',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      portfolioService.notifyDataChanged();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to submit contact message. Please try again.';
      setToast({
        message: msg,
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact Me"
          title="Get In Touch"
          subtitle="Feel free to reach out directly via email, phone, or LinkedIn, or send an inquiry below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Open to full-time Software Engineer, Java Full Stack Developer opportunities and collaborations.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* Email item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wide">
                      Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Mobile item */}
                {profile.mobileNumber && (
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wide">
                        Phone / Mobile
                      </span>
                      <a
                        href={`tel:${profile.mobileNumber.replace(/\s+/g, '')}`}
                        className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {profile.mobileNumber}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location item */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wide">
                      Location
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-5 border-t border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                  Professional Profiles
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {profile.social.linkedin && (
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-[#0A66C2] hover:border-slate-300 transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {profile.social.github && (
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the details below to send an email inquiry.
              </p>

              {/* Success Alert */}
              {submittedSuccess && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">Message Sent Successfully!</span>
                    <span>Thank you for reaching out. I will get back to you shortly.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name & Email fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      disabled={isSubmitting}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder-slate-400 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      disabled={isSubmitting}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder-slate-400 ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Opportunity for Software Engineer Role"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder-slate-400 ${
                      errors.subject
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.subject}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white text-slate-900 placeholder-slate-400 ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};
