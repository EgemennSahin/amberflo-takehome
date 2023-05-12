import Meter from "@/component/Meter";
import SubmitButton from "@/component/SubmitButton";
import Link from "next/link";

export default async function MeterPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  return (
    <main>
      <Link href="/">Back</Link>
      <h1>Meter {id}</h1>
      <Meter id={id} />
      <SubmitButton />
    </main>
  );
}
