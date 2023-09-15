import { submitResources } from "@/lib/submit/submit";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await submitResources(body);
    return new NextResponse("Resource Submitted", { status: 200 });
  } catch (error) {
    return new NextResponse("Submission Error", { status: 401 });
  }
}
