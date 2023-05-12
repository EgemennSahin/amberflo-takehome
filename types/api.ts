export interface MeterType {
  id: string;
  api_name: string;
  display_name: string;
  active: boolean;
  used_for_billing: boolean;
  updated_time: string;
  created_time: string;
  type: "sum" | "max" | "unique_count";
}
