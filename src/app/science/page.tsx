import { scienceTopics } from "@/content";
import { TopicCard } from "@/components/science/TopicCard";

export default function ScienceHubPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-ink)] sm:text-4xl">
          Science Explorers
        </h1>
        <p className="text-[var(--color-ink-soft)]">
          Discover fun facts about animals, weather, and space!
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {scienceTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </main>
  );
}
