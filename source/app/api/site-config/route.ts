import { DEFAULT_CONFIG } from '@/lib/company';
export async function GET(){return Response.json(DEFAULT_CONFIG,{headers:{'Cache-Control':'no-store'}})}
