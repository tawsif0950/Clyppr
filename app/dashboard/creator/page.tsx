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
  const logo = 'https://www.pixelhost.fun/uploads/2026/08/image-1787425436512-b8bfyt.png';
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 flex flex-col">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
        <div className="flex items-center justify-between p-1.5 bg-[#111111]/80 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <Link href="/dashboard/creator" className="flex items-center gap-3 pl-4">
            <img src={logo} alt="Clyppr" className="w-7 h-7 mix-blend-screen" />
            <span className="font-bold text-white">Clyppr</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-zinc-500 text-sm">bell</span>
            <span className="hidden sm:block text-zinc-500 text-sm">discord</span>
            <Link href="/dashboard/creator/settings" className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden grid place-items-center">
              {data.avatar_url ? <img src={data.avatar_url} alt="a" className="w-full h-full object-cover" /> : <span className="text-zinc-400">o</span>}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-28 pb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My stats</h1>
            <p className="text-zinc-400">Post clips and watch your stats grow</p>
          </div>
          <Link href="/dashboard/creator/clips/new" className="px-5 py-2 bg-white text-black rounded-full font-bold">Add +</Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-[#111] rounded-[1.75rem] p-6 border border-white/10 flex justify-between"><span className="font-medium text-zinc-400">Profiles</span><span className="font-bold text-2xl text-white">0</span></div>
          <div className="bg-[#111] rounded-[1.75rem] p-6 border border-white/10 flex justify-between"><span className="font-medium text-zinc-400">Posts</span><span className="font-bold text-2xl text-white">0</span></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-[#111] rounded-[1.75rem] p-6 border border-white/10 text-center"><div className="font-medium text-zinc-400">Followers</div><div className="font-bold text-2xl mt-6 text-white">0</div></div>
          <div className="bg-[#111] rounded-[1.75rem] p-6 border border-white/10 text-center"><div className="font-medium text-zinc-400">Views</div><div className="font-bold text-2xl mt-6 text-white">0</div></div>
          <div className="bg-[#111] rounded-[1.75rem] p-6 border border-white/10 text-center"><div className="font-medium text-zinc-400">Avg views</div><div className="font-bold text-2xl mt-6 text-white">0</div></div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white">Top clips</h2>
          <p className="text-zinc-400">Your most viewed Clyppr clips</p>
          <div className="mt-4 bg-[#111] rounded-[1.75rem] p-10 border border-white/10 grid place-items-center">
            <Link href="/dashboard/creator/clips/new" className="flex flex-col items-center font-bold text-white">+<span>Add</span></Link>
          </div>
        </div>

        <div className="mt-10 bg-[#111] rounded-[1.5rem] p-6 border border-white/10">
          <p className="font-bold text-white">{user?.fullName || data.display_name}</p>
          <p className="text-sm text-zinc-400">{user?.primaryEmailAddress?.emailAddress}</p>
          <Link href="/dashboard/creator/settings" className="mt-4 block text-center py-3 bg-white text-black rounded-full font-bold">Settings / Edit profile</Link>
          <div className="mt-3 flex justify-between font-bold text-white"><span>Give feedback</span><span>-&gt;</span></div>
          <div className="mt-3 flex justify-between font-bold text-white"><span>Help center</span><span>-&gt;</span></div>
          <a href="/sign-out" className="mt-3 block font-bold text-white">Log out</a>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-zinc-400 flex gap-3"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Clipper Terms</a></div>
        </div>
      </main>
    </div>
  );
}
