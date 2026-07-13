"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DifficultyTier } from "@/content";
import { tierLabels } from "@/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface ChildProfile {
  id: string;
  display_name: string;
  birth_year: number | null;
}

// Age group is what parents pick; birth_year is what the schema stores. This midpoint
// mapping is an approximation used only to bucket content difficulty, not an exact DOB.
const AGE_GROUP_MIDPOINT_AGE: Record<DifficultyTier, number> = {
  preschool: 4,
  earlyElementary: 6,
  elementary: 8,
};

const currentYear = new Date().getFullYear();

function tierFromBirthYear(birthYear: number | null): DifficultyTier {
  if (!birthYear) return "preschool";
  const age = currentYear - birthYear;
  if (age <= 5) return "preschool";
  if (age <= 7) return "earlyElementary";
  return "elementary";
}

export function ChildProfileManager({ initialProfiles }: { initialProfiles: ChildProfile[] }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(initialProfiles);
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState<DifficultyTier>("preschool");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const atLimit = profiles.length >= 3;

  async function addProfile(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error: insertError } = await supabase
      .from("child_profiles")
      .insert({
        parent_id: user?.id,
        display_name: name,
        birth_year: currentYear - AGE_GROUP_MIDPOINT_AGE[ageGroup],
      })
      .select()
      .single();
    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setProfiles((prev) => [...prev, data as ChildProfile]);
    setName("");
    router.refresh();
  }

  async function removeProfile(id: string) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("child_profiles").delete().eq("id", id);
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {profiles.map((profile) => (
          <Card key={profile.id} className="flex flex-col items-center gap-2">
            <span className="text-4xl">🧒</span>
            <span className="font-display font-bold text-[var(--color-ink)]">
              {profile.display_name}
            </span>
            <Badge colorVar="--color-math">{tierLabels[tierFromBirthYear(profile.birth_year)]}</Badge>
            <button
              type="button"
              onClick={() => removeProfile(profile.id)}
              className="text-xs font-semibold text-[var(--color-english)] underline underline-offset-4"
            >
              Remove
            </button>
          </Card>
        ))}
      </div>

      {atLimit ? (
        <p className="text-center text-sm text-[var(--color-ink-soft)]">
          You&apos;ve reached the limit of 3 child profiles per account.
        </p>
      ) : (
        <Card>
          <form onSubmit={addProfile} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-[var(--color-ink-soft)]">
              Child&apos;s name
              <input
                className="h-12 rounded-2xl border-2 border-[var(--color-ink)]/10 px-4 text-base outline-none focus:border-[var(--color-math)]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--color-ink-soft)]">
              Age group
              <select
                className="h-12 rounded-2xl border-2 border-[var(--color-ink)]/10 px-4 text-base outline-none focus:border-[var(--color-math)]"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as DifficultyTier)}
              >
                {(Object.keys(tierLabels) as DifficultyTier[]).map((tier) => (
                  <option key={tier} value={tier}>
                    {tierLabels[tier]}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" disabled={submitting}>
              Add profile
            </Button>
          </form>
          {error && <p className="mt-2 text-sm font-semibold text-[var(--color-english)]">{error}</p>}
        </Card>
      )}
    </div>
  );
}
