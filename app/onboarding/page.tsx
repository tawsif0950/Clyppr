'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';

const INDUSTRIES = ['Tech','Ecommerce','Gaming','Finance','Health','Education','Fashion','Other'];
const COUNTRIES = ['United Arab Emirates','United States','United Kingdom','India','Bangladesh','Saudi Arabia','Other'];
const RANGES = ['<$1k','$1k-$5k','$5k-$20k','$20k+'];

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const r = useRouter();
  const [role, setRole] = useState<'creator'|'business'|null>(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [bizName, setBizName] = useState('');
  const [website, setWebsite] = useState('');
  const [social, setSocial] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [range, setRange] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [preview, setPreview] = useState('');
  const [step, setStep] = useState(1);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { r.replace('/sign-in'); return; }
    fetch('/api/profile').then(v=>v.json()).then(p=>{
      if (p?.onboarding_completed) r.replace(p.role==='business'?'/dashboard/business':'/dashboard/creator');
      else if (p) {
        if (p.role) setRole(p.role);
        if (p.username) setUsername(p.username);
        if (p.display_name) setDisplayName(p.display_name);
        if (p.location) setLocation(p.location);
        if (p.language) setLanguage(p.language);
        if (p.business_name) setBizName(p.business_name);
        if (p.avatar_url) setPreview(p.avatar_url);
      }
    });
    if (user.fullName) setDisplayName(user.fullName);
  }, [isLoaded, user, r]);

  function onFile(f: File|null) {
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function uploadAvatar(): Promise<string|null> {
    if (!file) return preview || null;
    const supa = createClient();
    const ext = file.name.split('.').pop();
    const path = `${user!.id}/${Date.now()}.${ext}`;
    const { error } = await supa.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) { setErr(error.message); return null; }
    const { data } = supa.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  }

  async function submit() {
    setErr(''); setLoading(true);
    const avatar_url = await uploadAvatar();
    if (file && user) { try { await (user as unknown as { setProfileImage: (o:{file:File})=>Promise<unknown> }).setProfileImage({ file }); } catch {} }
    if (err) { setLoading(false); return; }
    const payload: Record<string, unknown> = { role: role!, onboarding_completed: true, avatar_url: avatar_url || preview || user?.imageUrl || null };
    if (role==='creator') {
      payload.username = username.replace(/^@/,'').toLowerCase().trim();
      payload.display_name = displayName.trim();
      payload.location = location.trim();
      payload.language = language;
    } else {
      payload.business_name = bizName.trim();
      payload.display_name = bizName.trim();
      payload.business_website = website.trim();
      payload.social_link = social.trim();
      payload.industry = industry;
      payload.country = country;
      payload.estimated_monthly_range = range;
      payload.location = country; // keep location for compat
      payload.language = language;
    }
    const res = await fetch('/api/profile', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const j = await res.json();
    setLoading(false);
    if (!res.ok) { setErr(j.error||'Failed'); return; }
    r.push(role==='business'?'/dashboard/business':'/dashboard/creator');
  }

  if (!isLoaded) return <div className="min-h-screen bg-[#050505] text-white grid place-items-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#111] border border-white/10 rounded-[2rem] p-8">
        <p className="text-sm text-zinc-500 mb-2">Step {step} / {role==='creator'?4:5}</p>
        <h1 className="text-3xl font-bold mb-1">Welcome to Clyppr</h1>
        <p className="text-zinc-400 mb-6 text-sm">Anyone who signs in gets an account - finish setup to continue.</p>
        {err && <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm">{err}</div>}

        {step===1 && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-300">Are you a Creator or a Business?</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={()=>{setRole('creator'); setStep(2)}} className={`p-6 rounded-2xl border text-left ${role==='creator'?'bg-white text-black border-white':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <div className="font-bold">Creator</div><div className="text-xs opacity-70">Earn per view</div>
              </button>
              <button onClick={()=>{setRole('business'); setStep(2)}} className={`p-6 rounded-2xl border text-left ${role==='business'?'bg-white text-black border-white':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <div className="font-bold">Business</div><div className="text-xs opacity-70">Run campaigns</div>
              </button>
            </div>
          </div>
        )}

        {step===2 && role==='creator' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Name</span><input value={displayName} onChange={e=>setDisplayName(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Alex Rivera" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Username @</span><input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''))} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="alex_clips" /></label>
            <p className="text-xs text-zinc-500">3-20 chars a-z 0-9 _</p>
            <div className="flex gap-3"><button onClick={()=>setStep(1)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={()=>setStep(3)} disabled={!displayName||!username||username.length<3} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">Next</button></div>
          </div>
        )}

        {step===2 && role==='business' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Business name *</span><input value={bizName} onChange={e=>setBizName(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Acme Co" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Website</span><input value={website} onChange={e=>setWebsite(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="https://acme.com" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Social link</span><input value={social} onChange={e=>setSocial(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="https://instagram.com/acme" /></label>
            <div className="flex gap-3"><button onClick={()=>setStep(1)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={()=>setStep(3)} disabled={!bizName} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">Next</button></div>
          </div>
        )}

        {step===3 && role==='creator' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Profile image</span><input type="file" accept="image/*" onChange={e=>onFile(e.target.files?.[0]||null)} className="mt-1 w-full text-sm" /></label>
            {preview && <img src={preview} alt="preview" className="w-20 h-20 rounded-full object-cover border border-white/10" />}
            <div className="flex gap-3"><button onClick={()=>setStep(2)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={()=>setStep(4)} className="flex-1 py-3 rounded-full bg-white text-black font-bold">Next</button></div>
          </div>
        )}

        {step===3 && role==='business' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Logo / Profile pic</span><input type="file" accept="image/*" onChange={e=>onFile(e.target.files?.[0]||null)} className="mt-1 w-full text-sm" /></label>
            {preview && <img src={preview} alt="preview" className="w-20 h-20 rounded-2xl object-cover border border-white/10" />}
            <div className="flex gap-3"><button onClick={()=>setStep(2)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={()=>setStep(4)} className="flex-1 py-3 rounded-full bg-white text-black font-bold">Next</button></div>
          </div>
        )}

        {step===4 && role==='creator' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Location</span><input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Dhaka, Bangladesh" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Language</span><select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="en">English</option><option className="bg-[#111] text-white" value="ar">Arabic</option><option className="bg-[#111] text-white" value="bn">Bengali</option><option className="bg-[#111] text-white" value="hi">Hindi</option></select></label>
            <div className="flex gap-3"><button onClick={()=>setStep(3)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={submit} disabled={loading} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving…':'Finish → Creator Dashboard'}</button></div>
          </div>
        )}

        {step===4 && role==='business' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Industry *</span><select value={industry} onChange={e=>setIndustry(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{INDUSTRIES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
            <label className="block"><span className="text-sm text-zinc-400">Country *</span><select value={country} onChange={e=>setCountry(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{COUNTRIES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
            <div className="flex gap-3"><button onClick={()=>setStep(3)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={()=>setStep(5)} disabled={!industry||!country} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">Next</button></div>
          </div>
        )}

        {step===5 && role==='business' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Estimated monthly spend *</span><select value={range} onChange={e=>setRange(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="">Select</option>{RANGES.map(v=><option key={v} value={v} className="bg-[#111] text-white">{v}</option>)}</select></label>
            <label className="block"><span className="text-sm text-zinc-400">Language</span><select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="en">English</option><option className="bg-[#111] text-white" value="ar">Arabic</option><option className="bg-[#111] text-white" value="bn">Bengali</option><option className="bg-[#111] text-white" value="hi">Hindi</option></select></label>
            <div className="flex gap-3"><button onClick={()=>setStep(4)} className="px-6 py-3 rounded-full border border-white/10">Back</button><button onClick={submit} disabled={!range||loading} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving…':'Finish → Business Dashboard'}</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
