import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      status: 400,
      message: "Bad Request",
      error: { status: 400, message: "Bad Request" },
      data: null,
    });
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("area")
    .select("*")
    .or(`name.ilike.%${query}%, krName.ilike.%${query}%`);

  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: { status: 500, message: "Internal Server Error" },
      data: null,
    });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({
      status: 404,
      message: "No Data",
      error: { status: 404, message: "No Data" },
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: data,
    error: null,
  });
}
