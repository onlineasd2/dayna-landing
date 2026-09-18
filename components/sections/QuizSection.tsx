import { Quiz } from "@/components/quiz/Quiz";
import { Section, SectionHeading } from "@/components/ui/Section";
import { quizSection } from "@/data/quiz";

export function QuizSection() {
  return (
    <Section id="quiz" labelledBy="quiz-title" className="overflow-x-clip">
      <div
        className="glow pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-50"
        aria-hidden="true"
      />
      <SectionHeading
        id="quiz-title"
        eyebrow={quizSection.eyebrow}
        title={quizSection.title}
        subtitle={quizSection.subtitle}
      />
      <Quiz />
    </Section>
  );
}
