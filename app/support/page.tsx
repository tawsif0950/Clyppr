export default function Support() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Support</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">We are here to help. Reach out anytime.</p>
      </section>

      <section className="px-6 pb-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-3xl mb-4">📧</div>
          <h3 className="font-bold text-lg mb-2">Email Support</h3>
          <p className="text-zinc-400 mb-4">Get a response within 24 hours.</p>
          <a href="mailto:support@clyppr.com" className="inline-block px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm">support@clyppr.com</a>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="font-bold text-lg mb-2">Discord Community</h3>
          <p className="text-zinc-400 mb-4">Chat with creators and brands in real time.</p>
          <a href="#" className="inline-block px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm">Join Discord</a>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 text-center">
          <div className="text-3xl mb-4">📖</div>
          <h3 className="font-bold text-lg mb-2">Help Center</h3>
          <p className="text-zinc-400 mb-4">Browse articles and guides for common questions.</p>
          <a href="/faq" className="inline-block px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm">View FAQ</a>
        </div>
      </section>
    </div>
  );
}
