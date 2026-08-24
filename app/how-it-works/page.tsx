'use client';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';

const STEPS = [
  { step: '01', title: 'Brands set the budget', desc: 'Upload your raw video assets and set a target CPM rate. Funds are held in escrow as USDC/USDT until views are verified.', icon: <TrendingUp className="w-6 h-6" /> },
  { step: '02', title: 'Creators cut and distribute', desc: 'Browse campaigns, edit brand footage into optimized short-form clips, and post them across TikTok, YouTube Shorts, Instagram Reels, and X.', icon: <BarChart3 className="w-6 h-6" /> },
  { step: '03', title: 'Smart settlement', desc: 'Our API tracks live view counts across all platforms. Funds are automatically routed from the brand budget to the creator wallet via crypto.', icon: <Zap className="w-6 h-6" /> },
  { step: '04', title: 'Fraud-free performance', desc: 'Every view is validated through engagement analysis, velocity checks, and API audits. Brands only pay for real human impressions.', icon: <ShieldCheck className="w-6 h-6" /> },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">How it Works</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">A frictionless engine for scalable reach. No agencies, no middlemen, no delays.</p>
      </section>

      <section className="px-6 pb-20 max-w-4xl mx-auto space-y-6">
        {STEPS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="bg-[#111] border border-white/10 rounded-[2rem] p-8 flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-white">{s.step}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">{s.icon}<h3 className="text-xl font-bold text-white">{s.title}</h3></div>
              <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
