import { createClient } from "@supabase/supabase-js";
import { environment } from "../config/environment";

export const supabase = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_KEY
);
