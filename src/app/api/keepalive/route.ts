import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    source: "eventflow-keepalive",
    timestamp: new Date().toISOString(),
    note: "Wire this route to a lightweight authenticated Supabase ping before production.",
  });
}
