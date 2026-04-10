import { prisma } from '../../../util/prisma'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { jobId, jobTitle, jobCompany, jobStatus, jobNotes } = body;

        if (!jobId) {
            return NextResponse.json(
                { error: "Job ID is required" },
                { status: 400 }
            );
        }

        // Convert jobId to number
        const numericJobId = parseInt(jobId, 10);
        if (isNaN(numericJobId)) {
            return NextResponse.json(
                { error: "Invalid job ID" },
                { status: 400 }
            );
        }

        // Prepare update object with proper type conversion
        const updateData: {
            job_app_title?: string;
            job_app_company?: string;
            job_app_status?: string;
            job_notes?: string;
            job_app_updated: Date;
        } = {
            job_app_updated: new Date(),
        };
        if (jobTitle !== undefined) updateData.job_app_title = String(jobTitle);
        if (jobCompany !== undefined) updateData.job_app_company = String(jobCompany);
        if (jobStatus !== undefined) updateData.job_app_status = String(jobStatus);
        if (jobNotes !== undefined) updateData.job_notes = String(jobNotes);

        const result = await prisma.job_app.updateMany({
            where: {
                job_app_id: numericJobId,
            },
            data: updateData,
        });

        if (Number(result.count) === 0) {
            return NextResponse.json(
                { error: "Job application not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Job application updated successfully", updatedRows: Number(result.count) },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Failed to update job application:", error);
        return NextResponse.json(
            { error: "Failed to update job application" },
            { status: 500 }
        );
    }
}
