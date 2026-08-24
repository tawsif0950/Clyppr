'use client';
import { motion } from 'motion/react';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function send(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50">
      <section className="pt-40 pb-16 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Questions, partnerships, or support. We would love to hear from you.</p>
      </section>

      <section className="px-6 pb-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
          <h2 className="text-2xl font-bold mb-6">Send a message</h2>
          {sent ? (
            <div className="text-center py-12"><p className="text-2xl font-bold mb-2">Message sent!</p><p className="text-zinc-400">We will get back to you within 24 hours.</p></div>
          ) : (
            <form onSubmit={send} className="space-y-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500" />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500" />
              <select value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white">
                <option className="bg-[#111]" value="">Subject</option>
                <option className="bg-[#111]" value="general">General inquiry</option>
                <option className="bg-[#111]" value="support">Support</option>
                <option className="bg-[#111]" value="brand">Brand partnership</option>
                <option className="bg-[#111]" value="creator">Creator program</option>
              </select>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 resize-none" />
              <button type="submit" className="w-full py-3.5 rounded-full bg-white text-black font-bold">Send Message</button>
            </form>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
            <Mail className="w-6 h-6 mb-4 text-zinc-400" />
            <h3 className="font-bold text-lg mb-1">Email</h3>
            <p className="text-zinc-400">support@clyppr.com</p>
            <a href="mailto:support@clyppr.com" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-white">Write to us <ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
            <MessageCircle className="w-6 h-6 mb-4 text-zinc-400" />
            <h3 className="font-bold text-lg mb-1">Community</h3>
            <p className="text-zinc-400">Join our Discord for real-time support and creator discussions.</p>
            <a href="#" className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-white">Join Discord <ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8">
            <h3 className="font-bold text-lg mb-1">Business Hours</h3>
            <p className="text-zinc-400">We operate 24/7 globally. Crypto never sleeps.</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
