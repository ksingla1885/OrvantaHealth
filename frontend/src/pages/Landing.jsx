import React from 'react';
import { Link } from 'react-router-dom';
import {
    Activity,
    ArrowRight,
    Star,
    Zap,
    Globe,
    CheckCircle2,
    Sparkles,
    Shield,
    TrendingUp,
    Layout,
    FileText,
    ShieldCheck
} from 'lucide-react';

const NavItem = ({ item }) => (
    <a href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-brand-dark font-semibold transition-all text-xs uppercase tracking-widest relative group">
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-teal transition-all group-hover:w-full"></span>
    </a>
);

const FeatureCard = ({ title, desc, icon: Icon, color }) => (
    <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-brand-teal/20 transition-all duration-300 hover:shadow-premium-hover">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
            <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-brand-dark tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Landing = () => {
    return (
        <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-teal selection:text-white overflow-x-hidden relative">
            {/* Minimal Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-teal/5 blur-[100px] rounded-full animate-float"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-[25%] h-[25%] bg-brand-dark/5 blur-[100px] rounded-full"></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto">
                    <div className="glass-card rounded-2xl px-8 py-4 flex justify-between items-center shadow-premium backdrop-blur-xl">
                        <div className="flex items-center gap-3 transition-opacity hover:opacity-80 cursor-pointer">
                            <div className="h-10 w-10 bg-brand-dark rounded-xl flex items-center justify-center shadow-lg">
                                <Activity className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-brand-dark tracking-tight font-display">
                                Orvanta<span className="text-brand-teal">Health</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            {['Innovations', 'Intelligence', 'Security'].map((item) => (
                                <NavItem key={item} item={item} />
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hidden sm:block text-slate-500 hover:text-brand-dark font-bold text-xs uppercase tracking-widest px-4 transition-colors">
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-brand-teal hover:scale-105 transition-all duration-300"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal mb-8 border border-brand-teal/20 animate-fade-in">
                                <Sparkles className="h-3 w-3" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Next-Gen Clinical OS</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark mb-8 leading-[1.1]">
                                Future of <span className="text-brand-teal">Healthcare</span> <br />
                                Simplified.
                            </h1>

                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-12 opacity-80">
                                Experience the fusion of clinical precision and generative intelligence. Elevate your practice with the world's most advanced operating system.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    to="/register"
                                    className="px-10 py-5 bg-brand-dark text-white rounded-2xl text-sm font-bold uppercase tracking-widest shadow-xl hover:bg-brand-teal transition-all flex items-center justify-center gap-3"
                                >
                                    Deploy System <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-10 py-5 bg-white border border-slate-200 text-brand-dark rounded-2xl text-sm font-bold uppercase tracking-widest hover:border-brand-teal transition-all flex items-center justify-center gap-3"
                                >
                                    View Demo
                                </Link>
                            </div>

                            <div className="mt-16 flex items-center gap-8 border-t border-slate-100 pt-12">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                            <img src={`https://i.pravatar.cc/100?u=doc${i}`} alt="doc" className="w-full h-full object-cover grayscale" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm font-medium">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                                        <span className="ml-2 text-brand-dark font-bold">4.9/5 Rating</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Trusted by 500+ Providers</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal/20 to-brand-dark/20 blur-2xl rounded-[3rem] opacity-30"></div>
                            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden transform group-hover:scale-[1.01] transition-all duration-500">
                                <div className="aspect-[4/5] md:aspect-[4/3] rounded-[2rem] overflow-hidden relative">
                                    <img
                                        src="/hospital_hero.png"
                                        alt="Dashboard"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
                                </div>

                                {/* Floating Overlay Card */}
                                <div className="absolute bottom-10 left-10 glass-card-dark p-6 rounded-2xl max-w-[240px] animate-float">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-8 w-8 bg-brand-teal rounded-lg flex items-center justify-center">
                                            <TrendingUp className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-white font-bold text-sm tracking-tight">+42% Growth</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-teal w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Innovations Section */}
            <section id="innovations" className="py-32 bg-white">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-20">
                        <span className="text-xs font-bold text-brand-teal uppercase tracking-[0.3em] mb-4 block">Core Architecture</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">Built for Clinical Excellence</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {[
                            { title: 'Neural Diagnostics', desc: 'AI models trained on clinical patterns for diagnostic assistance.', icon: Zap, color: 'bg-indigo-600' },
                            { title: 'Unified Data Fabric', desc: 'Secure data propagation across networks with sub-10ms latency.', icon: Globe, color: 'bg-cyan-600' },
                            { title: 'Vault Security', desc: 'Military-grade encryption for absolute patient dossier integrity.', icon: Shield, color: 'bg-brand-dark' },
                            { title: 'Intuitive UX', desc: 'Low-cognitive interfaces designed for high-stress environments.', icon: Layout, color: 'bg-pink-600' },
                            { title: '4-Tier Security', desc: 'Advanced multi-layer defensive architecture for un-compromised health data isolation.', icon: ShieldCheck, color: 'bg-emerald-600' },
                            { title: 'Smart Billing', desc: 'Automated, transparent financial reconciliation for clarity.', icon: FileText, color: 'bg-amber-600' }
                        ].map((feature, idx) => (
                            <FeatureCard key={idx} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Intelligence Section */}
            <section id="intelligence" className="py-32 bg-brand-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/5 blur-[120px] -z-0"></div>
                <div className="max-w-6xl mx-auto px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="bg-white/5 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10">
                            <div className="flex items-center gap-3 mb-10">
                                <Sparkles className="h-5 w-5 text-brand-teal" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-100/40">AI Intelligence Core</span>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: 'Synthetic Reasoning', val: 99 },
                                    { label: 'Diagnostic Precision', val: 98 },
                                    { label: 'Processing Speed', val: 100 }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-teal-100/30">
                                            <span>{stat.label}</span>
                                            <span>{stat.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full">
                                            <div className="h-full bg-brand-teal rounded-full" style={{ width: `${stat.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-12">
                                <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-3xl font-bold mb-1">10M+</p>
                                    <p className="text-[10px] uppercase tracking-widest text-teal-100/20">Data Points</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-3xl font-bold mb-1">99.9%</p>
                                    <p className="text-[10px] uppercase tracking-widest text-teal-100/20">Accuracy</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-brand-teal uppercase tracking-[0.3em] mb-6 block">Intelligence</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                                Smarter Decisions. <br />
                                Better Outcomes.
                            </h2>
                            <p className="text-lg text-teal-100/40 font-medium leading-relaxed mb-10">
                                Our platform integrates clinical intelligence to cross-reference data in real-time, providing doctors with unmatched decision support.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Real-time diagnostic assistance',
                                    'Predictive trajectory modeling',
                                    'Personalized treatment paths'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-2">
                                        <div className="h-8 w-8 rounded-lg bg-brand-teal/20 flex items-center justify-center text-brand-teal">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <span className="font-bold text-lg text-teal-100/80 group-hover:text-brand-teal transition-colors tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-brand-light relative">
                <div className="max-w-4xl mx-auto text-center px-8">
                    <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-premium">
                        <Activity className="h-10 w-10 text-brand-teal" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-brand-dark">
                        Ready to Transform <br /> Your Practice?
                    </h2>
                    <p className="text-lg text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join hundreds of healthcare facilities already using OrvantaHealth to redefine their clinical standards.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/register"
                            className="px-12 py-5 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:bg-brand-teal transition-all"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            to="/contact-sales"
                            className="px-12 py-5 bg-white border border-slate-200 text-brand-dark rounded-2xl font-bold uppercase tracking-widest hover:border-brand-teal transition-all"
                        >
                            Talk to Sales
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-white py-12 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-brand-teal" />
                            <span className="text-lg font-bold text-brand-dark tracking-tight">OrvantaHealth</span>
                        </div>
                        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            <a href="#" className="hover:text-brand-dark transition-colors">Privacy</a>
                            <a href="#" className="hover:text-brand-dark transition-colors">Terms</a>
                            <a href="#" className="hover:text-brand-dark transition-colors">Security</a>
                            <a href="#" className="hover:text-brand-dark transition-colors">Contact</a>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            &copy; 2024 OrvantaHealth. Integrated Clinical OS.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
