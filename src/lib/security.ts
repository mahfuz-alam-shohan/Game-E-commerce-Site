// src/lib/security.ts

const encoder = new TextEncoder();

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(plain: string): Promise<string> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = toHex(saltBytes);
  const data = encoder.encode(`${saltHex}:${plain}`);
  const hashBuf = await crypto.subtle.digest("SHA-256", data);
  const hashHex = toHex(new Uint8Array(hashBuf));
  // format: salt$hash
  return `${saltHex}$${hashHex}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 2) return false;
  const [saltHex, storedHash] = parts;
  if (!saltHex || !storedHash) return false;

  const data = encoder.encode(`${saltHex}:${plain}`);
  const hashBuf = await crypto.subtle.digest("SHA-256", data);
  const hashHex = toHex(new Uint8Array(hashBuf));

  return hashHex === storedHash;
}
