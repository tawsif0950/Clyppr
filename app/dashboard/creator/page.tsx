import { auth, currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CreatorDash() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await currentUser();
  const supa = await createClient();
  const { data } = await supa.from('profiles').select('*').eq('clerk_id', userId).single();
  if (!data) redirect('/onboarding');
  if (!data.onboarding_completed) redirect('/onboarding');
  if (data.role !== 'creator') redirect('/dashboard/business');
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 flex flex-col">
      <header className="bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2"><span className="font-black text-2xl tracking-tight">Clyppr</span><span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full">BETA</span></div>
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 grid place-items-center">bell</span>
          <span className="w-8 h-8 grid place-items-center">discord</span>
          <span className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden grid place-items-center">{data.avatar_url ? <img src={data.avatar_url} alt="a" className="w-full h-full object-cover" /> : 'o'}</span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 pb-28">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black">My stats</h1>
            <p className="text-zinc-500">Post clips and watch your stats grow</p>
          </div>
          <Link href="/dashboard/creator/clips/new" className="px-5 py-2 bg-white border border-black/10 rounded-full font-bold">Add +</Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded-[1.75rem] p-6 border border-black/5 flex justify-between"><span className="font-medium">Profiles</span><span className="font-black text-2xl">0</span></div>
          <div className="bg-white rounded-[1.75rem] p-6 border border-black/5 flex justify-between"><span className="font-medium">Posts</span><span className="font-black text-2xl">0</span></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-[1.75rem] p-6 border border-black/5 text-center"><div className="font-medium">Followers</div><div className="font-black text-2xl mt-6">0</div></div>
          <div className="bg-white rounded-[1.75rem] p-6 border border-black/5 text-center"><div className="font-medium">Views</div><div className="font-black text-2xl mt-6">0</div></div>
          <div className="bg-white rounded-[1.75rem] p-6 border border-black/5 text-center"><div className="font-medium">Avg views</div><div className="font-black text-2xl mt-6">0</div></div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-black">Top clips</h2>
          <p className="text-zinc-500">Your most viewed Clyppr clips</p>
          <div className="mt-4 bg-white rounded-[1.75rem] p-10 border border-black/5 grid place-items-center">
            <Link href="/dashboard/creator/clips/new" className="flex flex-col items-center font-bold">+<span>Add</span></Link>
          </div>
        </div>

        <details className="mt-10 bg-white rounded-[1.5rem] p-6 border border-black/5">
          <summary className="list-none font-medium cursor-pointer">Profile menu (structure)</summary>
          <div className="mt-4">
            <p className="font-bold">{user?.fullName || data.display_name}</p>
            <p className="text-sm text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <Link href="/dashboard/creator/settings" className="mt-4 block text-center py-3 bg-zinc-100 rounded-full font-bold">Settings</Link>
          <div className="mt-3 flex justify-between font-bold"><span>Give feedback</span><span>-&gt;</span></div>
          <div className="mt-3 flex justify-between font-bold"><span>Help center</span><span>-&gt;</span></div>
          <a href="/sign-out" className="mt-3 block font-bold">Log out</a>
          <div className="mt-4 pt-3 border-t text-xs text-zinc-400 flex gap-3"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Clipper Terms</a></div>
        </details>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl border border-black/5 flex items-center p-2">
        <span className="px-5 py-3 rounded-full bg-zinc-100 font-bold text-sm">Home</span>
        <Link href="/discover" className="px-5 py-3 text-sm text-zinc-500">Discover</Link>
        <Link href="/dashboard/creator/clips/new" className="px-5 py-3 text-sm text-zinc-500">Add Clips</Link>
        <Link href="/dashboard/creator/earnings" className="px-5 py-3 text-sm text-zinc-500">Earnings</Link>
      </nav>
    </div>
  );
}
