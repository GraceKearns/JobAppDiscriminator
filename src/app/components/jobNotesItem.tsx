import { useState } from "react";
import { JobApplication } from "@/util/types";

interface JobNotesItemProps {
    jobApplication: JobApplication;
    onNotesUpdate: (jobId: string | number, notes: string) => void;
    index: number;
}

export default function JobNotesItem(props: JobNotesItemProps) {
    const { jobApplication, onNotesUpdate, index } = props;
    const { jobTitle, jobCompany, jobStatus, jobAppliedAt, jobNotes = "" } = jobApplication;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [noteText, setNoteText] = useState(jobNotes || "");

    const bgColor = index % 2 === 0 ? 'bg-desertSand' : 'bg-goldenSand';
    const notesBgColor = index % 2 === 0 ? 'bg-goldenSand' : 'bg-desertSand';

    const formatDate = (dateValue: Date | string) => {
        const date = new Date(dateValue);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSave = () => {
        onNotesUpdate(jobApplication.jobId.toString(), noteText);
        setIsEditing(false);
    };

    const handleClear = () => {
        setNoteText(jobNotes || "");
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="relative mt-8 flex flex-col items-center px-2">
            <div className={`w-11/12 ${bgColor} border-2 border-black p-1 shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-transform duration-300`}>
                <div className="border-2 border-black bg-[#fff9e9] overflow-hidden">
                    {/* Main job info - clickable to expand */}
                    <div
                        className="cursor-pointer px-4 py-5 md:px-8 hover:bg-black/5 transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 md:w-2/3">
                                <h1 className="mb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-family-jacques">
                                    {jobTitle}
                                </h1>
                                <hr className="border-t-2 border-jobAccent mb-2" />
                                <h2 className="text-lg sm:text-xl md:text-2xl text-black font-family-jacques">
                                    {jobCompany}
                                </h2>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-sm sm:text-base md:text-lg text-black font-family-jacques">
                                    Applied: {formatDate(jobAppliedAt)}
                                </p>
                                <p className="text-sm sm:text-base md:text-lg text-black font-family-jacques">
                                    Status: {jobStatus}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm sm:text-base text-black/70 font-family-jacques">
                                        {isExpanded ? '▲ Hide Notes' : '▼ Show Notes'}
                                    </span>
                                    {jobNotes && (
                                        <span className="bg-silver border-2 font-family-jacques border-black px-2 py-1 text-xs text-black">
                                            Has Notes
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expandable notes section */}
                    {isExpanded && (
                        <div className={`${notesBgColor} border-t-2 border-black p-4 md:p-6`}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg sm:text-xl font-family-jacques text-black">Notes</h3>
                                {!isEditing && (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-silver hover:bg-silver/70 border-2 border-black px-4 py-2 text-black font-family-jacques text-sm transition-colors flex items-center gap-2"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditing ? (
                                <div>
                                    <textarea
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="Add your notes about this job application..."
                                        className="w-full h-32 resize-none border-2 border-black bg-white p-4 text-black font-family-jacques focus:outline-none"
                                    />
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button
                                            onClick={handleClear}
                                            className="bg-silver hover:bg-silver/70 border-2 border-black px-6 py-2 text-black font-family-jacques transition-colors"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="bg-goldenSand hover:bg-goldenSand/70 border-2 border-black px-6 py-2 text-black font-family-jacques transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="min-h-25 border-2 border-black bg-white/60 p-4">
                                    {noteText ? (
                                        <p className="text-black font-family-jacques whitespace-pre-wrap">{noteText}</p>
                                    ) : (
                                        <p className="text-gray-500 font-family-jacques italic">No notes added yet. Click Edit to add notes.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}