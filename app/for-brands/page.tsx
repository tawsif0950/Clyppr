import Link from 'next/link';

export default function ForBrands() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">For Brands</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Stop paying for impressions that do not convert. Clyppr lets you pay only for verified views from real creators.</p>
      </section>

      <section className="px-6 pb-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-4xl font-bold text-white mb-2">100%</div>
          <p className="text-zinc-400">Pay only for verified views. No wasted budget on bot traffic.</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-4xl font-bold text-white mb-2">24h</div>
          <p className="text-zinc-400">Campaigns go live within 24 hours. Creators start clipping immediately.</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-4xl font-bold text-white mb-2">4+</div>
          <p className="text-zinc-400">Platforms supported: TikTok, YouTube Shorts, Instagram Reels, X.</p>
        </div>
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">How brands use Clyppr</h2>
        <ul className="space-y-4 text-zinc-400">
          <li className="flex gap-3"><span className="text-white font-bold">1.</span> Upload your raw video assets (product shots, ads, b-roll).</li>
          <li className="flex gap-3"><span className="text-white font-bold">2.</span> Set a total budget in USDC/USDT and your target CPM rate.</li>
          <li className="flex gap-3"><span className="text-white font-bold">3.</span> Creators edit and distribute shorts across all major platforms.</li>
          <li className="flex gap-3"><span className="text-white font-bold">4.</span> Track performance in real-time. Pay only for verified views.</li>
        </ul>
        <Link href="/onboarding" className="mt-8 inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold">Launch a Campaign</Link>
      </section>
    </div>
  );
}
