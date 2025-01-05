import { CHALLENGE_SOLUTION } from "@/lib/constants";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const answer = request.nextUrl.searchParams.get("answer");
  if (answer === CHALLENGE_SOLUTION) {
    return new Response(
      "Correct! For your next step, see https://youtu.be/oHg5SJYRHA0?si=fQZaS-PsW4geFmOd.",
      {
        status: 200,
      },
    );
  } else {
    return new Response("Incorrect", { status: 400 });
  }
}
