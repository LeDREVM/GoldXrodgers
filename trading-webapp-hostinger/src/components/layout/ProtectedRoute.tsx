// Protected route component
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthed(!!data.session);
      setLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!mounted) return;
      setAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="cardBody">Loading…</div>
        </div>
      </div>
    );
  }

  if (!authed) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
