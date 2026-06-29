import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Zap,
  Shield,
  Star,
  CheckCircle,
  ChevronRight,
  Clock,
  HardHat,
  Building2,
  ZoomIn,
  Home,
  Wrench,
  AlertTriangle,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'level-2-asp',
    icon: Zap,
    title: 'Level 2 ASP',
    subtitle: 'Underground & Overhead',
    description:
      'Accredited Level 2 electrical work for underground and overhead service connections, metering and network infrastructure.',
  },
  {
    id: 'new-builds',
    icon: HardHat,
    title: 'New Builds',
    subtitle: 'Residential & Commercial',
    description:
      'Complete electrical installations for new homes, developments and commercial projects, from rough-in to final fit-off.',
  },
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Electrical',
    subtitle: 'Homes & Renovations',
    description:
      'Reliable electrical work for homes, renovations, repairs and upgrades. Switchboard upgrades, lighting, power and more.',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Electrical',
    subtitle: 'Business & Fit Outs',
    description:
      'Professional electrical services for businesses, fit outs and ongoing maintenance. Keeping your operations safe and compliant.',
  },
  {
    id: 'emergency',
    icon: AlertTriangle,
    title: 'Emergency Call Outs',
    subtitle: '24/7 Availability',
    description:
      '24/7 electrical support for urgent faults, outages and safety issues. When it cannot wait, we are on our way.',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Testing & Maintenance',
    subtitle: 'Inspections & Compliance',
    description:
      'Test and tag, switchboard inspections, safety audits, real estate compliance checks and ongoing maintenance programs.',
  },
];

const REASONS = [
  { icon: Shield, text: 'Endeavour Energy accredited' },
  { icon: CheckCircle, text: 'Fully licensed and insured' },
  { icon: Star, text: 'Clean, tidy and professional workmanship' },
  { icon: Zap, text: 'Quality work completed to Australian regulations' },
];

// CONFIRM WITH CLIENT BEFORE LAUNCH
const TESTIMONIALS = [
  {
    quote: 'Brad was reliable, professional and got the job done properly the first time.',
    author: 'James',
    location: 'Wollongong',
  },
  {
    quote: 'Great communication, fair pricing and very tidy work.',
    author: 'Sarah',
    location: 'Shellharbour',
  },
  {
    quote: 'We felt confident knowing the work was completed safely and to code.',
    author: 'Michael',
    location: 'Illawarra',
  },
];

const SERVICE_OPTIONS = [
  'Level 2 ASP - Underground & Overhead',
  'New Builds',
  'Residential Electrical',
  'Commercial Electrical',
  'Emergency Call Out',
  'Testing & Maintenance',
  'Other',
];

const GALLERY: { src: string; label?: string }[] = [
  { src: '/gallery/20251203_082110559_iOS_-_Brad_Hird.jpg' },
  { src: '/gallery/20260325_221237561_iOS_-_Brad_Hird.jpg', label: 'BEFORE' },
  { src: '/gallery/20260326_061544635_iOS_-_Brad_Hird.jpg', label: 'AFTER' },
  { src: '/gallery/20260409_030006213_iOS_-_Brad_Hird.jpg' },
  { src: '/gallery/20260415_004127208_iOS_-_Brad_Hird.jpg' },
];

interface FormState {
  fullName: string;
  phone: string;
  suburb: string;
  service: string;
  message: string;
}

const emptyForm = (): FormState => ({
  fullName: '',
  phone: '',
  suburb: '',
  service: '',
  message: '',
});

