import { redirect } from "next/navigation";
import { getCurrentParent, getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ChildProfileManager, type ChildProfile } from "@/components/auth/ChildProfileManager";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card } from "@/components/ui/Card";

export default async function AccountPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-16">
        <Card className="text-center">
          <p className="font-semibold text-[var(--color-ink)]">
            Accounts aren&apos;t set up on this deployment yet — check back soon!
          </p>
        </Card>
      </main>
    );
  }

  const user = await getCurrentParent();
  if (!user) redirect("/login");

  const supabase = await getSupabaseServerClient();
  const { data: profiles } = await supabase!
    .from("child_profiles")
    .select("id, display_name, birth_year")
    .order("created_at", { ascending: true });

  const firstName = (user.user_metadata?.first_name as string) || user.email;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-[var(--color-ink)]">
          Hi, {firstName}!
        </h1>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold text-[var(--color-ink)]">
          Child profiles
        </h2>
        <ChildProfileManager initialProfiles={(profiles as ChildProfile[]) ?? []} />
      </div>
    </main>
  );
}
