import type { ProjectTypeId } from "@/data/pricing";

/** Событие «открыть квиз с предвыбранным типом проекта» — связывает карточки услуг и квиз. */
export const QUIZ_SELECT_EVENT = "quiz:select";

export type QuizSelectDetail = { type: ProjectTypeId };

export function selectQuizType(type: ProjectTypeId) {
  window.dispatchEvent(new CustomEvent<QuizSelectDetail>(QUIZ_SELECT_EVENT, { detail: { type } }));
}
