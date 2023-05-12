"use client";

import CreateMeter from "@/component/CreateMeter";
import Meter from "@/component/Meter";
import { Button } from "@mui/material";
import Link from "next/link";

export default function MeterPage() {
  return (
    <main>
      <Link href="/">Back</Link>
      <h1>Create meter</h1>
      <CreateMeter />
    </main>
  );
}
