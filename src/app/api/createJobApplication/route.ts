import { prisma } from "@/util/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { jobTitle, jobCompany } = body;

        if (!jobTitle || !jobCompany) {
            return NextResponse.json(
                { error: 'Job title and company are required' },
                { status: 400 }
            );
        }
        const jwt = await getToken({
            req: request as any,
            secret: process.env.NEXTAUTH_SECRET,
        });
        const email = jwt?.email as string | undefined;
        const user = await prisma.userdata.findFirst({
            where: { email: email },
        });
        if (!email || !user) {
            return NextResponse.json(
                { error: "Failed to find user account, are you signed in?" },
                { status: 401 }
            );
        }
        const result = await prisma.job_app.create({
            data: {
                job_app_userid:user.user_id,
                job_app_title: String(jobTitle),
                job_app_company: String(jobCompany),
                job_app_status: 'applied',
                job_app_applied: new Date().toISOString(),
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Job application created successfully',
            id: result.job_app_id
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to create job application' },
            { status: 500 }
        );
    }
}