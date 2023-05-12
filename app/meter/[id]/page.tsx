"use client";

import Meter from "@/component/Meter";
import { Button } from "@mui/material";
import Link from "next/link";

export default function MeterPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main>
      <Link href="/">Back</Link>
      <h1>Meter {id}</h1>
      <Meter id={id} />
    </main>
  );
}
