'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';

export default function CreatorSettings() {
  const { user, isLoaded } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [file, setFile] = useState<File|null>(null);
  const [preview, setPreview] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/profile').then(r=>r.json()).then(p=>{
      if (p) { setDisplayName(p.display_name||''); setUsername(p.username||''); setLocation(p.location||''); setLanguage(p.language||'en'); if (p.avatar_url) setPreview(p.avatar_url); }
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
    if (!file && displayName) { try { await user?.update({ firstName: displayName }); } catch {} }
    const res = await fetch('/api/profile', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ display_name: displayName, username: username.replace(/^@/,'').toLowerCase(), location, language, avatar_url }) });
    const j = await res.json();
    setLoading(false);
    if (!res.ok) setMsg(j.error||'Failed'); else setMsg('Saved - Supabase + Clerk updated');
  }

  if (!isLoaded) return <div className="min-h-screen bg-[#050505] text-white grid place-items-center">Loading</div>;
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 p-6">
      <div className="max-w-lg mx-auto bg-[#111] border border-white/10 rounded-[1.5rem] p-8">
        <a href="/dashboard/creator" className="text-sm text-zinc-400">← Back to dashboard</a>
        <h1 className="text-2xl font-bold mt-2">Edit profile</h1>
        <p className="text-sm text-zinc-400 mb-6">Changes save to Supabase and Clerk</p>
        {msg && <div className="mb-4 text-sm p-3 rounded-xl bg-white/5 border border-white/10">{msg}</div>}
        <div className="space-y-4">
          <label className="block"><span className="text-sm text-zinc-400">Display name</span><input value={displayName} onChange={e=>setDisplayName(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Username @</span><input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''))} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Avatar</span><input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]||null; setFile(f); if(f) setPreview(URL.createObjectURL(f)); }} className="mt-1 w-full text-sm" /></label>
          {preview && <img src={preview} alt="p" className="w-20 h-20 rounded-full object-cover border border-white/10" />}
          <label className="block"><span className="text-sm text-zinc-400">Location</span><input value={location} onChange={e=>setLocation(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white" /></label>
          <label className="block"><span className="text-sm text-zinc-400">Language</span><select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white"><option className="bg-[#111] text-white" value="en">English</option><option className="bg-[#111] text-white" value="ar">Arabic</option><option className="bg-[#111] text-white" value="bn">Bengali</option><option className="bg-[#111] text-white" value="hi">Hindi</option></select></label>
          <button onClick={save} disabled={loading} className="w-full py-3 rounded-full bg-white text-black font-bold disabled:opacity-40">{loading?'Saving...':'Save'}</button>
        </div>
      </div>
    </div>
  );
}
