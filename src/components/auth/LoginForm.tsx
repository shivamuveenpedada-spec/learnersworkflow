"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const inputClass =
  "h-12 rounded-2xl border-2 border-[var(--color-ink)]/10 bg-white px-4 text-base outline-none focus:border-[var(--color-math)]";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Login isn't set up on this deployment yet — check back soon!");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(searchParams.get("next") || "/account");
    router.refresh();
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className={inputClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm font-semibold text-[var(--color-english)]">{error}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Card>
  );
}
