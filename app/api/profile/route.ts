import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const supa = await createClient();
  const { data } = await supa.from('profiles').select('*').eq('clerk_id', userId).single();
  return Response.json(data || null);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const supa = await createClient();
  const payload: Record<string, unknown> = { clerk_id: userId, ...body, updated_at: new Date().toISOString() };
  // validate username format if present
  if (payload.username) {
    const u = String(payload.username).toLowerCase().replace(/^@/, '').trim();
    if (!/^[a-z0-9_]{3,20}$/.test(u)) return Response.json({ error: 'Username must be 3-20 chars a-z 0-9 _' }, { status: 400 });
    payload.username = u;
  }
  const { data, error } = await supa.from('profiles').upsert(payload, { onConflict: 'clerk_id' }).select().single();
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json(data);
}
