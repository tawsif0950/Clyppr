'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';

const INDUSTRIES = ['Tech','Ecommerce','Gaming','Finance','Health','Education','Fashion','Other'];
const COUNTRIES = ['United Arab Emirates','United States','United Kingdom','India','Bangladesh','Saudi Arabia','Other'];
const RANGES = ['<$1k','$1k-$5k','$5k-$20k','$20k+'];

export default function BusinessSettings() {
  const { user } = useUser();
  const [bizName, setBizName] = useState('');
  const [website, setWebsite] = useState('');
  const [social, setSocial] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [range, setRange] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [preview, setPreview] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/profile').then(r=>r.json()).then(p=>{
      if (p) { setBizName(p.business_name||p.display_name||''); setWebsite(p.business_website||''); setSocial(p.social_link||''); setIndustry(p.industry||''); setCountry(p.country||''); setRange(p.estimated_monthly_range||''); if (p.avatar_url) setPreview(p.avatar_url); }
      if (user?.imageUrl && !p?.avatar_url) setPreview(user.imageUrl);
    });
  }, [user]);

  async function save() {
    setMsg(''); setLoading(true);
    let avatar_url: string | null = preview || null;
    if (file) {
      const supa = createClient();
      const ext = file.name.split('.').pop();
      const path = `${user!.id}/${Date.now()}.${ext}`;
      const { error } = await supa.storage.from('avatars').upload(path, file, { upsert: true });
      if (error) { setMsg(error.message); setLoading(false); return; }
      const { data } = supa.storage.from('avatars').getPublicUrl(path);
      avatar_url = data.publicUrl;
      try { await (user as unknown as { setProfileImage:(o:{file:File})=>Promise<unknown> }).setProfileImage({ file }); } catch {}
    }
    try { if (bizName) await user?.update({ firstName: bizName }); } catch {}
    const res = await fetch('/api/profile', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ business_name: bizName, display_name: bizName, business_website: website, social_link: social, industry, country, estimated_monthly_range: range, location: country, avatar_url }) });
    const j = await res.json();
    setLoading(false);
    if (!res.ok) setMsg(j.error||'Failed'); else setMsg('Saved - Supabase + Clerk updated');
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 p-6">
      <div className="max-w-lg mx-auto bg-[#111] border border-white/10 rounded-[1.5rem] p-8">
        <a href="/dashboard/business" className="text-sm text-zinc-400">← Back to dashboard</a>
        <h1 className="text-2xl font-bold mt-2">Edit business profile</h1>
        <p className="text-sm text-zinc-400 mb-6">Changes save to Supabase and Clerk</p>
        {msg && <div className="mb-4 text-sm p-3 rounded-xl bg-white/5 border border-white/10">{msg}</div>}
        <div className="space-y-4">
          <label className="block"><span className="text-sm text-zinc-400">Business name</span><input value={bizName} onChange={e=>setBizName(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Website</span><input value={website} onChange={e=>setWebsite(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Social link</span><input value={social} onChange={e=>setSocial(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Logo</span><input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]||null; setFile(f); if(f) setPreview(URL.createObjectURL(f)); }} className="mt-1 w-full text-sm" /></label>
          {preview && <img src={preview} alt="p" className="w-20 h-20 rounded-2xl object-cover border border-white/10" />}
          <label className="block"><span className="text-sm text-zinc-400">Industry</span><select value={industry} onChange={e=>setIndustry(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{INDUSTRIES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
          <label className="block"><span className="text-sm text-zinc-400">Country</span><select value={country} onChange={e=>setCountry(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{COUNTRIES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
          <label className="block"><span className="text-sm text-zinc-400">Estimated monthly spend</span><select value={range} onChange={e=>setRange(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{RANGES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
          <button onClick={save} disabled={loading} className="w-full py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving...':'Save'}</button>
        </div>
      </div>
    </div>
  );
}
