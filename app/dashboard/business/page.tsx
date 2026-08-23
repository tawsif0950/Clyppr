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
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 flex flex-col">
      {/* Header - structure: left logo, right avatar */}
      <header className="bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-black text-2xl tracking-tight">Clyppr</span>
          <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full">BETA</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/business?menu=profile" className="w-10 h-10 rounded-2xl bg-zinc-200 grid place-items-center overflow-hidden">
            {data.avatar_url ? <img src={data.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-zinc-400">o</span>}
          </Link>
        </div>
      </header>

      {/* Main - structure: Welcome + 2 cards + bottom nav */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 pb-28">
        <h1 className="text-4xl font-black text-center leading-tight">Welcome to the<br />{team} team</h1>
        <p className="text-center text-zinc-500 mt-3">Stay up to date with your campaigns here.</p>

        <div className="mt-10 space-y-4">
          <Link href="/dashboard/business/campaigns/new" className="flex items-center gap-4 bg-white rounded-[1.75rem] p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <span className="w-14 h-14 rounded-2xl bg-zinc-100 grid place-items-center text-2xl">+</span>
            <span><span className="font-bold text-lg block">Run a campaign</span><span className="text-sm text-zinc-500">Set up and launch a new campaign.</span></span>
          </Link>
          <Link href="/dashboard/business/reports" className="flex items-center gap-4 bg-white rounded-[1.75rem] p-6 border border-black/5 shadow-sm opacity-60">
            <span className="w-14 h-14 rounded-2xl bg-zinc-100 grid place-items-center">▥</span>
            <span><span className="font-bold text-lg block">Reporting</span><span className="text-sm text-zinc-500">Check campaign performance.</span></span>
          </Link>
        </div>

        {/* Profile menu preview - structure matches image 2 */}
        <details className="mt-10 bg-white rounded-[1.5rem] p-6 border border-black/5">
          <summary className="list-none flex items-center justify-between cursor-pointer">
            <span className="font-medium">Profile menu (structure)</span><span className="text-xs bg-sky-100 px-2 py-1 rounded-full font-bold">BRAND</span>
          </summary>
          <div className="mt-4 flex items-center gap-3 p-3 bg-zinc-100 rounded-2xl">
            <span className="w-10 h-10 rounded-full bg-white grid place-items-center">o</span>
            <span><span className="font-bold block">{team}</span><span className="text-sm text-zinc-500">Team workspace</span></span>
          </div>
          <div className="mt-4">
            <p className="font-bold">{user?.fullName || data.display_name}</p>
            <p className="text-sm text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="mt-4 space-y-3">
            <Link href="/dashboard/business/settings" className="block text-center py-3 bg-zinc-100 rounded-full font-bold">Settings</Link>
            <a href="#" className="flex justify-between font-bold">Support <span>-&gt;</span></a>
            <a href="/sign-out" className="font-bold">Log out</a>
          </div>
          <div className="mt-4 pt-3 border-t text-xs text-zinc-400 flex gap-3"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </details>
      </main>

      {/* Bottom nav - structure: Home active, Campaigns, Reports */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl border border-black/5 flex items-center p-2">
        <span className="px-6 py-3 rounded-full bg-zinc-100 font-bold flex flex-col items-center text-sm">Home</span>
        <Link href="/dashboard/business/campaigns" className="px-6 py-3 font-medium text-zinc-500 text-sm">Campaigns</Link>
        <Link href="/dashboard/business/reports" className="px-6 py-3 font-medium text-zinc-500 text-sm">Reports</Link>
      </nav>
    </div>
  );
}
