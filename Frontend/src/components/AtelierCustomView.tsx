import React, { useState } from 'react';
import { ShieldCheck, Compass, Check, ArrowRight, Upload, Phone, Mail, MapPin } from 'lucide-react';
import { Currency } from '../types';

interface AtelierCustomViewProps {
  currency: Currency;
  onOpenAppointmentModal: () => void;
  onOpenSwatchModal: () => void;
}

export const AtelierCustomView: React.FC<AtelierCustomViewProps> = ({
  currency,
  onOpenAppointmentModal,
  onOpenSwatchModal,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    projectType: 'Residential Residence',
    location: '',
    timberPreference: 'French Canal Walnut',
    dimensionsNotes: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20">
      
      {/* 1. Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3">
          <span>Modern Furniture World • Custom Commissions</span>
          <span>Vallée de la Vézère, France</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline pt-4">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
              Bespoke Craft Guild
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1917] tracking-tight">
              The Dordogne Atelier & <br />
              <span className="italic font-normal">Custom Commissions.</span>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              Where French cabinetmaking heritage meets contemporary spatial restraint. We collaborate with private collectors, interior architects, and foundations to craft monolithic pieces built for generational longevity.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Philosophy & Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
            Craft Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light leading-snug">
            Three Hundred Years of Joinery Restraint.
          </h2>
          <p className="text-xs sm:text-[14px] text-[#5C5750] leading-relaxed font-sans">
            In our riverside workshop situated in the Dordogne valley, every timber log is inspected by master cabinetmaker Pierre Perrin. We refuse chemical desiccators, synthetic polyurethanes, or metal fastener joints that degrade over time.
          </p>
          <p className="text-xs sm:text-[14px] text-[#5C5750] leading-relaxed font-sans">
            Our pieces are bonded with biological fish gelatin and cold natural beeswax. The through-tenons expand and contract in organic equilibrium with ambient humidity, allowing tables and chaises to endure over centuries without structural fatigue.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DDD6CB] font-sans">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#8C7456] block font-semibold">Origin</span>
              <span className="font-serif text-lg text-[#1A1917]">Dordogne, FR</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#8C7456] block font-semibold">Joinery</span>
              <span className="font-serif text-lg text-[#1A1917]">±0.2mm Blind</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#8C7456] block font-semibold">Guarantee</span>
              <span className="font-serif text-lg text-[#1A1917]">50 Years Reg.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] rounded-xs overflow-hidden border border-[#DDD6CB]">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=800&auto=format&fit=crop"
              alt="Timber workshop in Dordogne"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-[3/4] rounded-xs overflow-hidden border border-[#DDD6CB] translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
              alt="Master craftsman hand planing"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 3. The 4-Stage Commission Workflow */}
      <div className="space-y-8 pt-12 border-t border-[#E6E0D6]">
        <div>
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-1 font-sans">
            Architectural Engagement
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
            The Bespoke Commission Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <span className="font-mono text-xs text-[#8C7456] block font-bold">PHASE 01</span>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">Spatial Blueprint Analysis</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              We review CAD floorplans, ceiling vault dimensions, and solar trajectory to propose proportional volumes that harmonize with the architecture.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <span className="font-mono text-xs text-[#8C7456] block font-bold">PHASE 02</span>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">Botanical Timber Tagging</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Individual tree slabs are tagged in our Dordogne drying yards. Clients receive high-resolution grain mapping photographs for aesthetic approval.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <span className="font-mono text-xs text-[#8C7456] block font-bold">PHASE 03</span>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">Joinery & Fabrication</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Our master ébénistes hand-carve tenons, scrape surfaces with curved cabinet scrapers, and apply 8 coats of cold bee propolis wax.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <span className="font-mono text-xs text-[#8C7456] block font-bold">PHASE 04</span>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">White-Glove In Situ Placement</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Shipped in temperature-regulated custom crates. Accompanied by our install artisans for on-site leveling, wax buffing, and provenance register signing.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Commission Request Form */}
      <div className="bg-[#F0ECE6] border border-[#E2DDD4] p-8 sm:p-12 rounded-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
              Commission Registry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Submit an Architectural Inquiry.
            </h2>
            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              Our atelier directors review all proposals within two business days. We provide initial proportion studies and boxed material kits upon proposal qualification.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#DDD6CB] text-xs font-sans text-[#5C5750]">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#8C7456]" />
                <span>Modern Furniture World, Le Port, 24620 Les Eyzies, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#8C7456]" />
                <span>commissions@atelier-vezere.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#8C7456]" />
                <span>+33 (0)5 53 06 97 12</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#DDD6CB] p-6 sm:p-8 rounded-xs font-sans">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1917]">Commission Inquiry Recorded</h3>
                <p className="text-xs text-[#6B665E] max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your architectural brief has been routed to Pierre Perrin and studio directors in Paris. We will contact you within 48 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-[10px] tracking-widest uppercase font-semibold text-black underline"
                >
                  Submit Another Project Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Client / Architect Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcelle Guérin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Direct Contact Email</label>
                    <input
                      type="email"
                      required
                      placeholder="studio@architecture.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Studio / Practice (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Studio Guérin Architectes"
                      value={formData.practice}
                      onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Project Typology</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black"
                    >
                      <option>Private Residence / Salon</option>
                      <option>Alpine Chalet Refuge</option>
                      <option>Boutique Hospitality</option>
                      <option>Museum / Foundation Gallery</option>
                      <option>Diplomatic Embassy</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Preferred Timbers & Minerals</label>
                  <select
                    value={formData.timberPreference}
                    onChange={(e) => setFormData({ ...formData, timberPreference: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black"
                  >
                    <option>French Canal Walnut & Belgian Bouclé</option>
                    <option>Périgord White Oak & Heavy Linen</option>
                    <option>Roman Tivoli Travertine & Saddle Leather</option>
                    <option>Ebonized Dordogne Ash & Bronze</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block">Project Brief & Spatial Dimensions</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the architectural context, room scale, required span, or specific commission requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#DDD6CB] rounded-xs text-[#1A1917] focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1A1917] text-white text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors rounded-xs"
                >
                  Submit Dossier to Atelier Guild
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
