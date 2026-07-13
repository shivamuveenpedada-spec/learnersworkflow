"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const inputClass =
  "h-12 rounded-2xl border-2 border-[var(--color-ink)]/10 bg-white px-4 text-base outline-none focus:border-[var(--color-math)]";

export function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Sign-up isn't set up on this deployment yet — check back soon!");
      return;
    }

    setSubmitting(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName, dob } },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      // Email confirmation is required before a session exists.
      setCheckEmail(true);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  if (checkEmail) {
    return (
      <Card className="flex flex-col items-center gap-3 text-center">
        <span className="text-4xl">📬</span>
        <p className="font-semibold text-[var(--color-ink)]">
          Almost there! Check {email} for a confirmation link, then come back and log in.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            className={inputClass}
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className={inputClass}
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <input
          className={inputClass}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-ink-soft)]">
          Date of birth
          <input
            className={inputClass}
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        {error && <p className="text-sm font-semibold text-[var(--color-english)]">{error}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create free account"}
        </Button>
      </form>
    </Card>
  );
}
