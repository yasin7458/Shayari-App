import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { showToast } from '../components/Toast';
import { animatePageEnter } from '../animations/gsapAnimations';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaComments,
  FaCheckCircle,
} from 'react-icons/fa';

export const Contact = () => {
  const { t } = useLanguage();
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'submission',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    animatePageEnter(pageRef);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(t('contact.successTitle') || 'Message Delivered!', 'success');
      setFormData({ name: '', email: '', subject: 'submission', message: '' });
    }, 800);
  };

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#713B4A]/40 border border-[#D5AD70]/30 text-xs font-semibold text-[#F2DCC8] uppercase tracking-widest mb-4">
          <FaComments className="text-[#D5AD70]" />
          <span>Correspondence</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFF9F3] mb-4">
          {t('contact.title') || 'Get In Touch'}
        </h1>
        <p className="font-serif italic text-base md:text-lg text-[#F2DCC8]/80 leading-relaxed">
          {t('contact.subtitle') ||
            'Inquiries, poetic submissions, or heartfelt greetings.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl glass-panel border border-[#D5AD70]/25 shadow-card-luxury space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#F2DCC8] border-b border-[#D5AD70]/20 pb-3">
              {t('contact.infoTitle') || 'Studio & Office'}
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#713B4A]/50 border border-[#D5AD70]/30 flex items-center justify-center flex-shrink-0 text-[#D5AD70]">
                <FaMapMarkerAlt />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A8A5] font-semibold">
                  Location
                </span>
                <p className="text-sm text-[#FFF9F3] mt-0.5">
                  Heritage Poetry Pavilion, Arts District
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#713B4A]/50 border border-[#D5AD70]/30 flex items-center justify-center flex-shrink-0 text-[#D5AD70]">
                <FaEnvelope />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A8A5] font-semibold">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:kalam@shayarana.com"
                  className="text-sm text-[#D5AD70] hover:underline mt-0.5 block"
                >
                  kalam@shayarana.com
                </a>
              </div>
            </div>
          </div>

          {/* Poetic Note Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#713B4A]/30 to-[#241A24] border border-[#D5AD70]/20 text-xs text-[#B8A8A5] italic font-serif leading-relaxed">
            "Whether you wish to suggest a new couplet, report a typo, or collaborate with our literary community, we read every single correspondence with genuine warmth."
          </div>
        </div>

        {/* Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          <div className="p-8 md:p-10 rounded-3xl glass-panel border border-[#D5AD70]/30 shadow-card-luxury">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <FaCheckCircle className="text-5xl text-[#D5AD70] mx-auto animate-bounce" />
                <h3 className="text-2xl font-serif font-bold text-[#F2DCC8]">
                  {t('contact.successTitle') || 'Message Delivered!'}
                </h3>
                <p className="text-sm text-[#B8A8A5] max-w-sm mx-auto">
                  {t('contact.successDesc') ||
                    'Thank you! Your words have reached our desk. We shall reply shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#713B4A] border border-[#D5AD70]/50 text-xs font-semibold text-[#FFF9F3]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#F2DCC8] mb-2">
                    {t('contact.nameLabel') || 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.namePlaceholder') || 'e.g. Mirza / Rahat'}
                    className="w-full px-4 py-3 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] focus:outline-none focus:border-[#D5AD70] placeholder-[#B8A8A5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#F2DCC8] mb-2">
                    {t('contact.emailLabel') || 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.emailPlaceholder') || 'name@example.com'}
                    className="w-full px-4 py-3 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] focus:outline-none focus:border-[#D5AD70] placeholder-[#B8A8A5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#F2DCC8] mb-2">
                    {t('contact.subjectLabel') || 'Subject'}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-[#17121C] border border-[#D5AD70]/30 text-sm text-[#F2DCC8] focus:outline-none focus:border-[#D5AD70]"
                  >
                    <option value="submission">Poetry Submission / રચના મોકલો</option>
                    <option value="feedback">General Feedback / પ્રતિભાવ</option>
                    <option value="collaboration">Literary Collaboration / સહયોગ</option>
                    <option value="other">Other Inquiry / અન્ય</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#F2DCC8] mb-2">
                    {t('contact.messageLabel') || 'Your Message / Couplet'} *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.messagePlaceholder') || 'Write your message or verse here...'}
                    className="w-full px-4 py-3 rounded-2xl bg-[#17121C]/80 border border-[#D5AD70]/30 text-sm text-[#FFF9F3] focus:outline-none focus:border-[#D5AD70] placeholder-[#B8A8A5]/50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#713B4A] via-[#8A4A5B] to-[#713B4A] border border-[#D5AD70]/60 text-sm font-semibold text-[#FFF9F3] shadow-gold-glow hover:shadow-gold-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>{isSubmitting ? t('contact.submitting') || 'Delivering...' : t('contact.submitBtn') || 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
