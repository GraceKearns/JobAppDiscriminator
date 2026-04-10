import { useViewport } from "@/context/ViewportContext";
import { JobApplication } from "@/util/types";
import { PenIcon } from "lucide-react";

interface JobAppItemProps {
    jobApplication: JobApplication;
    onModify?: (jobApplication: JobApplication) => void;
    onRemove?: (jobId: string | number) => void;
    removeMode?: boolean;
    index?: number;
}

export default function JobAppItem(props: JobAppItemProps) {
    const { jobApplication, onModify, onRemove, removeMode = false, index = 0 } = props;
    const bgColor = index % 2 === 0 ? ' bg-desertSand' : 'bg-goldenSand';
    const buttonColor = index % 2 === 0 ? ' bg-goldenSand' : 'bg-desertSand';
    const hoverButtonColor = index % 2 === 0 ? 'hover:bg-goldenSand/70' : 'hover:bg-desertSand/70';
    const { jobTitle, jobCompany, jobStatus, jobAppliedAt, jobUpdatedAt } = jobApplication;
    const { isMdUp } = useViewport();
    const formatDate = (dateValue: Date | string, includehm: boolean) => {
        const date = new Date(dateValue);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (!includehm) {
            return `${day}/${month}/${year}`
        }
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const handleModifyClick = () => {
        if (onModify) {
            onModify(jobApplication);
        }
    };

    const handleRemoveClick = () => {
        if (onRemove) {
            onRemove(jobApplication.jobId.toString());
        }
    };

    return (
        isMdUp ? (
            <div className="relative mt-8 w-full">
                <div className={`relative w-full ${bgColor} border-black border-2 p-1 shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-transform duration-300`}>
                    {removeMode && (
                        <button
                            onClick={handleRemoveClick}
                            className="z-20 absolute -right-3 -top-3  bg-white  hover:w-16 hover:h-16 border-2 border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold transition-all duration-200 shadow-lg"
                        >
                            ✕
                        </button>
                    )}
                    <div className="border-2 border-black bg-[#fff9e9] px-6 py-5 lg:px-8">
                        <div className="grid grid-cols-12 items-center gap-5">
                            <div className="col-span-12 lg:col-span-5">
                                <h1 className="text-2xl lg:text-3xl font-semibold text-black leading-tight wrap-break-word">
                                    {jobTitle}
                                </h1>
                                <hr className="my-2 border-t-2 border-jobAccent" />
                                <h2 className="text-lg lg:text-xl text-black/90 wrap-break-word">{jobCompany}</h2>
                            </div>

                            <div className="col-span-12 lg:col-span-4 space-y-1">
                                <p className="text-sm lg:text-base text-black/85">Applied: {formatDate(jobAppliedAt, true)}</p>
                                {jobUpdatedAt != null && (
                                    <p className="text-sm lg:text-base text-black/85">Updated: {formatDate(jobUpdatedAt, true)}</p>
                                )}
                                <div className="pt-1">
                                    <span className="inline-flex items-center border-2 border-black bg-white px-3 py-1 text-sm font-semibold text-black">
                                        Status: {jobStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-3 flex justify-start lg:justify-end">
                                <button
                                    onClick={handleModifyClick}
                                    className={`inline-flex h-11 w-32 items-center justify-center border-2 ${buttonColor} ${hoverButtonColor} text-sm font-semibold text-black cursor-pointer transition-colors`}
                                >
                                    Modify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="relative mt-4 w-full">
                <div className={`relative w-full ${bgColor} border-black border-2 p-1 shadow-[8px_8px_0_0_#000] transition-all duration-300 flex flex-col`}>
                    {removeMode && (
                        <button
                            onClick={handleRemoveClick}
                            className="z-20 absolute -right-3 -top-3  bg-white  hover:w-16 hover:h-16 border-2 border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold transition-all duration-200 shadow-lg"
                        >
                            ✕
                        </button>
                    )}
                    <div className="border-2 border-black bg-[#fff9e9] py-3">
                        <div className="px-4 flex flex-col gap-3">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-semibold text-black leading-tight wrap-break-word">{jobTitle}</h1>
                                <hr className="my-2 border-t-2 border-jobAccent" />
                                <h2 className="text-base text-black/90 wrap-break-word">{jobCompany}</h2>
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-black/85">
                                <p>Applied: {formatDate(jobAppliedAt, false)}</p>
                                {jobUpdatedAt != null && (<p>Updated: {formatDate(jobUpdatedAt, false)}</p>)}
                                <div className="pt-1">
                                    <span className="inline-flex items-center border-2 border-black bg-white px-2.5 py-1 text-xs font-semibold text-black">
                                        Status: {jobStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="pt-1 flex justify-end">
                                <button
                                    onClick={handleModifyClick}
                                    className={`inline-flex h-10 w-28 items-center justify-center gap-2 border-2 ${buttonColor} ${hoverButtonColor} px-3 text-sm font-semibold text-black cursor-pointer transition-colors`}
                                >
                                    <PenIcon size={16} />
                                    Modify
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}