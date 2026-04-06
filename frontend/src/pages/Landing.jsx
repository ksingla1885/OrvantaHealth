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
    CheckCircle2,
    Sparkles,
    Shield,
    TrendingUp,
    Layout
} from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-teal selection:text-white overflow-x-hidden relative">
            {/* Mesh Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-[1000px] pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-teal/10 blur-[120px] rounded-full animate-mesh"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-brand-dark/5 blur-[100px] rounded-full animate-mesh delay-700"></div>
                <div className="absolute bottom-[0%] left-[20%] w-[25%] h-[25%] bg-brand-teal/5 blur-[80px] rounded-full animate-mesh delay-1000"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="glass-card rounded-[2.5rem] px-10 py-5 flex justify-between items-center border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                        <div className="flex items-center gap-4 group cursor-pointer transition-all hover:scale-105 active:scale-95">
                            <div className="h-12 w-12 bg-brand-dark rounded-2xl flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(15,58,58,0.4)] transform group-hover:rotate-12 transition-all duration-500">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-2xl font-black text-brand-dark tracking-tighter font-display leading-none">
                                Orvanta<span className="text-brand-teal">Health</span>
                            </span>
                        </div>

                        <div className="hidden lg:flex items-center gap-12">
                            {['Innovations', 'Intelligence', 'Security', 'Enterprise'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-brand-dark font-bold transition-all text-xs uppercase tracking-[0.25em] hover:tracking-[0.4em] relative group">
                                    {item}
                                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-teal transition-all group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <Link to="/login" className="hidden sm:block text-brand-dark hover:text-brand-teal font-black transition-all text-xs uppercase tracking-widest px-4 border-r border-slate-200">
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-12px_rgba(15,58,58,0.3)] hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-500 glass-shine"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-60 pb-40 overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-20">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-24 items-center">
                        <div className="lg:col-span-12 xl:col-span-7 text-center xl:text-left">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 backdrop-blur-md text-brand-teal mb-10 animate-fade-in shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border border-brand-teal/10">
                                <Sparkles className="h-4 w-4 fill-brand-teal animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Redefining Clinical Workflow</span>
                            </div>

                            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter font-display leading-[0.85] mb-12">
                                <span className="block text-brand-dark opacity-0 animate-slide-up stagger-1">Future Of</span>
                                <span className="relative inline-block mt-4 text-brand-teal opacity-0 animate-slide-up stagger-2">
                                    <span className="relative z-10 italic">HealthCare.</span>
                                    <div className="absolute -bottom-4 left-0 w-full h-4 bg-brand-teal/10 blur-xl"></div>
                                </span>
                            </h1>

                            <p className="mt-12 text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto xl:mx-0 opacity-0 animate-slide-up stagger-3">
                                Experience the fusion of clinical precision and generative intelligence.
                                <span className="font-bold text-brand-dark"> Elevate your practice beyond conventional boundaries.</span>
                            </p>

                            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center xl:justify-start opacity-0 animate-slide-up stagger-4">
                                <Link
                                    to="/register"
                                    className="group relative px-14 py-7 bg-brand-dark text-white rounded-[2.5rem] text-lg font-black uppercase tracking-[0.2em] shadow-[0_40px_80px_-20px_rgba(15,58,58,0.5)] hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden glass-shine"
                                >
                                    <span className="relative z-10 flex items-center gap-4">
                                        Deploy System <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
                                    </span>
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-14 py-7 glass-card rounded-[2.5rem] text-lg font-black text-brand-dark uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-4 border-white/60 shadow-xl"
                                >
                                    Clinical Demo
                                </Link>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-24 flex items-center gap-12 justify-center xl:justify-start opacity-0 animate-fade-in stagger-4">
                                <div className="flex -space-x-5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-16 h-16 rounded-[1.5rem] border-4 border-brand-light shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 relative group">
                                            <img src={`https://i.pravatar.cc/150?u=doc${i}`} alt="doc" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-12 w-[1px] bg-slate-200 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        <span className="text-xl font-black text-brand-dark">4.9/5</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Provider Satisfaction</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-12 xl:col-span-5 relative mt-32 xl:mt-0 perspective-1000">
                            {/* Premium Visual Composition */}
                            <div className="relative group transition-all duration-1000 animate-fade-in stagger-3">
                                {/* Decorative Glow */}
                                <div className="absolute -inset-20 bg-brand-teal/10 blur-[150px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>

                                <div className="relative rounded-[4rem] overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.2)] border-[12px] border-white group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-700">
                                    <img
                                        src="/hospital_hero.png"
                                        alt="Intelligence Dashboard"
                                        className="w-full h-[700px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>

                                    {/* HUD Overlays */}
                                    <div className="absolute top-10 left-10 glass-card-dark p-6 rounded-[2rem] border-white/10 shadow-2xl animate-float">
                                        <Activity className="h-8 w-8 text-brand-teal mb-3" />
                                        <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-teal w-2/3 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Modules */}
                                <div className="absolute -top-12 -right-12 glass-card p-8 rounded-[3rem] shadow-[0_32px_64px_rgba(0,0,0,0.15)] animate-float border-white/80 active:scale-105 transition-transform cursor-help">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-16 w-16 bg-brand-dark rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
                                            <TrendingUp className="h-8 w-8" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency</p>
                                            <p className="text-3xl font-black text-brand-dark">+42%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-16 -left-16 glass-card p-10 rounded-[3.5rem] shadow-2xl animate-float delay-1000 border-white/60">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                                <Users className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-brand-dark">Staff Sync</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Everywhere</p>
                                            </div>
                                        </div>
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-lg border-2 border-white bg-slate-100"></div>
                                            ))}
                                            <div className="w-10 h-10 rounded-lg bg-brand-teal text-white flex items-center justify-center text-[10px] font-black border-2 border-white">+12</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Innovations Section */}
            <section id="innovations" className="py-40 bg-white relative">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="flex flex-col items-center text-center mb-32">
                        <h2 className="text-[11px] font-black text-brand-teal uppercase tracking-[0.5em] mb-8">Clinical Architecture</h2>
                        <h3 className="text-6xl md:text-7xl font-black font-display tracking-tighter text-brand-dark leading-none">
                            Built for <span className="italic font-light">Infinite Scalability.</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Neural Core',
                                desc: 'Proprietary AI models trained on millions of clinical success patterns for diagnostic assistance.',
                                icon: Zap,
                                color: 'bg-[#4F46E5]'
                            },
                            {
                                title: 'Unified Data Fabric',
                                desc: 'Instantaneous data propagation across global healthcare networks with sub-10ms latency.',
                                icon: Globe,
                                color: 'bg-[#06B6D4]'
                            },
                            {
                                title: 'Quantum Security',
                                desc: 'Post-quantum encryption layers ensuring patient dossier integrity for decades.',
                                icon: Shield,
                                color: 'bg-brand-dark'
                            },
                            {
                                title: 'Holographic UX',
                                desc: 'Intuitive, low-cognitive-load interfaces designed for high-stress medical environments.',
                                icon: Layout,
                                color: 'bg-[#EC4899]'
                            },
                            {
                                title: 'Smart Ecosystem',
                                desc: 'Natively integrates with modern lab equipment, imaging systems, and IoT vitals.',
                                icon: Activity,
                                color: 'bg-[#10B981]'
                            },
                            {
                                title: 'Automated Billing',
                                desc: 'Blockchain-backed transparent financial reconciliation for absolute clarity.',
                                icon: FileText,
                                color: 'bg-amber-500'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-12 rounded-[3.5rem] bg-brand-light/40 border border-transparent hover:border-brand-teal/20 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4">
                                <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700`}>
                                    <item.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-3xl font-black font-display mb-6 text-brand-dark tracking-tight">{item.title}</h3>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed group-hover:text-slate-700 transition-colors">{item.desc}</p>
                                <div className="mt-10 flex items-center gap-3 text-brand-teal font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all">
                                    Technical Specs <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intelligence Feature Section */}
            <section id="intelligence" className="py-40 bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_#0d9488_0%,_transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_#0f3a3a_0%,_transparent_50%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-10 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 gap-32 items-center">
                        <div className="relative">
                            <div className="absolute -inset-20 bg-brand-teal/20 blur-[150px] rounded-full"></div>
                            <div className="relative glass-card-dark p-12 md:p-20 rounded-[5rem] border-white/5 space-y-12 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-4 w-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]"></div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-teal-100/40">AI Neural Activity</span>
                                    </div>
                                    <Sparkles className="h-6 w-6 text-brand-teal animate-float" />
                                </div>

                                <div className="space-y-10">
                                    {[
                                        { label: 'Synthetic Reasoning', val: 99.8, color: 'bg-brand-teal' },
                                        { label: 'Protocol Adherence', val: 100, color: 'bg-blue-500' },
                                        { label: 'Diagnostic Speed', val: 0.002, color: 'bg-purple-500', unit: 'ms' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-teal-100/30">
                                                <span>{stat.label}</span>
                                                <span>{stat.val}{stat.unit || '%'}</span>
                                            </div>
                                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{ width: i === 2 ? '100%' : `${stat.val}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-8">
                                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                                        <Activity className="h-10 w-10 text-brand-teal mb-6 group-hover:scale-110 transition-transform" />
                                        <p className="text-4xl font-black font-display mb-2">10M+</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-teal-100/20">Data Points/Sec</p>
                                    </div>
                                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                                        <ShieldCheck className="h-10 w-10 text-brand-teal mb-6 group-hover:scale-110 transition-transform" />
                                        <p className="text-4xl font-black font-display mb-2">Tier-4</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-teal-100/20">Security Architecture</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[11px] font-black text-brand-teal uppercase tracking-[0.5em] mb-10">Advanced Intelligence</h2>
                            <h3 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-12 leading-[0.85]">
                                Decisions At The <br />
                                <span className="text-brand-teal italic font-light opacity-90">Speed of Thought.</span>
                            </h3>
                            <p className="text-2xl text-teal-100/40 font-medium leading-relaxed mb-16 max-w-xl">
                                We've embedded proprietary large biological models that cross-reference vast clinical libraries in real-time, providing practitioners with unmatched decision support.
                            </p>
                            <div className="space-y-8">
                                {[
                                    'Context-Aware Diagnostic Assistance',
                                    'Predictive Patient Trajectory Modeling',
                                    'Hyper-Personalized Treatment Paths',
                                    'Real-time Interaction Scrubbing'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 group cursor-pointer transition-all hover:translate-x-6">
                                        <div className="h-12 w-12 rounded-[1.25rem] bg-brand-teal flex items-center justify-center text-brand-dark shadow-[0_0_30px_rgba(13,148,136,0.3)]">
                                            <CheckCircle2 className="h-6 w-6" />
                                        </div>
                                        <span className="font-black text-2xl tracking-tighter group-hover:text-brand-teal duration-500 transition-colors uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="enterprise" className="py-40 bg-brand-light relative">
                <div className="max-w-6xl mx-auto px-10">
                    <div className="relative glass-card rounded-[5rem] p-16 md:p-32 border-white shadow-[0_120px_240px_-60px_rgba(0,0,0,0.15)] overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[150px] -mr-64 -mt-64 animate-pulse-slow"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-24">
                            <div className="relative group shrink-0 perspective-1000">
                                <div className="absolute inset-0 bg-brand-dark rounded-[4rem] rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-2xl"></div>
                                <div className="relative w-80 h-80 rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:scale-105 active:scale-100">
                                    <img
                                        src="/developer.jpg"
                                        alt="Ketan Kumar"
                                        className="w-full h-full object-cover object-top scale-110 group-hover:scale-100 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-dark text-white mb-10 shadow-2xl">
                                    <Code className="h-4 w-4 text-brand-teal animate-pulse" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] leading-none mt-1">Founding Visionary</span>
                                </div>
                                <h3 className="text-7xl font-black text-brand-dark font-display mb-8 tracking-tighter uppercase leading-none">Ketan Kumar</h3>
                                <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12">
                                    Dedicated to the intersection of code and care. Ketan designed OrvantaHealth to eliminate the friction between medical experts and technical systems, creating a seamless environment for healing.
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                    {[
                                        { label: 'Network', icon: Linkedin, link: 'https://www.linkedin.com/in/ketan-kumar1885', bg: 'bg-brand-dark', text: 'text-white' },
                                        { label: 'Source', icon: Github, link: 'https://github.com/Ksingla1885', bg: 'bg-white', text: 'text-brand-dark shadow-xl' },
                                        { label: 'Direct', icon: Mail, link: 'mailto:ketansingla7988@gmail.com', bg: 'bg-brand-teal/10', text: 'text-brand-teal shadow-none' }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-4 px-10 py-5 rounded-[1.75rem] font-black text-xs uppercase tracking-[0.25em] ${social.bg} ${social.text} hover:-translate-y-2 transition-all duration-500 shadow-2xl active:scale-95 border border-transparent hover:border-brand-teal/20`}
                                        >
                                            <social.icon className="h-5 w-5" />
                                            <span>{social.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ultimate CTA */}
            <section className="py-60 bg-white relative overflow-hidden">
                <div className="max-w-5xl mx-auto text-center px-10 relative z-10">
                    <div className="h-32 w-32 bg-brand-light rounded-[3rem] flex items-center justify-center mx-auto mb-16 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-slate-100 animate-float translate-y-[-10px]">
                        <Activity className="h-14 w-14 text-brand-teal" />
                    </div>
                    <h2 className="text-7xl md:text-9xl font-black font-display tracking-tighter mb-12 text-brand-dark leading-none">
                        Ready for the <br />
                        <span className="text-brand-teal italic font-light">Great Leap?</span>
                    </h2>
                    <p className="text-2xl text-slate-500 font-medium mb-20 max-w-3xl mx-auto leading-relaxed opacity-80">
                        Join the vanguard of global healthcare facilities redefining operational standards with OrvantaHealth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto bg-brand-dark text-white px-20 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-[0.3em] shadow-[0_40px_80px_-20px_rgba(15,58,58,0.6)] hover:bg-brand-teal hover:scale-105 active:scale-95 transition-all duration-500 glass-shine text-center"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/contact-sales"
                            className="w-full sm:w-auto px-20 py-8 glass-card rounded-[2.5rem] text-2xl font-black text-brand-dark uppercase tracking-[0.3em] border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-500 shadow-xl text-center"
                        >
                            Consult Sales
                        </Link>
                    </div>
                </div>

                {/* Visual Anchor */}
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent"></div>
            </section>

            {/* Footer */}
            <footer className="bg-brand-light py-20 border-t border-slate-200/40 relative z-20">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                            <div className="flex items-center gap-4">
                                <Activity className="h-8 w-8 text-brand-teal shadow-[0_0_20px_rgba(13,148,136,0.3)]" />
                                <span className="text-3xl font-black font-display tracking-tighter text-brand-dark uppercase leading-none mt-1">OrvantaHealth</span>
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs leading-loose">
                                &copy; 2024 • Clinical Operating System <br /> Crafted for Human Excellence.
                            </p>
                        </div>

                        <div className="lg:col-span-7 flex flex-wrap justify-center lg:justify-end gap-16 text-slate-400 font-black text-xs uppercase tracking-[0.3em]">
                            {['Intelligence', 'Security', 'Enterprise', 'Privacy', 'Network'].map(link => (
                                <a key={link} href="#" className="hover:text-brand-dark hover:tracking-[0.5em] transition-all duration-500 relative group">
                                    {link}
                                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-brand-teal/20 transition-all group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
