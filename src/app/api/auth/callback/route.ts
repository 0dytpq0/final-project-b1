import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // const next = searchParams.get("next") ?? "/";

  if (code) {
    const { data, error } = supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // return NextResponse.redirect(`${origin}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
