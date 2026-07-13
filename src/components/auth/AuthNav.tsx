"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthNav() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoggedIn(false);
      return;
    }
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loggedIn === null) return null;

  return (
    <nav className="flex items-center gap-3 text-sm font-semibold">
      {loggedIn ? (
        <Link href="/account" className="text-[var(--color-ink)] underline underline-offset-4">
          My account
        </Link>
      ) : (
        <>
          <Link href="/login" className="text-[var(--color-ink)] underline underline-offset-4">
            Log in
          </Link>
          <Link href="/register" className="text-[var(--color-ink)] underline underline-offset-4">
            Sign up free
          </Link>
        </>
      )}
    </nav>
  );
}
