import type { LeadData } from './lead-schema';
export function leadFingerprint(data:LeadData){return JSON.stringify([data.name,data.contact,data.channel,data.service,data.details,data.consentVersion]);}
