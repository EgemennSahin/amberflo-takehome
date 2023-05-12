import { MeterType } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(request: Request) {
  // Get the meter from the request body
  const meter = (await request.json()) as MeterType;

  const { api_name, display_name, active, used_for_billing, type } = meter;
  if (!meter) {
    return NextResponse.error();
  }

  const res = await fetch(
    "https://take-home-exercise-api.herokuapp.com/meters",
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.AMBERFLO_API_KEY!,
      },
      method: "POST",
      body: JSON.stringify({
        api_name,
        display_name,
        active,
        used_for_billing,
        type,
      }),
    }
  );

  const data = await res.json();

  return NextResponse.json({ data });
}
