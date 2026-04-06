import React from 'react';
import { Link } from 'react-router-dom';
import {
    Stethoscope,
    Calendar,
    FileText,
    Activity,
    Users,
    ShieldCheck,
    ArrowRight,
    Heart,
    Award,
    Target,
    Github,
    Linkedin,
    Mail,
    Code,
    Lightbulb,
    Star,
    ExternalLink,
    Zap,
    Globe,
    CheckCircle2
} from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-teal selection:text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="glass-card rounded-[2rem] px-8 py-4 flex justify-between items-center border-white/40 shadow-2xl">
                        <div className="flex items-center gap-3 group cursor-pointer transition-all hover:scale-105">
                            <div className="h-12 w-12 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-black text-brand-dark tracking-tighter font-display">Orvanta<span className="text-brand-teal">Health</span></span>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-10">
                            {['Features', 'Intelligence', 'Security', 'About'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-brand-dark font-bold transition-all text-sm uppercase tracking-widest hover:tracking-[0.2em]">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hidden sm:block text-brand-dark hover:text-brand-teal font-black transition-colors text-sm uppercase tracking-widest px-4">
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-brand-dark text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-brand-teal/10 to-transparent -skew-x-12 transform translate-x-1/4"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                        <div className="sm:text-center lg:text-left lg:col-span-12 xl:col-span-6">
                            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-teal/10 text-brand-teal mb-8 animate-fade-in shadow-inner border border-brand-teal/20 backdrop-blur-sm">
                                <Zap className="h-4 w-4 fill-brand-teal" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Hospital OS</span>
                            </div>
                            
                            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter font-display leading-[0.9] mb-8">
                                <span className="block text-brand-dark drop-shadow-sm">Precision Care,</span>
                                <span className="relative inline-block mt-2 text-brand-teal">
                                    <span className="relative z-10">Unified.</span>
                                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-brand-teal/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                                    </svg>
                                </span>
                            </h1>
                            
                            <p className="mt-10 text-xl text-slate-500 font-medium leading-relaxed max-w-xl sm:mx-auto lg:mx-0">
                                Orchestrate your entire medical facility with an intelligent ecosystem designed for the modern practitioner. 
                                <span className="font-bold text-brand-dark"> Elevate every interaction.</span>
                            </p>

                            <div className="mt-14 flex flex-col sm:flex-row gap-6 sm:justify-center lg:justify-start">
                                <Link
                                    to="/register"
                                    className="group relative px-12 py-6 bg-brand-dark text-white rounded-[2rem] text-lg font-black uppercase tracking-widest shadow-[0_20px_50px_-15px_rgba(15,58,58,0.5)] hover:bg-brand-teal transition-all duration-500 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Transform Facility <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-12 py-6 glass-card rounded-[2rem] text-lg font-black text-brand-dark uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 border-white/60"
                                >
                                    Watch System Demo
                                </Link>
                            </div>

                            <div className="mt-16 flex items-center gap-10 sm:justify-center lg:justify-start">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-14 h-14 rounded-2xl border-4 border-brand-light shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all">
                                            <img src={`https://i.pravatar.cc/150?u=health${i}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-brand-dark tracking-tight leading-none">1,200+</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Medical Units Empowered</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 lg:mt-0 lg:col-span-12 xl:col-span-6 relative">
                            {/* Main Hero Visual */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-brand-teal/20 rounded-[4rem] blur-3xl opacity-30 group-hover:opacity-50 transition-all"></div>
                                <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group-hover:scale-[1.01] transition-transform duration-700">
                                    <img 
                                        src="/hospital_hero.png" 
                                        alt="Modern Hospital Interface" 
                                        className="w-full h-[600px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Floating Stat Card 1 */}
                                <div className="absolute -top-10 -right-10 glass-card p-6 rounded-3xl shadow-2xl animate-float active:scale-105 transition-transform cursor-pointer border-brand-teal/30">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                                            <Activity className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                                            <p className="text-2xl font-black text-brand-dark">+38%</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stat Card 2 */}
                                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-[2.5rem] shadow-2xl animate-float transition-all delay-1000 border-white/60">
                                    <div className="flex gap-4 items-center">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="doctor" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="h-10 w-[2px] bg-slate-200"></div>
                                        <div className="flex flex-col">
                                            <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Active Staff</p>
                                            <p className="font-black text-brand-dark leading-none">On Schedule</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-end mb-24">
                        <div>
                            <h2 className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] mb-6">The Infrastructure</h2>
                            <p className="text-5xl md:text-6xl font-black font-display tracking-tighter text-brand-dark leading-[0.95]">
                                Engineered for <br />
                                <span className="italic font-light">Absolute Reliability.</span>
                            </p>
                        </div>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed lg:max-w-md">
                            Every module of OrvantaHealth is built on enterprise-grade architecture, ensuring zero compromises on speed or security.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: 'Unified Data Stream',
                                desc: 'Real-time synchronization across all departments, from reception to critical care.',
                                icon: Globe,
                                color: 'bg-blue-500'
                            },
                            {
                                title: 'Intelligent HUD',
                                desc: 'AI-assisted dashboards provide diagnostic insights and patient trajectory predictions.',
                                icon: Lightbulb,
                                color: 'bg-amber-500'
                            },
                            {
                                title: 'Hardened Security',
                                desc: 'End-to-end encryption with multi-factor biometric authentication protocols.',
                                icon: ShieldCheck,
                                color: 'bg-brand-teal'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group hover-lift p-10 rounded-[3rem] bg-brand-light/50 border border-transparent hover:border-brand-teal/20 transition-all">
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-black font-display mb-4 text-brand-dark tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                <div className="mt-8 flex items-center gap-2 text-brand-teal font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                    Explore Module <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intelligence Section */}
            <section id="intelligence" className="py-32 bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_var(--tw-gradient-stops))] from-brand-teal/20 via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="absolute -inset-10 bg-brand-teal/10 blur-[100px] rounded-full"></div>
                                <div className="relative glass-card-dark p-8 md:p-12 rounded-[3.5rem] border-white/5 space-y-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-100/50">Core AI Heartbeat</span>
                                        </div>
                                        <Activity className="h-5 w-5 text-brand-teal" />
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Neural Processing', val: 98 },
                                            { label: 'Data Accuracy', val: 99.4 },
                                            { label: 'Latency Response', val: 0.04 }
                                        ].map((stat, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-teal-100/40">
                                                    <span>{stat.label}</span>
                                                    <span>{stat.val}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-teal rounded-full" style={{ width: `${stat.val}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-4">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <Users className="h-6 w-6 text-brand-teal mb-4" />
                                            <p className="text-2xl font-black">1.2M</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-100/30 font-display">Patients Managed</p>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                            <Award className="h-6 w-6 text-brand-teal mb-4" />
                                            <p className="text-2xl font-black">0.0%</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-teal-100/30 font-display">Data Breaches</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] mb-6">Deep Intelligence</h2>
                            <h3 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-8 leading-[0.9]">
                                Better Decisions, <br />
                                <span className="text-brand-teal opacity-80">Augmented by AI.</span>
                            </h3>
                            <p className="text-xl text-teal-100/50 font-medium leading-relaxed mb-12 max-w-lg">
                                We've integrated advanced neural models to help predict patient outcomes and optimize equipment allocation, allowing doctors to do what they do best.
                            </p>
                            <div className="space-y-6">
                                {['Automated Diagnostic Routing', 'Predictive Resource Forecasting', 'Sentiment-based Care Analysis'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-3">
                                        <div className="h-8 w-8 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <span className="font-bold text-lg tracking-tight group-hover:text-brand-teal duration-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About the Architect Section */}
            <section id="about" className="py-40 bg-brand-light relative">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative glass-card rounded-[4rem] p-10 md:p-20 border-white/60 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[80px] -mr-48 -mt-48 animate-pulse-slow"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                            <div className="relative group shrink-0">
                                <div className="absolute inset-0 bg-brand-dark rounded-[3.5rem] rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                                <div className="relative w-72 h-72 rounded-[3.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                                    <img 
                                        src="/developer.jpg" 
                                        alt="Ketan Kumar" 
                                        className="w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-dark text-white mb-8 shadow-lg">
                                    <Code className="h-3.5 w-3.5 text-brand-teal" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">Founding Architect</span>
                                </div>
                                <h3 className="text-5xl font-black text-brand-dark font-display mb-6 tracking-tighter">Ketan Kumar</h3>
                                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
                                    Driven by a vision to humanize healthcare through technology. Ketan combined clinical insights with high-performance engineering to build a system that works for the provider, not against them.
                                </p>
                                
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {[
                                        { label: 'GitHub', icon: Github, link: 'https://github.com/Ksingla1885', bg: 'bg-brand-dark', text: 'text-white' },
                                        { label: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/ketan-kumar1885', bg: 'bg-white', text: 'text-brand-dark border-2 border-slate-100' },
                                        { label: 'Contact', icon: Mail, link: 'mailto:ketansingla7988@gmail.com', bg: 'bg-brand-teal/10', text: 'text-brand-teal' }
                                    ].map((social, i) => (
                                        <a 
                                            key={i} 
                                            href={social.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={`flex items-center gap-3 px-8 py-4 rounded-[1.25rem] font-black text-sm uppercase tracking-widest ${social.bg} ${social.text} hover:-translate-y-1 transition-all shadow-lg active:scale-95`}
                                        >
                                            <social.icon className="h-4 w-4" />
                                            <span>{social.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                    <div className="h-24 w-24 bg-brand-light rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner border border-slate-100 animate-float">
                        <Activity className="h-10 w-10 text-brand-teal" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-10 text-brand-dark">
                        The future of care is <span className="text-brand-teal italic font-light">here.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
                        Join the hundreds of medical facilities already using OrvantaHealth to redefine their operational standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/register"
                            className="bg-brand-dark text-white px-14 py-6 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_-15px_rgba(15,58,58,0.4)] hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Get Started Free
                        </Link>
                        <Link 
                            to="/contact-sales" 
                            className="px-14 py-6 glass-card rounded-[2rem] text-xl font-black text-brand-dark uppercase tracking-[0.2em] border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Consult Sales
                        </Link>
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal/0 via-brand-teal/20 to-brand-teal/0"></div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-brand-light py-10 border-t border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Activity className="h-6 w-6 text-brand-teal" />
                            <span className="text-xl font-black font-display tracking-tight text-brand-dark uppercase">OrvantaHealth</span>
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                            &copy; 2024 OrvantaHealth OS • Crafted with Clinical Precision
                        </p>
                        <div className="flex gap-8 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                            <a href="#" className="hover:text-brand-dark transition-colors">Privacy</a>
                            <a href="#" className="hover:text-brand-dark transition-colors">Terms</a>
                            <a href="#" className="hover:text-brand-dark transition-colors">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
