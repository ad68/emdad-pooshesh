export interface ContactPayload {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  /** `true` only when a real backend accepted the message. */
  delivered: boolean;
}

/**
 * ---------------------------------------------------------------
 *  BACKEND HOOK
 *  This template has no server. Connect your API / form service here
 *  (fetch, axios, Formspree, a Telegram bot, ...) and return
 *  { delivered: true } once the message has really been accepted.
 *  While it returns { delivered: false } the UI tells visitors honestly
 *  that nothing was sent and points them to the phone line.
 * ---------------------------------------------------------------
 */
export async function submitContactForm(_payload: ContactPayload): Promise<ContactResult> {
  return { delivered: false };
}
