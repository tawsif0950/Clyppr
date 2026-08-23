import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
export default async function DashIndex() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const supa = await createClient();
  const { data } = await supa.from('profiles').select('role,onboarding_completed').eq('clerk_id', userId).single();
  if (!data?.onboarding_completed) redirect('/onboarding');
  redirect(data.role === 'business' ? '/dashboard/business' : '/dashboard/creator');
}