function EnquiryForm({
  subject,
  variant = 'dark',
}: {
  subject: string;
  variant?: 'dark' | 'light';
}) {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isDark = variant === 'dark';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'a85c1432-c1db-49f3-a125-88cd95e99b31',
          subject,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(emptyForm());
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = isDark
    ? 'w-full px-4 py-3 rounded-md border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/60 focus:ring-white/20'
    : 'form-field';

  const labelClass = isDark ? 'text-white/80 text-sm font-medium' : 'text-[var(--color-neutral-600)] text-sm font-medium';

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-12 gap-4 text-center ${isDark ? 'text-white' : 'text-[var(--color-dark)]'}`}>
        <CheckCircle className="w-12 h-12" style={{ color: 'var(--color-secondary)' }} />
        <p className="text-lg font-semibold">Thanks! We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="04XX XXX XXX"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Suburb *</label>
          <input
            type="text"
            name="suburb"
            required
            value={form.suburb}
            onChange={handleChange}
            placeholder="Your suburb"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Service Required *</label>
          <select
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className={`${inputClass} ${!form.service && isDark ? 'text-white/50' : !form.service ? 'text-[var(--color-neutral-400)]' : ''}`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="text-[var(--color-dark)] bg-white">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Message (optional)</label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about what you need..."
          className={`${inputClass} resize-none`}
        />
      </div>
      {status === 'error' && (
        <p className="text-sm" style={{ color: isDark ? '#fca5a5' : 'var(--color-error)' }}>
          Something went wrong. Please call us directly.
        </p>
      )}
      <button type="submit" disabled={status === 'loading'} className="btn-primary self-start">
        {status === 'loading' ? 'Sending...' : 'Request a Free Quote'}
        {status !== 'loading' && <ChevronRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: whyRef, inView: whyInView } = useInView();
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView();
  const { ref: galleryRef, inView: galleryInView } = useInView();
  const { ref: contactRef, inView: contactInView } = useInView();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen font-sans" style={{ background: 'var(--color-light)' }}>
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-dark)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-3 shrink-0">
              <img
                src="/SOENSW_logo_-_Brad_Hird.jpeg"
                alt="Switched On Electrical NSW logo"
                className="h-10 md:h-12 w-auto object-contain rounded"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-150"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:0413597484"
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--color-secondary)] transition-colors duration-150"
              >
                <Phone className="w-4 h-4" />
                0413 597 484
              </a>
              <a href="#contact" className="btn-primary text-sm px-5 py-2.5">
                Free Quote
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white p-2 rounded"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[var(--color-dark)] border-t border-white/10 px-4 pb-6 pt-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/90 font-medium py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:0413597484"
              className="flex items-center gap-2 text-sm font-semibold mt-2"
              style={{ color: 'var(--color-secondary)' }}
            >
              <Phone className="w-4 h-4" />
              0413 597 484
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center mt-1">
              Free Quote
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/20251217_093614034_iOS_-_Brad_Hird.jpg"
            alt="Switched On Electrical NSW workmanship"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.70) 50%, rgba(5,5,5,0.40) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Copy */}
            <div className="flex flex-col gap-6">
              <span
                className="section-label"
                style={{ color: 'var(--color-secondary)' }}
              >
                Wollongong &amp; Illawarra
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Switched On.<br />
                <span style={{ color: 'var(--color-secondary)' }}>Every Time.</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                Licensed electricians servicing Wollongong, Illawarra, Southern Highlands and the
                South Coast. From new builds and Level 2 ASP work to emergency call outs, quality
                workmanship you can trust.
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <a href="#contact" className="btn-primary">
                  Get a Free Quote
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="tel:0413597484" className="btn-secondary">
                  <Phone className="w-4 h-4" />
                  0413 597 484
                </a>
              </div>

              <div className="flex flex-wrap gap-6 mt-4">
                {[
                  { icon: Shield, label: 'Fully Licensed & Insured' },
                  { icon: Clock, label: '24/7 Emergency Call Outs' },
                  { icon: CheckCircle, label: 'Endeavour Energy Accredited' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero form */}
            <div
              className="rounded-2xl p-6 md:p-8 shadow-2xl"
              style={{
                background: 'rgba(5,5,5,0.82)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(216,180,91,0.25)',
              }}
            >
              <h2
                className="font-heading text-2xl font-bold text-white mb-1"
              >
                Request a Free Quote
              </h2>
              <p className="text-white/60 text-sm mb-6">
                We'll be in touch within 24 hours.
              </p>
              <EnquiryForm
                subject="Switched On Electrical NSW - Hero Form Enquiry"
                variant="dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA STRIP ── */}
      <div
        style={{ background: 'var(--color-secondary)' }}
        className="py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--color-dark)' }}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Serving:</span>
            {['Wollongong', 'Illawarra', 'Southern Highlands', 'South Coast', 'Shellharbour'].map(
              (area, i, arr) => (
                <span key={area}>
                  {area}
                  {i < arr.length - 1 && <span className="ml-2 opacity-50">|</span>}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 md:py-28" style={{ background: 'var(--color-light)' }}>
        <div
          ref={servicesRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-14">
            <span className="section-label">What We Do</span>
            <h2 className="section-title mt-2">Electrical Services</h2>
            <p className="mt-4 text-[var(--color-neutral-500)] max-w-2xl mx-auto leading-relaxed">
              From accredited Level 2 ASP connections to residential renovations and 24/7
              emergencies, we deliver quality electrical work across the Illawarra region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`group rounded-xl p-6 border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-default ${
                    servicesInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    background: 'white',
                    borderColor: 'var(--color-neutral-200)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200"
                    style={{ background: 'var(--color-primary-50)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3
                    className="font-heading text-xl font-bold mb-1"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-3"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {service.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-neutral-500)' }}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a href="#contact" className="btn-primary">
              Enquire About a Service
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        id="why-us"
        className="py-20 md:py-28"
        style={{ background: 'var(--color-dark)' }}
      >
        <div
          ref={whyRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy side */}
            <div>
              <span className="section-label" style={{ color: 'var(--color-secondary)' }}>
                Why Choose Us
              </span>
              <h2
                className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-6 text-white"
              >
                Reliable Electrical Work,<br />Done Right.
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Switched On Electrical NSW is a trusted electrical company servicing Wollongong and
                the broader Illawarra region. We take pride in delivering compliant, cost-effective
                solutions with a commitment to safety, tidy workmanship and genuine peace of mind for
                every client.
              </p>
              <div className="flex flex-col gap-5">
                {REASONS.map(({ icon: Icon, text }, i) => (
                  <div
                    key={text}
                    className={`flex items-center gap-4 transition-all duration-500 ${
                      whyInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(216,180,91,0.15)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                    </div>
                    <span className="text-white/90 font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-secondary mt-8 inline-flex">
                Get in Touch
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Visual side */}
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src="/20260429_010745000_iOS_-_Brad_Hird.png"
                alt="Switched On Electrical NSW workmanship"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.5) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* CONFIRM WITH CLIENT BEFORE LAUNCH */}
      <section id="testimonials" className="py-20 md:py-28" style={{ background: 'var(--color-light)' }}>
        <div
          ref={testimonialsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-14">
            <span className="section-label">What Clients Say</span>
            <h2 className="section-title mt-2">Trusted by the Illawarra</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                className={`rounded-xl p-8 flex flex-col gap-6 transition-all duration-500 ${
                  testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  background: 'white',
                  border: '1px solid var(--color-neutral-200)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-current"
                      style={{ color: 'var(--color-secondary)' }}
                    />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed italic flex-1"
                  style={{ color: 'var(--color-neutral-600)' }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--color-dark)' }}>
                    {t.author}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-400)' }}>
                    {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-20 md:py-28" style={{ background: 'var(--color-dark)' }}>
        <div
          ref={galleryRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-14">
            <span className="section-label" style={{ color: 'var(--color-secondary)' }}>Our Work</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2 text-white">
              Recent Projects
            </h2>
          </div>

          {/* Grid: large left + 2x2 right on desktop, stacked on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Large feature image */}
            <div
              className={`col-span-2 md:col-span-1 md:row-span-2 relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0ms' }}
              onClick={() => setLightbox(0)}
            >
              <div className="aspect-square md:aspect-auto md:h-full min-h-[260px]">
                <img
                  src={GALLERY[0].src}
                  alt="Switched On Electrical NSW project"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {GALLERY[0].label && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold tracking-widest uppercase text-white shadow-lg"
                  style={{ background: 'var(--color-primary)' }}>
                  {GALLERY[0].label}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </div>

            {/* 4 smaller images */}
            {GALLERY.slice(1).map(({ src, label }, i) => (
              <div
                key={src}
                className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                  galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                onClick={() => setLightbox(i + 1)}
              >
                <div className="aspect-square">
                  <img
                    src={src}
                    alt="Switched On Electrical NSW project"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {label && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold tracking-widest uppercase text-white shadow-lg"
                    style={{ background: label === 'AFTER' ? 'var(--color-success)' : 'var(--color-primary)' }}>
                    {label}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length); }}
            aria-label="Previous"
          >
            <ChevronRight className="w-8 h-8 rotate-180" />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt="Switched On Electrical NSW project"
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 flex gap-2">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="w-2 h-2 rounded-full transition-colors duration-200"
                style={{ background: i === lightbox ? 'var(--color-secondary)' : 'rgba(255,255,255,0.3)' }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── CTA STRIP ── */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)',
        }}
        className="py-14"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Need an Electrician in Wollongong?
          </h2>
          <p className="text-white/80 max-w-xl">
            Available 24/7 for emergency call outs. Free quotes on all planned work. Licensed,
            insured and Endeavour Energy accredited.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:0413597484"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[var(--color-primary)] bg-white hover:bg-[var(--color-neutral-50)] transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              Call 0413 597 484
            </a>
            <a href="#contact" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}>
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 md:py-28" style={{ background: 'var(--color-neutral-900)' }}>
        <div
          ref={contactRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact info */}
            <div
              className={`transition-all duration-700 ${
                contactInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <span className="section-label" style={{ color: 'var(--color-secondary)' }}>
                Get In Touch
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-6 text-white">
                Contact Us
              </h2>
              <p className="text-white/70 leading-relaxed mb-10">
                Whether you have a question about a service, want to arrange a free quote, or have an
                urgent electrical issue, we're here to help. Fill out the form or reach us directly.
              </p>

              <div className="flex flex-col gap-6">
                <a
                  href="tel:0413597484"
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,123,255,0.15)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-0.5">Phone</p>
                    <p className="font-semibold">0413 597 484</p>
                  </div>
                </a>

                <a
                  href="mailto:brad@switchedonelectricalnsw.com"
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,123,255,0.15)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-0.5">Email</p>
                    <p className="font-semibold">brad@switchedonelectricalnsw.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-white/80">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,123,255,0.15)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-0.5">Service Area</p>
                    <p className="font-semibold">Wollongong, Illawarra, Southern Highlands, South Coast &amp; Shellharbour</p>
                  </div>
                </div>

                {/* CONFIRM WITH CLIENT */}
                <div className="flex items-center gap-4 text-white/80">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,123,255,0.15)' }}
                  >
                    <Clock className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-0.5">
                      Hours {/* CONFIRM WITH CLIENT */}
                    </p>
                    <p className="font-semibold">Mon - Fri: 7am - 5pm | 24/7 Emergency</p>
                    {/* CONFIRM WITH CLIENT */}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div
              className={`rounded-2xl p-6 md:p-8 transition-all duration-700 ${
                contactInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{
                background: 'var(--color-neutral-800)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="font-heading text-2xl font-bold text-white mb-6">
                Send an Enquiry
              </h3>
              <EnquiryForm
                subject="Switched On Electrical NSW - Contact Page Enquiry"
                variant="dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 border-t"
        style={{ background: 'var(--color-dark)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/SOENSW_logo_-_Brad_Hird.jpeg"
                alt="Switched On Electrical NSW"
                className="h-10 w-auto object-contain rounded"
              />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Switched On Electrical NSW</p>
                <p className="text-white/40 text-xs">Licensed &amp; Insured | Licence 480 339C</p>
              </div>
            </div>

            <nav className="flex flex-wrap gap-6 justify-center">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/50 hover:text-white/90 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center md:items-end gap-1">
              <a
                href="tel:0413597484"
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                0413 597 484
              </a>
              <p className="text-xs text-white/30">
                Website by{' '}
                <a
                  href="https://www.itscold.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Go Polar Creative
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
