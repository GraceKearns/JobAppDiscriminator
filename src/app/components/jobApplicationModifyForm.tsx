"use client"

import { JobApplication } from "@/util/types";
import { JobStatus } from "@/util/lib";

export interface JobApplicationModifyFormProps {
    modifyFormVisible: boolean;
    setModifyFormVisible: (value: boolean) => void;
    jobApplication: JobApplication;
    onUpdate?: () => void;
}

export default function JobApplicationModifyForm(props: JobApplicationModifyFormProps) {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const jobApplicationData = {
            jobId: props.jobApplication.jobId,
            jobTitle: formData.get('jobTitle') as string,
            jobCompany: formData.get('jobCompany') as string,
            jobStatus: formData.get('jobStatus') as JobStatus,
            jobNotes: formData.get('jobNotes') as string,
        };
        
        try {
            const response = await fetch('/api/editJobApplication', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobApplicationData),
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('Job application updated:', result);
                props.setModifyFormVisible(false);
                if (props.onUpdate) {
                    props.onUpdate();
                }
            } else {
                console.error('Failed to update job application');
            }
        } catch (error) {
            console.error('Error updating job application:', error);
        }
    }
    
    return (
        <div 
            className="flex h-full border-2 border-black  w-full items-center justify-center"
            onClick={() => props.setModifyFormVisible(false)}
        >
            <div 
                className="bg-desertSand mt-7 drop-shadow-2xl  p-8 rounded-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-2xl text-left text-black font-family-jacques"> Edit Application  </h1>
                <hr className="w-full  border-t-2 border-black" />
                <div className="w-full">
                <form className="flex flex-col gap-1" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="jobTitle" className="text-black">Job Title</label>
                        <input 
                            id="jobTitle" 
                            name="jobTitle" 
                            type="text" 
                            required 
                            defaultValue={props.jobApplication.jobTitle}
                            className="w-full rounded-sm border border-black bg-white px-3 py-2 text-black focus:black focus:outline-none focus:ring-1 focus:ring-black" 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="jobCompany" className="text-black">Job Company</label>
                        <input 
                            id="jobCompany" 
                            name="jobCompany" 
                            type="text" 
                            required 
                            defaultValue={props.jobApplication.jobCompany}
                            className="w-full rounded-sm border border-black bg-white px-3 py-2 text-black focus:black focus:outline-none focus:ring-1 focus:ring-black" 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="jobStatus" className="text-black">Status</label>
                        <select 
                            id="jobStatus" 
                            name="jobStatus" 
                            required 
                            defaultValue={props.jobApplication.jobStatus}
                            className="w-full rounded-sm border border-black bg-white px-3 py-2 text-black focus:black focus:outline-none focus:ring-1 focus:ring-black" 
                        >
                            <option value="applied">Applied</option>
                            <option value="rejected">Rejected</option>
                            <option value="accepted">Accepted</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="jobNotes" className="text-black">Notes</label>
                        <textarea 
                            id="jobNotes" 
                            name="jobNotes" 
                            rows={3}
                            defaultValue={props.jobApplication.jobNotes}
                             className="w-full rounded-sm border border-black bg-white px-3 py-2 text-black focus:black focus:outline-none focus:ring-1 focus:ring-black" 
                        />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button 
                            type="button" 
                            onClick={() => props.setModifyFormVisible(false)}
                            className="flex-1 rounded-sm bg-silver px-4 py-2 border-black border-2 text-black hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 rounded-sm bg-goldenSand px-4 py-2 border-black border-2 text-black hover:bg-blue-700 transition-colors"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            </div>
            


        </div>
    )
}