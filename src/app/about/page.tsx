import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          About the founder
        </h1>
        <p className="text-[var(--color-ink-soft)]">
          The same teacher behind{" "}
          <a
            href="https://www.teachersworkflow.com"
            className="font-semibold underline underline-offset-4"
          >
            TeachersWorkflow
          </a>
          .
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <p>
          Hi, I&apos;m <strong>Shiva Muveen Pedada</strong> — an English
          Teacher and Academic Coordinator with{" "}
          <strong>14 years in education</strong>, currently teaching at
          Tondeesueksa School AMEC in Chiang Rai, Thailand.
        </p>
        <p>
          I built <strong>TeachersWorkflow</strong> to give back the hours
          teachers lose to paperwork. But every weekend I spent writing
          reports, I was also thinking about the other side of the
          classroom: the students. The worksheets I photocopied by hand,
          the phonics drills, the handwriting practice — the same
          repetitive prep, week after week.
        </p>
        <p>
          <strong>LearnersWorkflow</strong> is that other half. It&apos;s
          the ebooks, phonics, handwriting, math, and games I wished I
          could just hand a student directly — built with the same
          14 years of classroom experience that shaped TeachersWorkflow,
          just pointed at the learners instead of the lesson plans.
        </p>
        <p className="text-sm text-[var(--color-ink-soft)]">
          3× Award-Winning Teacher · Best Practice Award (Governor, 2026) ·
          ASEAN Presenter 2025
        </p>
      </Card>
    </main>
  );
}
