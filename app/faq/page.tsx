'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  { q: 'How do I get paid as a clipper?', a: 'We process payouts in USDC and USDT via crypto networks. Once your clip hits the view thresholds set by the brand and is verified by our fraud detection system, your balance is updated and you can withdraw instantly to your wallet.' },
  { q: 'What platforms are supported?', a: 'Currently we support automated view tracking for TikTok, YouTube Shorts, Instagram Reels, and X (Twitter) video. We are actively adding more platforms.' },
  { q: 'How do brands verify views are real?', a: 'We use a proprietary blend of engagement rate analysis, velocity checks, and API audits to ensure brands only pay for legitimate, human impressions. No bots, no inflation.' },
  { q: 'Is there a minimum follower requirement?', a: 'No! Performance is all that matters. Whether you have 10 followers or 10 million, you get paid purely based on the views your clips generate.' },
  { q: 'How much can I earn?', a: 'Earnings depend on your CPM rate set by the brand and the views you generate. Typical rates are $1-$5 per 1000 views. Top clippers earn thousands of dollars per month.' },
  { q: 'What types of content can I create?', a: 'You can cut short-form clips from brand-provided footage: reaction videos, product highlights, tutorials, memes, trend-based edits, and more. As long as it drives views, brands want it.' },
  { q: 'How do brands set up a campaign?', a: 'Sign up as a Business, upload your raw video assets, set a budget in USDC/USDT, define your target CPM, and launch. Creators will start picking up your campaign immediately.' },
  { q: 'What are the fees?', a: 'Clyppr charges a small platform fee on completed campaigns. Creators keep the majority of their earnings. Brands pay only for verified views.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Everything you need to know about Clyppr.</p>
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
              <span className="font-bold text-white">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 text-zinc-400 leading-relaxed border-t border-white/5">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto text-center">
        <p className="text-zinc-500 mb-4">Still have questions?</p>
        <Link href="/contact" className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold">Contact Us</Link>
      </section>
    </div>
  );
}
