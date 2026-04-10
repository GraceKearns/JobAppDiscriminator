import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/util/prisma";

export async function POST(request: Request) {
  const apiGatewayUrl = process.env.API_GATEWAY_URL ?? "http://127.0.0.1:8000";
  const apiGatewayKey = process.env.API_GATEWAY_KEY;
  const jwt = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(apiGatewayUrl)
  const user_id = (jwt?.userId as number | undefined) ?? (jwt?.user_Id as number | undefined);
  const email = jwt?.email as string | undefined;
  try {
    if (!user_id) {
      console.log("failed");
      return NextResponse.json(
        {
          error: "User_Id was not pushed, are you signed in?",
        },
        { status: 401 }
      );
    }

    const payload = {
      requester: {
        id: user_id,
        email: email,
        jobType: "SCAN",
      },
      initiatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${apiGatewayUrl}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiGatewayKey ? { "x-api-key": apiGatewayKey } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to trigger email scan", details: data },
        { status: response.status }
      );
    }
    const result = await prisma.user_processes.create({
      data: {
        user_id: user_id,
        user_process_complete: false,
      },
    });
    if (!result) {
     
      return NextResponse.json(
        { error: "Failed to create user process." },
        { status: 500 }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
     console.log(error)
    return NextResponse.json(
      {
        error: "Could not reach API Gateway",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}