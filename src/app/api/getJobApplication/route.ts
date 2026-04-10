import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";
import { JobApplication } from "@/util/types";


function mapJobAppRecord(record: {
    job_app_id: number;
    job_app_title: string;
    job_app_company: string;
    job_app_applied: Date;
    job_app_updated: Date | null;
    job_app_status: string;
    job_app_notes: string | null;
}): JobApplication {
    return {
        jobId: record.job_app_id,
        jobTitle: record.job_app_title,
        jobCompany: record.job_app_company,
        jobAppliedAt: record.job_app_applied,
        jobUpdatedAt: record.job_app_updated,
        jobStatus: record.job_app_status as JobApplication["jobStatus"],
        jobNotes: record.job_app_notes ?? "",
    };
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('jobId');
        if (id) {
            const numericId = Number.parseInt(id, 10);
            if (Number.isNaN(numericId)) {
                return NextResponse.json(
                    { error: "Invalid jobId." },
                    { status: 400 }
                );
            }
            const result = await prisma.job_app.findUnique({
                where: { job_app_id: numericId },
            });
            if (!result) {
                return NextResponse.json([], { status: 200 });
            }
            return NextResponse.json([mapJobAppRecord(result)], { status: 200 });
        }
        const result = await prisma.job_app.findMany({
            orderBy: {
                job_app_applied: 'desc',
            },
        });
        return NextResponse.json(
            result.map(mapJobAppRecord),
            { status: 200 }
        )
    }
    catch (error) {
        console.error("Failed to fetch job applications. " + error);
        return NextResponse.json(
            { error: "Failed to request job applications." },
            { status: 500 }
        )
    }
}

