import "server-only";
// NOTE: if the first line of this file is changed, updates to `scripts/build-challenge-input.ts` are required
import { z } from "zod";

const DEFAULT_CHALLENGE_SOLUTION = `this-is-so-secret`;

const serverEnvironmentSchema = z.object({
  NODE_ENV: z.string().optional(),
  CHALLENGE_SOLUTION: z.string().min(1).optional(),
});
const safeServerEnv = serverEnvironmentSchema.parse(process.env);

export const CHALLENGE_SOLUTION =
  safeServerEnv.NODE_ENV === "production"
    ? (safeServerEnv.CHALLENGE_SOLUTION ?? DEFAULT_CHALLENGE_SOLUTION)
    : DEFAULT_CHALLENGE_SOLUTION;
