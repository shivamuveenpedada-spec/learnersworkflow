import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)]">
          Create your free account
        </h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          For parents/guardians — you can add up to 3 child profiles after signing up.
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-[var(--color-ink-soft)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold underline underline-offset-4">
          Log in
        </Link>
      </p>
    </main>
  );
}
