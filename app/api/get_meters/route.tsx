import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const res = await fetch(
    "https://take-home-exercise-api.herokuapp.com/meters",
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.AMBERFLO_API_KEY!,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json({ data });
}
