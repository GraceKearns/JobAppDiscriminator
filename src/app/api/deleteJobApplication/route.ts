import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";

async function deleteJobApplication(id: number) {
    const result = await prisma.job_app.deleteMany({
        where: {
            job_app_id: id,
        },
    });

    return result.count;
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { jobId } = body;
        
        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }
        
        const deletedRows = await deleteJobApplication(Number(jobId));
        
        if (Number(deletedRows) > 0) {
            return NextResponse.json({ success: true, message: "Job application deleted successfully" });
        } else {
            return NextResponse.json({ error: "Job application not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting job application:", error);
        return NextResponse.json({ error: "Failed to delete job application" }, { status: 500 });
    }
}