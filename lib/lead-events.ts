import type { ServiceId } from "@/data/services";

/** Событие «открыть форму заявки с выбранной услугой» — связывает карточки услуг и форму. */
export const SERVICE_SELECT_EVENT = "lead:service";

export type ServiceSelectDetail = { service: ServiceId };

export function selectService(service: ServiceId) {
  window.dispatchEvent(new CustomEvent<ServiceSelectDetail>(SERVICE_SELECT_EVENT, { detail: { service } }));
}
