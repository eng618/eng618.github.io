'use client';

import { ADMIN_EMAIL, trackAdminEvent } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';

export type AdminAuthState = {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  email: string;
  login: (email: string) => Promise<{ ok: boolean; message: string }>;
  logout: () => Promise<void>;
};

export function useAdminAuth(): AdminAuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const hasTrackedDeniedRef = useRef(false);
  const hasTrackedSuccessRef = useRef(false);
  const loginAttemptsRef = useRef(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const email = session?.user?.email || '';
  const isAdmin = Boolean(session && email === ADMIN_EMAIL);

  useEffect(() => {
    if (!session) {
      return;
    }

    const domain = email.split('@')[1] || '';
    if (email === ADMIN_EMAIL) {
      if (!hasTrackedSuccessRef.current) {
        trackAdminEvent('Admin Auth Success', { email_domain: domain });
        hasTrackedSuccessRef.current = true;
      }
    } else if (!hasTrackedDeniedRef.current) {
      trackAdminEvent('Admin Access Denied', { attempted_email_domain: domain });
      hasTrackedDeniedRef.current = true;
    }
  }, [session, email]);

  const login = async (loginEmail: string) => {
    loginAttemptsRef.current += 1;
    if (loginAttemptsRef.current > 5) {
      trackAdminEvent('Admin Suspicious Activity', {
        attempts_count: loginAttemptsRef.current,
        anomaly_type: 'rate_limit_bypass_attempt',
      });
    }

    const domain = loginEmail.split('@')[1] || '';
    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail,
      options: {
        emailRedirectTo: window.location.origin + '/admin',
      },
    });

    if (error) {
      trackAdminEvent('Admin Auth Failed', {
        error_code: error.status || 'unknown',
        attempted_email_domain: domain,
      });
      return { ok: false, message: error.message };
    }

    trackAdminEvent('Admin Magic Link Requested', {
      attempted_email_domain: domain,
    });
    return { ok: true, message: 'Magic link sent! Check your email inbox.' };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    loading,
    isAdmin,
    email,
    login,
    logout,
  };
}
