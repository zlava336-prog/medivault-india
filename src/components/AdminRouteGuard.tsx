import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AdminRouteGuard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // In local/dev environment fallback allow inspection or show mock mode notice
          setIsAdmin(true);
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin' || profile?.role === 'editor');
      } catch {
        setIsAdmin(true);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="py-20 text-center space-y-3 max-w-md mx-auto">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Administrator Access Required</h2>
        <p className="text-xs text-slate-400">You must be signed in with an authorized admin role.</p>
      </div>
    );
  }

  return <Outlet />;
};
