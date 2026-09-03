import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { NavPage } from '../types';

interface ContactUsProps {
  onNavigate: (page: NavPage) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-16">

      {/* Header */}
      <div className="space-y-3 border-b border-[#E6E0D6] pb-6">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans">
          <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#1A1917] font-semibold">Contact Us</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1917] font-light">
          Get in Touch
        </h1>
        <p className="text-sm text-[#6B665E] max-w-xl font-sans leading-relaxed">
          Whether you have a question about our furniture, need help with a custom commission, or want to visit our showroom — we'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs p-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#8C7456] flex items-center justify-center mx-auto">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-2xl text-[#1A1917]">Thank You</h2>
              <p className="text-sm text-[#6B665E] font-sans max-w-md mx-auto">
                Your message has been received. Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-4 px-6 py-3 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors"
              >
                Return Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your first name"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-[#8C7456] transition-colors font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your last name"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-[#8C7456] transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-[#8C7456] transition-colors font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-[#8C7456] transition-colors font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] focus:outline-none focus:border-[#8C7456] transition-colors font-sans">
                  <option>General Inquiry</option>
                  <option>Custom Commission</option>
                  <option>Showroom Visit</option>
                  <option>Trade Partnership</option>
                  <option>Press & Media</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans font-semibold block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project or question..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#DDD6CB] rounded-xs text-sm text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-[#8C7456] transition-colors font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs p-6 space-y-6">
            <h3 className="font-serif text-lg text-[#1A1917]">Showroom Locations</h3>

            <div className="space-y-5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8C7456] mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A1917] block">Paris</span>
                  <span className="text-xs text-[#6B665E] font-sans">12 Rue de Sévigné, 75003</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8C7456] mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A1917] block">Milano</span>
                  <span className="text-xs text-[#6B665E] font-sans">Via Fiori Chiari 8, 20121</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8C7456] mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#1A1917] block">New York</span>
                  <span className="text-xs text-[#6B665E] font-sans">142 Wooster St, SoHo, NY 10012</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-[#8C7456]" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7E7A73] block font-sans">Phone</span>
                <span className="text-sm text-[#1A1917] font-sans">+33 1 42 72 10 10</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#8C7456]" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7E7A73] block font-sans">Email</span>
                <span className="text-sm text-[#1A1917] font-sans">hello@modernfurnitureworld.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-[#8C7456]" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7E7A73] block font-sans">Hours</span>
                <span className="text-sm text-[#1A1917] font-sans">Mon–Sat, 10:00–19:00</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-4 h-4 text-[#8C7456]" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7E7A73] block font-sans">Live Chat</span>
                <span className="text-sm text-[#1A1917] font-sans">Available Mon–Fri, 9:00–18:00 CET</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
