import { createClient } from "@supabase/supabase-js";
import { environment } from "../config/environment";

export const supabaseAdmin = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);