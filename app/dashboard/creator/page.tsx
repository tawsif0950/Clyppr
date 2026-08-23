import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CreatorDash() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const supa = await createClient();
  const { data } = await supa.from('profiles').select('*').eq('clerk_id', userId).single();
  if (!data?.onboarding_completed) redirect('/onboarding');
  if (data.role !== 'creator') redirect('/dashboard/business');
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <p className="text-zinc-400">@{data.username} · {data.display_name} · {data.location} · {data.language}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">Available campaigns → pick & clip</div>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">Your clips · earnings · USDC/USDT</div>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">Profile settings</div>
        </div>
      </div>
    </div>
  );
}
