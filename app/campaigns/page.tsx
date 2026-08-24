'use client';
import { motion } from 'motion/react';
import { Play, TrendingUp, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CAMPAIGNS = [
  { brand: 'FitFuel', title: 'Summer energy drink launch', budget: '$5,000', cpm: '$1.50', clips: 12, views: '2.4M', status: 'Live' },
  { brand: 'NexaTech', title: 'New wireless earbuds promo', budget: '$8,000', cpm: '$2.00', clips: 8, views: '1.1M', status: 'Live' },
  { brand: 'UrbanStyle', title: 'Streetwear collection launch', budget: '$3,500', cpm: '$1.20', clips: 15, views: '900K', status: 'Live' },
  { brand: 'CloudPlay', title: 'Mobile game ads', budget: '$12,000', cpm: '$3.00', clips: 5, views: '3.8M', status: 'Ending soon' },
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Live Campaigns</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Browse active campaigns from brands. Pick one, cut clips, post them, and get paid per view.</p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {CAMPAIGNS.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/10 rounded-[2rem] p-8 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-zinc-400">{c.brand}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${c.status === 'Ending soon' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{c.status}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{c.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-3"><span className="text-xs text-zinc-500 block">Budget</span><span className="font-bold text-white">{c.budget}</span></div>
              <div className="bg-white/5 rounded-xl p-3"><span className="text-xs text-zinc-500 block">CPM</span><span className="font-bold text-white">{c.cpm}</span></div>
              <div className="bg-white/5 rounded-xl p-3"><span className="text-xs text-zinc-500 block">Clips</span><span className="font-bold text-white">{c.clips}</span></div>
              <div className="bg-white/5 rounded-xl p-3"><span className="text-xs text-zinc-500 block">Views</span><span className="font-bold text-white">{c.views}</span></div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4" /> View Campaign <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto text-center">
        <p className="text-zinc-500 mb-4">For brands: post your own campaign and let creators drive real engagement.</p>
        <Link href="/onboarding" className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold">Launch a Campaign</Link>
      </section>
    </div>
  );
}
