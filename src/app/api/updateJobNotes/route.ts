import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";

async function updateJobNotes(jobId: number, notes: string) {
    const result = await prisma.job_app.updateMany({
        where: {
            job_app_id: jobId,
        },
        data: {
            job_app_notes: notes,
            job_app_updated: new Date(),
        },
    });

    return result.count;
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { jobId, notes } = body;
        
        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }
        
        if (typeof notes !== 'string') {
            return NextResponse.json({ error: "Notes must be a string" }, { status: 400 });
        }
        
        const updatedRows = await updateJobNotes(Number(jobId), notes);
        
        if (Number(updatedRows) > 0) {
            return NextResponse.json({ 
                success: true, 
                message: "Job notes updated successfully",
                notes: notes 
            });
        } else {
            return NextResponse.json({ error: "Job application not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error updating job notes:", error);
        return NextResponse.json({ error: "Failed to update job notes" }, { status: 500 });
    }
}