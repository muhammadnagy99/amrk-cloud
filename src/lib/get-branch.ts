// src/lib/server-cookies.ts

import { cookies } from 'next/headers';

export async function getBranchIdFromCookies(): Promise<string> {
  const cookieStore = cookies();
  const brnid = (await cookieStore).get('brnid')?.value;
  return brnid || '9ObrplPiR3MyQq1Kiwdm';
}
