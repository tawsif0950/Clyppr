import { auth, currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function BusinessDash() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await currentUser();
  const supa = await createClient();
  const { data } = await supa.from('profiles').select('*').eq('clerk_id', userId).single();
  if (!data) redirect('/onboarding');
  if (!data.onboarding_completed) redirect('/onboarding');
  if (data.role !== 'business') redirect('/dashboard/creator');
  const team = data.business_name || data.display_name || 'Team';
  const logo = 'https://www.pixelhost.fun/uploads/2026/08/image-1787425436512-b8bfyt.png';
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 flex flex-col">
      <header className="bg-[#0A0A0A] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Clyppr" className="w-7 h-7 mix-blend-screen" />
          <span className="font-black text-xl tracking-tight text-white">Clyppr</span>
          <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-full">BETA</span>
        </div>
        <Link href="/dashboard/business?menu=profile" className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/10 grid place-items-center overflow-hidden">
          {data.avatar_url ? <img src={data.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-zinc-400">o</span>}
        </Link>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 pb-28">
        <h1 className="text-4xl font-bold text-center leading-tight text-white">Welcome to the<br />{team} team</h1>
        <p className="text-center text-zinc-400 mt-3">Stay up to date with your campaigns here.</p>

        <div className="mt-10 space-y-4">
          <Link href="/dashboard/business/campaigns/new" className="flex items-center gap-4 bg-[#111] rounded-[1.75rem] p-6 border border-white/10 hover:bg-white/5 transition-colors">
            <span className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 grid place-items-center text-2xl text-white">+</span>
            <span><span className="font-bold text-lg block text-white">Run a campaign</span><span className="text-sm text-zinc-400">Set up and launch a new campaign.</span></span>
          </Link>
          <Link href="/dashboard/business/reports" className="flex items-center gap-4 bg-[#111] rounded-[1.75rem] p-6 border border-white/10 opacity-60">
            <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white">▥</span>
            <span><span className="font-bold text-lg block text-white">Reporting</span><span className="text-sm text-zinc-400">Check campaign performance.</span></span>
          </Link>
        </div>

        <details className="mt-10 bg-[#111] rounded-[1.5rem] p-6 border border-white/10">
          <summary className="list-none flex items-center justify-between cursor-pointer">
            <span className="font-medium text-white">Profile menu</span><span className="text-xs bg-white text-black px-2 py-1 rounded-full font-bold">BRAND</span>
          </summary>
          <div className="mt-4 flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="w-10 h-10 rounded-full bg-white/10 grid place-items-center">o</span>
            <span><span className="font-bold block text-white">{team}</span><span className="text-sm text-zinc-400">Team workspace</span></span>
          </div>
          <div className="mt-4">
            <p className="font-bold text-white">{user?.fullName || data.display_name}</p>
            <p className="text-sm text-zinc-400">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="mt-4 space-y-3">
            <Link href="/dashboard/business/settings" className="block text-center py-3 bg-white text-black rounded-full font-bold">Settings</Link>
            <a href="#" className="flex justify-between font-bold text-white">Support <span>-&gt;</span></a>
            <a href="/sign-out" className="font-bold text-white">Log out</a>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-zinc-400 flex gap-3"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </details>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111] rounded-full shadow-xl border border-white/10 flex items-center p-2">
        <span className="px-6 py-3 rounded-full bg-white text-black font-bold flex flex-col items-center text-sm">Home</span>
        <Link href="/dashboard/business/campaigns" className="px-6 py-3 font-medium text-zinc-400 text-sm">Campaigns</Link>
        <Link href="/dashboard/business/reports" className="px-6 py-3 font-medium text-zinc-400 text-sm">Reports</Link>
      </nav>
    </div>
  );
}
