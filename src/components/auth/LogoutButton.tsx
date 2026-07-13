"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        const supabase = getSupabaseBrowserClient();
        await supabase?.auth.signOut();
        router.push("/");
        router.refresh();
      }}
    >
      Log out
    </Button>
  );
}
