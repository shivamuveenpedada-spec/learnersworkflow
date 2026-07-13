import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-center font-display text-3xl font-extrabold text-[var(--color-ink)]">
        Welcome back!
      </h1>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="text-center text-sm text-[var(--color-ink-soft)]">
        New here?{" "}
        <Link href="/register" className="font-semibold underline underline-offset-4">
          Create a free account
        </Link>
      </p>
    </main>
  );
}
