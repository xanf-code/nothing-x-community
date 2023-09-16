import { createVote } from "@/app/_actions";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const resourceID = searchParams.get("id");
    const action = searchParams.get("action");

    if (action) {
      await createVote(Number(resourceID), action);
    } else {
      console.log("INVALID ACTION.");
    }

    return new NextResponse("Action Performed", { status: 200 });
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 401 });
  }
}
