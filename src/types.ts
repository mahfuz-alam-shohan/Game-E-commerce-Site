// src/types.ts

export type UserRole = "super_admin" | "admin" | "staff" | "customer";

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
}
