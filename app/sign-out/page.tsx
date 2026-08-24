'use client';
import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';
export default function SignOut(){ const { signOut } = useClerk(); useEffect(()=>{ signOut(()=>{ window.location.href='/'; }); },[signOut]); return <div className="min-h-screen bg-[#050505] text-white grid place-items-center">Signing out...</div>; }
