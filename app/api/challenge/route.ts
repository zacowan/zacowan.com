import { CHALLENGE_SOLUTION } from "@/lib/constants";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const answer = request.nextUrl.searchParams.get("answer");
  const sanitizedAnswer = answer
    ?.trim()
    .replace(/['’]/g, "'")
    .replace(/["“”]/g, '"')
    .replace(/[-–—]/g, "-");

  if (sanitizedAnswer === CHALLENGE_SOLUTION) {
    return new Response("https://youtu.be/oHg5SJYRHA0?si=fQZaS-PsW4geFmOd", {
      status: 200,
    });
  } else {
    return new Response("Your solution is incorrect. Please try again.", {
      status: 400,
    });
  }
}
