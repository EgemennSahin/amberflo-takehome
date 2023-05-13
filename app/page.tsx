// Landing Page
// Display a sortable table of all available “meters” and their values (“display_name”,
// “api_name”, “active”, “used_for_billing” and “type”). Refer to the API documentation.
// below for more details on the object schema.

import MeterTable from "@/component/MeterTable";
import { MeterType } from "@/types/api";

export const revalidate = 0;

export default async function Home() {
  const meters = await fetch(`${process.env.ENVIRONMENT}/api/get_meters`)
    .then((res) => res.json())
    .then((data) => data.data as Promise<MeterType[]>);

  return (
    <main>
      <MeterTable rows={meters} />
    </main>
  );
}
