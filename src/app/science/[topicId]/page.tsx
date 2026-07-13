import Link from "next/link";
import { notFound } from "next/navigation";
import { getScienceTopicById, scienceTopics } from "@/content";
import { TopicExplorer } from "@/components/science/TopicExplorer";

export function generateStaticParams() {
  return scienceTopics.map((topic) => ({ topicId: topic.id }));
}

export default async function ScienceTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getScienceTopicById(topicId);
  if (!topic) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <Link href="/science" className="self-start text-[var(--color-ink-soft)] hover:underline">
        ← All topics
      </Link>
      <h1 className="text-center font-display text-2xl font-extrabold text-[var(--color-ink)]">
        {topic.title}
      </h1>
      <TopicExplorer topic={topic} />
    </main>
  );
}
