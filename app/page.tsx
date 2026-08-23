'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ShieldCheck, Zap, BarChart3, TrendingUp, Video, Sparkles, ChevronDown, CheckCircle2, ArrowRight, Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';

const FAQS = [
  {
    q: "How do I get paid as a clipper?",
    a: "We process payments in USDC and USDT via crypto networks. Once your clip hits the view thresholds set by the brand and is verified by our fraud detection AI, your balance is updated and you can withdraw instantly."
  },
  {
    q: "What platforms are supported?",
    a: "Currently, we support automated view tracking for TikTok, YouTube Shorts, Instagram Reels, and X (Twitter) video."
  },
  {
    q: "How do brands verify views are real?",
    a: "We use a proprietary blend of engagement rate analysis, velocity checks, and API audits to ensure brands only pay for legitimate, human impressions."
  },
  {
    q: "Is there a minimum follower requirement?",
    a: "No! Performance is all that matters. Whether you have 10 followers or 10 million, you get paid purely based on the views your clips generate."
  }
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Force scroll to top on load/reload to prevent landing on #brands or #faq
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      
      // Force scroll immediately and shortly after hydration
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 100);
      
      // Clear hash if present to prevent jumping
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 font-sans selection:bg-white/20 pb-10 overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: ['-5%', '5%', '-5%'], 
            y: ['-5%', '5%', '-5%'],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-900/10 blur-[150px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ 
            x: ['5%', '-5%', '5%'], 
            y: ['5%', '-5%', '5%'],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" 
        />
      </div>

      {/* Floating Pill Nav */}
      <motion.nav 
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
        className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
      >
        <div className="flex items-center justify-between p-1.5 bg-[#111111]/80 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-6 pl-4 pr-6 py-1">
            <div className="flex items-center gap-3">
              <img 
                src="https://www.pixelhost.fun/uploads/2026/08/image-1787425436512-b8bfyt.png" 
                alt="Clyppr Logo" 
                className="w-7 h-7 mix-blend-screen"
              />
              <span className="font-gotham tracking-tight text-white text-lg tracking-[-0.02em]">Clyppr</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 pr-1">
            <Show when="signed-out">
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
                <button className="px-4 py-2 text-zinc-400 font-semibold text-sm hover:text-white transition-colors hidden sm:block">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
                <button className="px-6 py-2.5 rounded-full bg-gradient-to-b from-white to-zinc-200 text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform hidden sm:block shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <a href="/dashboard" className="hidden sm:inline-flex px-4 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] transition-transform ml-1">Go to Dashboard</a>
              <UserButton />
            </Show>
            <button 
              className="p-2 ml-1 text-zinc-400 hover:text-white lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl lg:hidden flex flex-col gap-4"
            >
              <div className="flex flex-col gap-3">
                <Show when="signed-out">
                  <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard">
                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
                      Log in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
                    <button className="w-full py-3 rounded-xl bg-gradient-to-b from-white to-zinc-200 text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
                      Sign up
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <a href="/dashboard" className="w-full py-3 rounded-xl bg-white text-black font-bold text-center block">Go to Dashboard</a>
                  <div className="flex justify-center pt-2"><UserButton /></div>
                </Show>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="relative z-10 pt-40 md:pt-48 px-6 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="text-center w-full flex flex-col items-center justify-center mb-24 md:mb-32">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-zinc-400" />
            The Two-Sided Clipper Marketplace
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
            }}
            className="font-recursive flex flex-col items-center justify-center gap-2 md:gap-4 mb-8 w-full max-w-full px-2"
            style={{ 
              fontSize: 'clamp(36px, 8.5vw, 116px)', 
              fontWeight: 400, 
              color: 'rgba(232, 234, 240, 0.92)', 
              letterSpacing: '-0.02em', 
              lineHeight: 1.1 
            }}
          >
            <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
              {"Content into reach.".split(' ').map((word, wIdx) => (
                <div key={wIdx} className="flex overflow-hidden pb-1 -mb-1">
                  {word.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: "100%" },
                        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } }
                      }}
                      className={`inline-block ${wIdx >= 2 ? 'text-zinc-500' : ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
              {"Views into income.".split(' ').map((word, wIdx) => (
                <div key={wIdx} className="flex overflow-hidden pb-1 -mb-1">
                  {word.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: "100%" },
                        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 200 } }
                      }}
                      className={`inline-block ${wIdx >= 2 ? 'text-zinc-500' : ''}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl leading-relaxed mb-10"
          >
            Brands post video campaigns with a budget. Creators cut short clips, post them to social platforms, and get paid based on views.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto px-6 sm:px-0"
          >
            <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-b from-white to-zinc-200 text-black font-bold text-base hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Start Earning
              </button>
            </SignUpButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-full text-zinc-300 font-bold text-base hover:text-white hover:bg-white/10 transition-all border border-white/20">
                Run a Campaign
              </button>
            </SignUpButton>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 text-zinc-500 font-medium"
          >
            <span className="text-sm">Integrated with:</span>
            <div className="flex gap-3">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" className="w-5 h-5 invert opacity-50 hover:opacity-100 transition-opacity" alt="TikTok" />
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" className="w-5 h-5 invert opacity-50 hover:opacity-100 transition-opacity" alt="YouTube" />
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" className="w-5 h-5 invert opacity-50 hover:opacity-100 transition-opacity" alt="Instagram" />
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" className="w-5 h-5 invert opacity-50 hover:opacity-100 transition-opacity" alt="X" />
            </div>
          </motion.div>
        </section>

        {/* Video Showcase Section */}
        <section id="campaigns" className="w-full mb-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">Live from the grid</h2>
            <p className="text-zinc-400 font-medium text-lg">Top performing clips driving real revenue right now.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-4 overflow-hidden relative group">
              <div className="aspect-[9/16] w-full bg-zinc-900 rounded-2xl overflow-hidden relative">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/6WcZEfPa76A?autoplay=0&controls=0&modestbranding=1" 
                  title="YouTube Clip" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="bg-[#111] border border-white/10 rounded-3xl p-4 overflow-hidden relative group">
              <div className="aspect-[9/16] w-full bg-zinc-900 rounded-2xl overflow-hidden relative">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.tiktok.com/embed/v2/7647360918594096397" 
                  title="TikTok Clip" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-3xl p-4 overflow-hidden relative group">
              <div className="aspect-[9/16] w-full bg-zinc-900 rounded-2xl overflow-hidden relative">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/iy5RWHY7ZXE?autoplay=0&controls=0&modestbranding=1" 
                  title="YouTube Short" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid - Core Roles */}
        <section id="brands" className="w-full grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Brand Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between md:min-h-[480px] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center mb-8">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">For Brands</h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                Post your video campaigns and set a budget. Leverage independent creators to multiply your reach across all short-form networks simultaneously. Pay only for verified views.
              </p>
            </div>
            
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
               <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
                 <button className="text-white font-bold flex items-center gap-3 group/btn">
                   Launch Campaign
                   <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-colors">
                     <TrendingUp className="w-4 h-4" />
                   </span>
                 </button>
               </SignUpButton>
            </div>
          </motion.div>

          {/* Clipper Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between md:min-h-[480px] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mb-8">
                <img src="https://www.pixelhost.fun/uploads/2026/08/image-1787425436512-b8bfyt.png" alt="Clyppr" className="w-6 h-6 invert" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">For Clippers</h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                Cut short clips from brand footage and post them to your accounts. Generate views and get paid automatically based on your performance. Stop negotiating, start editing.
              </p>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
               <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
                 <button className="text-white font-bold flex items-center gap-3 group/btn">
                   Start Earning
                   <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-colors">
                     <Play className="w-4 h-4" />
                   </span>
                 </button>
               </SignUpButton>
            </div>
          </motion.div>
        </section>

        {/* Crypto Payment Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="w-full bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-16 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-wider uppercase text-emerald-400 mb-6">
              Web3 Native Payouts
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
              Global payouts, <br/>zero friction.
            </h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8">
              Clyppr operates on a global scale. Clippers are paid out exclusively in stablecoins to bypass traditional banking delays and ridiculous international wire fees.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-4 py-2.5 rounded-xl">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tether.svg" className="w-6 h-6 text-[#26A17B] drop-shadow-[0_0_8px_rgba(38,161,123,0.5)]" alt="USDT" style={{ filter: 'invert(53%) sepia(87%) saturate(350%) hue-rotate(119deg) brightness(87%) contrast(92%)' }} />
                <span className="font-bold text-white tracking-wide">USDT</span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-4 py-2.5 rounded-xl">
                <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png" className="w-6 h-6 drop-shadow-[0_0_8px_rgba(39,117,202,0.5)]" alt="USDC" />
                <span className="font-bold text-white tracking-wide">USDC</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Feature Strip */}
        <motion.section 
          id="features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-16 mb-20"
        >
           <div className="text-center mb-16">
             <h2 className="text-3xl font-display font-bold text-white mb-4">Marketplace Features</h2>
           </div>
           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
             {[
               { title: 'Cross-platform', desc: 'Tracking across TikTok, Reels, Shorts, and X.', icon: <BarChart3 className="w-6 h-6"/> },
               { title: 'Crypto Payouts', desc: 'Instant global payments via USDC/USDT.', icon: <Zap className="w-6 h-6"/> },
               { title: 'Fraud Filtering', desc: 'Advanced bot filtering ensures accurate counts.', icon: <ShieldCheck className="w-6 h-6"/> },
               { title: 'Transparent CPM', desc: 'Clear view-based payouts with no hidden fees.', icon: <TrendingUp className="w-6 h-6"/> }
             ].map((feat, i) => (
               <div key={i} className="flex flex-col items-start">
                 <div className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-white/10 flex items-center justify-center mb-6">
                   {feat.icon}
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-white">{feat.title}</h3>
                 <p className="text-zinc-400 font-medium leading-relaxed">{feat.desc}</p>
               </div>
             ))}
           </div>
        </motion.section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full mb-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">How it Works</h2>
            <p className="text-zinc-400 font-medium text-lg">A frictionless engine for scalable reach.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Brands deposit', desc: 'Set a total budget in USD/Crypto, upload raw assets, and define the target CPM rate for the campaign.' },
              { step: '02', title: 'Clippers distribute', desc: 'Creators browse campaigns, edit assets into optimized shorts, and post them across their networks.' },
              { step: '03', title: 'Smart settlement', desc: 'Our API tracks live view counts. Funds are automatically routed from the brand\'s budget to the clipper\'s wallet.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-3xl p-8 relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                  <span className="font-display font-bold text-xl text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl mx-auto mb-32 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-white text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-zinc-400 font-medium leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-[#111] border border-white/10 rounded-[2.5rem] p-12 md:p-24 mb-20 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white relative z-10">Start scaling today.</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto relative z-10">Join the marketplace where content creators and brands grow together.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
              <button className="px-8 py-4 rounded-full text-zinc-300 font-bold text-lg hover:text-white hover:bg-white/5 transition-all border border-white/10 hover:border-white/20">
                Launch Campaign
              </button>
            </SignUpButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding" forceRedirectUrl="/onboarding">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                Start Earning <ArrowRight className="w-5 h-5" />
              </button>
            </SignUpButton>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-16 pb-8 relative z-10 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://www.pixelhost.fun/uploads/2026/08/image-1787425436512-b8bfyt.png" 
                alt="Clyppr Logo" 
                className="w-8 h-8 mix-blend-screen"
              />
              <span className="font-gotham text-2xl tracking-tight tracking-[-0.02em] text-white">Clyppr</span>
            </div>
            <p className="text-zinc-400 text-sm font-medium max-w-sm leading-relaxed">
              The premier performance marketplace for video clips. Brands bring the budget, you bring the views.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Platform</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-zinc-400">
              <li><a href="#brands" className="hover:text-white transition-colors">For Brands</a></li>
              <li><a href="#campaigns" className="hover:text-white transition-colors">Campaigns</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm font-medium">
            © {new Date().getFullYear()} Clyppr. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
