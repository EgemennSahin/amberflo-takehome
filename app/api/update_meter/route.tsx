import { MeterType } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: Request) {
  // Get the meter from the request body
  const meter = (await request.json()) as MeterType;

  const { id, api_name, display_name, active, used_for_billing, type } = meter;
  if (!meter) {
    return NextResponse.error();
  }

  console.log("meter:", meter);
  const res = await fetch(
    `https://take-home-exercise-api.herokuapp.com/meters/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.AMBERFLO_API_KEY!,
      },
      method: "PUT",
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

  console.log("Data: ", data);

  return NextResponse.json({ data });
}
