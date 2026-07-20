import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
    Activity, ArrowRight, Star, Shield, TrendingUp, FileText,
    ShieldCheck, Calendar, Users, BarChart3, Heart, CheckCircle2,
    ChevronRight, Zap, Lock, Clock, Award, Menu, X, Phone, Mail,
    MapPin, CreditCard, Stethoscope, ClipboardList, FlaskConical, BedDouble
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   ECG / Heartbeat SVG Line Component
───────────────────────────────────────────── */
const EcgLine = () => (
    <svg className="ecg-line" viewBox="0 0 600 80" preserveAspectRatio="none">
        <polyline
            points="0,40 60,40 80,40 90,10 100,70 110,40 130,40 150,40 160,15 170,65 180,40 200,40 260,40 270,5 280,75 290,40 320,40 380,40 390,10 400,70 410,40 440,40 500,40 510,15 520,65 530,40 600,40"
            fill="none"
            stroke="url(#ecgGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
                <stop offset="30%" stopColor="#0d9488" stopOpacity="1" />
                <stop offset="70%" stopColor="#14b8a6" stopOpacity="1" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

/* ─────────────────────────────────────────────
   Feature Card
───────────────────────────────────────────── */
const FeatureCard = ({ title, desc, icon: Icon, gradient }) => (
    <div className="feature-card">
        <div className={`feature-icon ${gradient}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
        <div className="feature-arrow">
            <ChevronRight className="h-4 w-4" />
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Testimonial Card
───────────────────────────────────────────── */
const TestimonialCard = ({ name, role, hospital, quote, avatar, rating }) => (
    <div className="testimonial-card">
        <div className="testimonial-stars">
            {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
        <p className="testimonial-quote">"{quote}"</p>
        <div className="testimonial-author">
            <img src={avatar} alt={name} className="testimonial-avatar" />
            <div>
                <div className="testimonial-name">{name}</div>
                <div className="testimonial-role">{role} · {hospital}</div>
            </div>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Main Landing Component
───────────────────────────────────────────── */
const Landing = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Refs for GSAP targets
    const rootRef = useRef(null);
    const heroHeadlineRef = useRef(null);
    const heroBadgeRef = useRef(null);
    const heroSubRef = useRef(null);
    const heroActionsRef = useRef(null);
    const heroProofRef = useRef(null);
    const heroMockupRef = useRef(null);
    const floatCard1Ref = useRef(null);
    const floatCard2Ref = useRef(null);
    const statsRef = useRef(null);
    const statNumbersRef = useRef([]);
    const featuresRef = useRef(null);
    const featureCardsRef = useRef([]);
    const showcaseRef = useRef(null);
    const securityRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    const features = [
        { title: 'Patient Management', desc: 'Complete patient profiles, medical history, vitals tracking and seamless record access across departments.', icon: Users, gradient: 'grad-blue' },
        { title: 'Appointment Scheduling', desc: 'Smart calendar with automated conflict detection, reminders, and doctor availability tracking.', icon: Calendar, gradient: 'grad-teal' },
        { title: 'Electronic Health Records', desc: 'Structured, searchable EHR system with secure sharing, version history, and instant retrieval.', icon: ClipboardList, gradient: 'grad-purple' },
        { title: 'Staff & Doctor Management', desc: 'Manage shifts, roles, leave schedules, and performance metrics for your entire medical team.', icon: Stethoscope, gradient: 'grad-orange' },
        { title: 'Billing & Finance', desc: 'Automated invoicing, insurance claim processing, payment tracking and GST-compliant reports.', icon: CreditCard, gradient: 'grad-green' },
        { title: 'Lab Reports & Diagnostics', desc: 'Integrate lab results directly into patient records with automated normal range alerts.', icon: FlaskConical, gradient: 'grad-red' },
        { title: 'Bed & Ward Management', desc: 'Real-time bed availability, ward assignments, and discharge planning from a single view.', icon: BedDouble, gradient: 'grad-indigo' },
        { title: 'Analytics & Reports', desc: 'Powerful dashboards with revenue trends, patient flow, doctor performance, and export options.', icon: BarChart3, gradient: 'grad-pink' },
    ];

    const testimonials = [
        { name: 'Dr. Priya Mehta', role: 'Chief Medical Officer', hospital: 'Apollo Hospitals', quote: 'OrvantaHealth transformed our workflow completely. Patient wait times dropped by 40% and our staff loves the intuitive interface.', avatar: 'https://i.pravatar.cc/100?u=priya', rating: 5 },
        { name: 'Rajesh Kumar', role: 'Hospital Administrator', hospital: 'Fortis Healthcare', quote: 'The billing automation alone saved us 15+ hours per week. The analytics dashboard gives us insights we never had before.', avatar: 'https://i.pravatar.cc/100?u=rajesh', rating: 5 },
        { name: 'Dr. Ananya Singh', role: 'Head of Operations', hospital: 'Manipal Hospitals', quote: 'Finally, an HMS that doctors actually want to use. Clean, fast, and everything is exactly where you expect it to be.', avatar: 'https://i.pravatar.cc/100?u=ananya', rating: 5 },
    ];

    const stats = [
        { value: 50000, suffix: '+', label: 'Patients Managed', icon: Users, color: 'stat-blue' },
        { value: 200, suffix: '+', label: 'Verified Doctors', icon: Stethoscope, color: 'stat-teal' },
        { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Heart, color: 'stat-rose' },
        { value: 500, suffix: '+', label: 'Hospitals Trust Us', icon: Award, color: 'stat-amber' },
        { value: 99, suffix: '.9%', label: 'Uptime SLA', icon: Zap, color: 'stat-emerald' },
    ];

    /* ── Lenis smooth scroll + GSAP integration ── */
    useEffect(() => {
        // Init Lenis
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });

        // Connect Lenis to GSAP ticker
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // Scrolled navbar state
        lenis.on('scroll', ({ scroll }) => setScrolled(scroll > 30));

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    /* ── GSAP Animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {

            /* ── 1. HERO entrance ── */
            const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            heroTl
                .from(heroBadgeRef.current, { y: 24, opacity: 0, duration: 0.7 })
                .from(heroHeadlineRef.current, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.3')
                .from(heroSubRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
                .from(heroActionsRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
                .from(heroProofRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                .from(heroMockupRef.current, { x: 60, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.9')
                .from([floatCard1Ref.current, floatCard2Ref.current], {
                    scale: 0.7, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)'
                }, '-=0.5');

            /* ── 2. Background orbs slow parallax ── */
            if (orb1Ref.current) {
                gsap.to(orb1Ref.current, {
                    y: -120,
                    ease: 'none',
                    scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
                });
            }
            if (orb2Ref.current) {
                gsap.to(orb2Ref.current, {
                    y: -80,
                    ease: 'none',
                    scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 2 }
                });
            }

            /* ── 3. Stats counter animation ── */
            if (statsRef.current) {
                const statNums = statsRef.current.querySelectorAll('.stat-number');
                const statCards = statsRef.current.querySelectorAll('.stat-card');

                gsap.from(statCards, {
                    y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
                });

                statNums.forEach((el) => {
                    const raw = el.getAttribute('data-target');
                    const suffix = el.getAttribute('data-suffix') || '';
                    const target = parseFloat(raw);
                    const obj = { val: 0 };

                    ScrollTrigger.create({
                        trigger: el,
                        start: 'top 90%',
                        onEnter: () => {
                            gsap.to(obj, {
                                val: target,
                                duration: 2,
                                ease: 'power2.out',
                                onUpdate() {
                                    const v = obj.val;
                                    el.textContent = (Number.isInteger(target)
                                        ? Math.floor(v).toLocaleString()
                                        : v.toFixed(1)) + suffix;
                                }
                            });
                        },
                        once: true
                    });
                });
            }

            /* ── 4. Section headers fade-up ── */
            gsap.utils.toArray('.section-header').forEach((el) => {
                gsap.from(el, {
                    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' }
                });
            });

            /* ── 5. Feature cards stagger ── */
            if (featuresRef.current) {
                const cards = featuresRef.current.querySelectorAll('.feature-card');
                gsap.from(cards, {
                    y: 60, opacity: 0, scale: 0.95,
                    duration: 0.7, stagger: 0.08, ease: 'power3.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 85%' }
                });
            }

            /* ── 6. Showcase section slide-in ── */
            if (showcaseRef.current) {
                const [left, right] = showcaseRef.current.querySelectorAll('.showcase-content, .showcase-stats-panel');
                if (left) gsap.from(left, { x: -60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' } });
                if (right) gsap.from(right, { x: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: showcaseRef.current, start: 'top 80%' } });

                // Animate bars on scroll
                showcaseRef.current.querySelectorAll('.showcase-bar-fill').forEach((bar) => {
                    const targetVal = bar.getAttribute('data-val') || '100';
                    gsap.fromTo(bar, 
                        { width: '0%' },
                        {
                            width: `${targetVal}%`, 
                            duration: 1.2, 
                            ease: 'power3.out',
                            scrollTrigger: { trigger: bar, start: 'top 95%', once: true }
                        }
                    );
                });
            }

            /* ── 7. Security section ── */
            if (securityRef.current) {
                gsap.from(securityRef.current.querySelector('.security-icon-wrap'), {
                    scale: 0.5, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)',
                    scrollTrigger: { trigger: securityRef.current, start: 'top 80%' }
                });
                gsap.from(securityRef.current.querySelector('.security-content'), {
                    x: 50, opacity: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: securityRef.current, start: 'top 80%' }
                });
                gsap.from(securityRef.current.querySelectorAll('.security-badge-card'), {
                    y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: securityRef.current.querySelector('.security-badges'), start: 'top 88%' }
                });
            }

            /* ── 8. Testimonial cards ── */
            if (testimonialsRef.current) {
                gsap.from(testimonialsRef.current.querySelectorAll('.testimonial-card'), {
                    y: 50, opacity: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: testimonialsRef.current, start: 'top 85%' }
                });
            }

            /* ── 9. CTA section ── */
            if (ctaRef.current) {
                gsap.from(ctaRef.current.querySelectorAll('.cta-icon-wrap, .cta-title, .cta-desc, .cta-actions, .cta-reassurances'), {
                    y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
                });
            }

            /* ── 10. Trust badges ── */
            gsap.from('.trust-badge', {
                y: 20, opacity: 0, stagger: 0.07, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: '.trust-section', start: 'top 90%' }
            });

        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="landing-root" ref={rootRef}>

            {/* ── Animated Background ── */}
            <div className="landing-bg" aria-hidden="true">
                <div className="landing-bg-orb orb-1" ref={orb1Ref} />
                <div className="landing-bg-orb orb-2" ref={orb2Ref} />
                <div className="landing-bg-orb orb-3" />
                <div className="landing-bg-grid" />
            </div>

            {/* ─────────── NAVBAR ─────────── */}
            <nav className={`landing-nav ${scrolled ? 'landing-nav-scrolled' : ''}`}>
                <div className="landing-nav-inner">
                    <Link to="/" className="landing-logo">
                        <div className="landing-logo-icon">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span className="landing-logo-text">
                            Orvanta<span className="landing-logo-accent">Health</span>
                        </span>
                    </Link>

                    <div className="landing-nav-links">
                        {[
                            { label: 'Features', href: '#features' },
                            { label: 'How It Works', href: '#showcase' },
                            { label: 'Testimonials', href: '#testimonials' },
                        ].map(({ label, href }) => (
                            <a key={label} href={href} className="landing-nav-link">{label}</a>
                        ))}
                    </div>

                    <div className="landing-nav-cta">
                        <Link to="/login" className="landing-nav-signin">Sign In</Link>
                        <Link to="/register" className="landing-nav-btn">
                            Get Started <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <button className="landing-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="landing-mobile-menu">
                        {['Features', 'How It Works', 'Testimonials'].map(item => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="landing-mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >{item}</a>
                        ))}
                        <div className="landing-mobile-cta">
                            <Link to="/login" className="landing-mobile-signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
                            <Link to="/register" className="landing-mobile-btn" onClick={() => setMenuOpen(false)}>Get Started</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* ─────────── HERO ─────────── */}
            <section className="hero-section">
                <div className="hero-container">
                    {/* Left Content */}
                    <div className="hero-content">
                        <div className="hero-badge" ref={heroBadgeRef}>
                            <span className="hero-badge-dot" />
                            <Zap className="h-3 w-3" />
                            Next-Gen Hospital Management System
                        </div>

                        <h1 className="hero-headline" ref={heroHeadlineRef}>
                            Revolutionizing
                            <span className="hero-headline-accent"> Healthcare</span>
                            <br />Management
                        </h1>

                        <p className="hero-subtext" ref={heroSubRef}>
                            Streamline patient care, automate operations, and unlock data-driven
                            insights — all from one powerful, beautifully designed platform.
                        </p>

                        <div className="hero-actions" ref={heroActionsRef}>
                            <Link to="/register" className="hero-btn-primary">
                                Start Free Trial
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/login" className="hero-btn-secondary">
                                View Live Demo
                            </Link>
                        </div>

                        <div className="hero-social-proof" ref={heroProofRef}>
                            <div className="hero-avatars">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/60?u=user${i}xyz`} alt="user" className="hero-avatar-img" />
                                ))}
                            </div>
                            <div>
                                <div className="hero-stars">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    ))}
                                    <span className="hero-rating">4.9/5</span>
                                </div>
                                <p className="hero-trust">Trusted by 500+ hospitals across India</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dashboard Mockup */}
                    <div className="hero-mockup-wrap" ref={heroMockupRef}>
                        <div className="hero-mockup-glow" />
                        <div className="hero-mockup-card">
                            <div className="mockup-header">
                                <div className="mockup-dots">
                                    <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
                                </div>
                                <span className="mockup-title">OrvantaHealth Dashboard</span>
                                <div className="mockup-time">
                                    <Clock className="h-3 w-3" /> Live
                                </div>
                            </div>

                            <div className="mockup-body">
                                <div className="mockup-stats-row">
                                    {[
                                        { label: 'Patients Today', value: '142', color: 'text-cyan-400', icon: '👥' },
                                        { label: 'Appointments', value: '38', color: 'text-emerald-400', icon: '📅' },
                                        { label: 'Revenue', value: '₹2.4L', color: 'text-amber-400', icon: '💰' },
                                        { label: 'Bed Occupancy', value: '87%', color: 'text-rose-400', icon: '🛏️' },
                                    ].map((s, i) => (
                                        <div key={i} className="mockup-stat">
                                            <span className="mockup-stat-icon">{s.icon}</span>
                                            <span className={`mockup-stat-value ${s.color}`}>{s.value}</span>
                                            <span className="mockup-stat-label">{s.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mockup-ecg">
                                    <div className="mockup-ecg-label">
                                        <Heart className="h-3 w-3 text-rose-400 animate-pulse" />
                                        <span>Live Patient Monitor</span>
                                    </div>
                                    <EcgLine />
                                </div>

                                <div className="mockup-appts">
                                    <div className="mockup-section-title">Upcoming Appointments</div>
                                    {[
                                        { name: 'Amit Sharma', time: '10:30 AM', dept: 'Cardiology', status: 'Confirmed' },
                                        { name: 'Sunita Patel', time: '11:00 AM', dept: 'Neurology', status: 'Waiting' },
                                        { name: 'Rohit Verma', time: '11:45 AM', dept: 'Orthopedics', status: 'In Progress' },
                                    ].map((a, i) => (
                                        <div key={i} className="mockup-appt-row">
                                            <div className="mockup-appt-avatar">{a.name.charAt(0)}</div>
                                            <div className="mockup-appt-info">
                                                <span className="mockup-appt-name">{a.name}</span>
                                                <span className="mockup-appt-dept">{a.dept}</span>
                                            </div>
                                            <div className="mockup-appt-time">{a.time}</div>
                                            <div className={`mockup-appt-status status-${a.status.toLowerCase().replace(' ', '-')}`}>
                                                {a.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating cards */}
                        <div className="hero-float-card float-card-1" ref={floatCard1Ref}>
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                            <div>
                                <div className="float-card-value text-emerald-400">+24%</div>
                                <div className="float-card-label">Patient Growth</div>
                            </div>
                        </div>
                        <div className="hero-float-card float-card-2" ref={floatCard2Ref}>
                            <ShieldCheck className="h-4 w-4 text-cyan-400" />
                            <div>
                                <div className="float-card-value text-cyan-400">HIPAA</div>
                                <div className="float-card-label">Compliant</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-ecg-strip">
                    <EcgLine />
                </div>
            </section>

            {/* ─────────── STATS BAR ─────────── */}
            <section className="stats-section" ref={statsRef}>
                <div className="stats-container">
                    {stats.map(({ value, suffix, label, icon: Icon, color }) => (
                        <div key={label} className="stat-card">
                            <div className={`stat-icon-wrap ${color}`}>
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div
                                className="stat-number"
                                data-target={value}
                                data-suffix={suffix}
                            >
                                0{suffix}
                            </div>
                            <div className="stat-label">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────── TRUST BADGES ─────────── */}
            <section className="trust-section">
                <div className="trust-container">
                    <p className="trust-label">Certified &amp; Compliant</p>
                    <div className="trust-badges">
                        {[
                            { icon: ShieldCheck, label: 'HIPAA Compliant' },
                            { icon: Lock, label: '256-bit SSL' },
                            { icon: Award, label: 'ISO 27001' },
                            { icon: Shield, label: 'GDPR Ready' },
                            { icon: Zap, label: '99.9% Uptime' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="trust-badge">
                                <Icon className="h-4 w-4 text-brand-teal" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── FEATURES ─────────── */}
            <section id="features" className="features-section">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-tag">
                            <Zap className="h-3 w-3" /> Core Features
                        </div>
                        <h2 className="section-title">Everything You Need to Run<br />Your Hospital Smoothly</h2>
                        <p className="section-subtitle">
                            A complete suite of tools designed specifically for the unique challenges of modern healthcare management.
                        </p>
                    </div>
                    <div className="features-grid" ref={featuresRef}>
                        {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                    </div>
                </div>
            </section>

            {/* ─────────── DASHBOARD SHOWCASE ─────────── */}
            <section id="showcase" className="showcase-section" ref={showcaseRef}>
                <div className="section-container">
                    <div className="showcase-grid">
                        <div className="showcase-content">
                            <div className="section-tag section-tag-light">
                                <BarChart3 className="h-3 w-3" /> Intelligent Dashboard
                            </div>
                            <h2 className="showcase-title">
                                Smarter Decisions.<br />
                                <span className="text-brand-teal">Better Patient Outcomes.</span>
                            </h2>
                            <p className="showcase-desc">
                                Our AI-powered analytics engine cross-references patient data in real-time,
                                giving your clinical team unmatched decision support at every step.
                            </p>
                            <div className="showcase-checklist">
                                {[
                                    'Real-time patient monitoring & vitals',
                                    'Predictive appointment no-show alerts',
                                    'Revenue cycle management insights',
                                    'Department-wise performance reports',
                                    'Automated discharge & billing summaries',
                                ].map((item, i) => (
                                    <div key={i} className="showcase-check-item">
                                        <CheckCircle2 className="h-5 w-5 text-brand-teal flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/register" className="showcase-cta">
                                Explore the Dashboard <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="showcase-stats-panel">
                            <div className="showcase-panel-header">
                                <Activity className="h-4 w-4 text-brand-teal" />
                                <span>Performance Overview</span>
                                <span className="showcase-live-dot" />
                                <span className="text-xs text-emerald-400">Live</span>
                            </div>
                            {[
                                { label: 'Diagnostic Accuracy', val: 98, gradient: 'linear-gradient(90deg, #06b6d4, #22d3ee)', shadow: '0 0 12px rgba(34, 211, 238, 0.8), 0 0 4px rgba(6, 182, 212, 0.9)', textColor: '#22d3ee' },
                                { label: 'Appointment Fulfillment', val: 94, gradient: 'linear-gradient(90deg, #059669, #10b981, #34d399)', shadow: '0 0 12px rgba(52, 211, 153, 0.8), 0 0 4px rgba(16, 185, 129, 0.9)', textColor: '#34d399' },
                                { label: 'Billing Automation', val: 100, gradient: 'linear-gradient(90deg, #0d9488, #14b8a6, #2dd4bf)', shadow: '0 0 12px rgba(45, 212, 191, 0.8), 0 0 4px rgba(20, 184, 166, 0.9)', textColor: '#2dd4bf' },
                                { label: 'Patient Satisfaction', val: 96, gradient: 'linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)', shadow: '0 0 12px rgba(251, 191, 36, 0.8), 0 0 4px rgba(245, 158, 11, 0.9)', textColor: '#fbbf24' },
                                { label: 'Staff Efficiency', val: 89, gradient: 'linear-gradient(90deg, #7c3aed, #8b5cf6, #c084fc)', shadow: '0 0 12px rgba(192, 132, 252, 0.8), 0 0 4px rgba(139, 92, 246, 0.9)', textColor: '#c084fc' },
                            ].map((s, i) => (
                                <div key={i} className="showcase-bar-item">
                                    <div className="showcase-bar-label">
                                        <span className="text-slate-200 font-medium">{s.label}</span>
                                        <span className="font-bold text-sm tracking-wide" style={{ color: s.textColor }}>{s.val}%</span>
                                    </div>
                                    <div className="showcase-bar-track">
                                        <div 
                                            className="showcase-bar-fill" 
                                            data-val={s.val}
                                            style={{ 
                                                width: `${s.val}%`, 
                                                background: s.gradient, 
                                                boxShadow: s.shadow 
                                            }} 
                                        >
                                            <div className="showcase-bar-head" style={{ background: s.textColor, boxShadow: s.shadow }} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="showcase-panel-stats">
                                <div className="showcase-mini-stat">
                                    <span className="showcase-mini-value">10M+</span>
                                    <span className="showcase-mini-label">Data Points Processed</span>
                                </div>
                                <div className="showcase-mini-stat">
                                    <span className="showcase-mini-value">&lt;50ms</span>
                                    <span className="showcase-mini-label">Avg Response Time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── SECURITY ─────────── */}
            <section className="security-section" ref={securityRef}>
                <div className="section-container">
                    <div className="security-grid">
                        <div className="security-icon-wrap">
                            <Shield className="h-16 w-16 text-brand-teal opacity-80" />
                            <div className="security-rings">
                                <div className="security-ring ring-1" />
                                <div className="security-ring ring-2" />
                                <div className="security-ring ring-3" />
                            </div>
                        </div>
                        <div className="security-content">
                            <div className="section-tag">
                                <Lock className="h-3 w-3" /> Enterprise Security
                            </div>
                            <h2 className="security-title">Your Data is Sacred. We Protect It Like It Is.</h2>
                            <p className="security-desc">
                                Every patient record, every transaction, every login — protected by
                                military-grade encryption, zero-trust architecture, and continuous threat monitoring.
                            </p>
                            <div className="security-badges">
                                {[
                                    { icon: ShieldCheck, title: 'HIPAA Compliant', desc: 'Full healthcare data privacy compliance' },
                                    { icon: Lock, title: 'AES-256 Encryption', desc: 'Data encrypted at rest and in transit' },
                                    { icon: Users, title: 'Role-Based Access', desc: '4-tier permission system for all users' },
                                    { icon: FileText, title: 'Audit Logs', desc: 'Complete activity trail for compliance' },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="security-badge-card">
                                        <Icon className="h-5 w-5 text-brand-teal" />
                                        <div>
                                            <div className="security-badge-title">{title}</div>
                                            <div className="security-badge-desc">{desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── TESTIMONIALS ─────────── */}
            <section id="testimonials" className="testimonials-section">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-tag">
                            <Star className="h-3 w-3" /> Testimonials
                        </div>
                        <h2 className="section-title">Loved by Healthcare Professionals</h2>
                        <p className="section-subtitle">
                            See what hospital administrators and doctors say about OrvantaHealth.
                        </p>
                    </div>
                    <div className="testimonials-grid" ref={testimonialsRef}>
                        {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
                    </div>
                </div>
            </section>

            {/* ─────────── CTA ─────────── */}
            <section className="cta-section" ref={ctaRef}>
                <div className="cta-orb cta-orb-1" />
                <div className="cta-orb cta-orb-2" />
                <div className="section-container cta-container">
                    <div className="cta-icon-wrap">
                        <Activity className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="cta-title">
                        Ready to Transform<br />Your Hospital?
                    </h2>
                    <p className="cta-desc">
                        Join 500+ healthcare facilities already using OrvantaHealth to deliver
                        better care, faster — with less administrative overhead.
                    </p>
                    <div className="cta-actions">
                        <Link to="/register" className="cta-btn-primary">
                            Start Free Trial — No Credit Card
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/contact-sales" className="cta-btn-secondary">
                            <Phone className="h-4 w-4" /> Talk to Sales
                        </Link>
                    </div>
                    <div className="cta-reassurances">
                        {['14-day free trial', 'No credit card required', 'Cancel anytime', 'HIPAA compliant'].map(r => (
                            <span key={r} className="cta-reassurance">
                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-teal" /> {r}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── FOOTER ─────────── */}
            <footer className="landing-footer">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <Activity className="h-5 w-5 text-white" />
                            <span>Orvanta<span className="text-brand-teal">Health</span></span>
                        </div>
                        <p className="footer-tagline">
                            Intelligent Hospital Management System — built for modern healthcare.
                        </p>
                        <div className="footer-contact">
                            <span><Mail className="h-3.5 w-3.5" /> support@orvantahealth.com</span>
                            <span><Phone className="h-3.5 w-3.5" /> +91 98765 43210</span>
                            <span><MapPin className="h-3.5 w-3.5" /> Mumbai, India</span>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-links-col">
                            <h4>Product</h4>
                            {['Features', 'Security', 'Changelog'].map(l => (
                                <a key={l} href="#" className="footer-link">{l}</a>
                            ))}
                        </div>
                        <div className="footer-links-col">
                            <h4>Company</h4>
                            {['About', 'Blog', 'Careers', 'Press'].map(l => (
                                <a key={l} href="#" className="footer-link">{l}</a>
                            ))}
                        </div>
                        <div className="footer-links-col">
                            <h4>Legal</h4>
                            {['Privacy Policy', 'Terms of Service', 'HIPAA Policy', 'Cookie Policy'].map(l => (
                                <a key={l} href="#" className="footer-link">{l}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 OrvantaHealth. All rights reserved.</p>
                    <p>Made with ❤️ for healthcare professionals across India.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
