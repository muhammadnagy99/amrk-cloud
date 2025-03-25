import Hashids from "hashids";

const secretSalt = process.env.HASHIDS_SECRET;

if (!secretSalt) {
  throw new Error("HASHIDS_SECRET is not defined in .env.local");
}

const hashids = new Hashids(secretSalt, 8); 

export function encodeProductId(id: string): string {
  return hashids.encode(id);
}

export function decodeProductId(encoded: string): string | null {
  const [decoded] = hashids.decode(encoded);
  return typeof decoded === "string" ? decoded : null;
}
