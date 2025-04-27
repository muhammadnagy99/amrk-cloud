import { cookies } from 'next/headers';

// Create a Record to map type numbers to cookie names
const BRANCH_COOKIE_NAME: Record<number, string> = {
  1: 'dine_brnid',
  2: 'brnid'
};

export async function getBranchIdFromCookies(type: number = 1): Promise<string> {
  const cookieStore = cookies();
  
  const cookieName = BRANCH_COOKIE_NAME[type] || BRANCH_COOKIE_NAME[1];
  
  const branchId = (await cookieStore).get(cookieName)?.value;
  
  const defaultId = '';
  
  return branchId || defaultId;
}

export async function getTableFromCookies(): Promise<string> {
  const cookieStore = cookies();
  
  const cookieName = 'tableId';
  
  const tableId = (await cookieStore).get(cookieName)?.value;
  
  const defaultId = '';
  
  return tableId || defaultId;
}