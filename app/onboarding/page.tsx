'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const r = useRouter();
  const [role, setRole] = useState<'creator'|'business'|null>(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [bizName, setBizName] = useState('');
  const [step, setStep] = useState(1);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { r.replace('/sign-in'); return; }
    // if already onboarded, redirect to dash
    fetch('/api/profile').then(v=>v.json()).then(p=>{
      if (p?.onboarding_completed) r.replace(p.role==='business'?'/dashboard/business':'/dashboard/creator');
      else if (p?.username) setUsername(p.username);
    });
    if (user.fullName) setDisplayName(user.fullName);
  }, [isLoaded, user, r]);

  async function submit() {
    setErr(''); setLoading(true);
    const payload: Record<string,string|boolean> = { role: role!, location, language, onboarding_completed: true };
    if (role==='creator') { payload.username = username.replace(/^@/,'').toLowerCase(); payload.display_name = displayName; }
    else { payload.business_name = bizName; payload.display_name = bizName; }
    const res = await fetch('/api/profile', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const j = await res.json();
    setLoading(false);
    if (!res.ok) { setErr(j.error||'Failed'); return; }
    r.push(role==='business'?'/dashboard/business':'/dashboard/creator');
  }

  if (!isLoaded) return <div className="min-h-screen bg-[#050505] text-white grid place-items-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-[2rem] p-8">
        <p className="text-sm text-zinc-500 mb-2">Step {step} / {role==='creator'?3:2}</p>
        <h1 className="text-3xl font-bold mb-2">Welcome to Clyppr</h1>
        <p className="text-zinc-400 mb-8">Choose how you want to use Clyppr</p>
        {err && <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm">{err}</div>}

        {step===1 && (
          <div className="grid grid-cols-2 gap-4">
            <button onClick={()=>{setRole('creator'); setStep(2)}} className={`p-6 rounded-2xl border text-left ${role==='creator'?'bg-white text-black border-white':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <div className="font-bold text-lg">Creator</div><div className="text-sm opacity-70">Cut clips & earn per view</div>
            </button>
            <button onClick={()=>{setRole('business'); setStep(2)}} className={`p-6 rounded-2xl border text-left ${role==='business'?'bg-white text-black border-white':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <div className="font-bold text-lg">Business</div><div className="text-sm opacity-70">Run campaigns & buy reach</div>
            </button>
          </div>
        )}

        {step===2 && role==='creator' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Display name</span><input value={displayName} onChange={e=>setDisplayName(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Alex Rivera" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Username @</span><input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="alex_clips" /></label>
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setStep(1)} className="px-6 py-3 rounded-full border border-white/10">Back</button>
              <button onClick={()=>setStep(3)} disabled={!displayName || !username} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">Next</button>
            </div>
          </div>
        )}

        {step===2 && role==='business' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Business name</span><input value={bizName} onChange={e=>setBizName(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Acme Co" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Location</span><input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Dubai, UAE" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Language</span><select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"><option value="en">English</option><option value="ar">Arabic</option><option value="bn">Bengali</option><option value="hi">Hindi</option></select></label>
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setStep(1)} className="px-6 py-3 rounded-full border border-white/10">Back</button>
              <button onClick={submit} disabled={!bizName || loading} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving…':'Finish → Business Dashboard'}</button>
            </div>
          </div>
        )}

        {step===3 && role==='creator' && (
          <div className="space-y-4">
            <label className="block"><span className="text-sm text-zinc-400">Location</span><input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3" placeholder="Dhaka, Bangladesh" /></label>
            <label className="block"><span className="text-sm text-zinc-400">Language</span><select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"><option value="en">English</option><option value="ar">Arabic</option><option value="bn">Bengali</option><option value="hi">Hindi</option></select></label>
            <p className="text-xs text-zinc-500">Profile image can be added later in dashboard — we use your Clerk avatar for now.</p>
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setStep(2)} className="px-6 py-3 rounded-full border border-white/10">Back</button>
              <button onClick={submit} disabled={loading} className="flex-1 py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving…':'Finish → Creator Dashboard'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
