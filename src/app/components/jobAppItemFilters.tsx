import { useViewport } from "@/context/ViewportContext";
import { Trash2, ZoomInIcon } from "lucide-react";
import { useState } from "react";

export interface JobAppItemFiltersProps {
    appSearchQuery: string;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    recentOnly: boolean;
    setRecentOnly: (value: boolean) => void;
    setAppSearchQuery: (value: string) => void;
    setScanEmailVisible:(value: boolean) => void;
    removeMode: boolean;
    setRemoveMode: (value: boolean) => void;

}
export default function (props: JobAppItemFiltersProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { isMdUp } = useViewport();
    return (
        isMdUp ? (
            <div className="w-full flex flex-col">
                <div className="flex justify-between flex-col  xl:flex-row items-center gap-2">
                    <div className="flex gap-2">
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={props.appSearchQuery}
                                onChange={(e) => props.setAppSearchQuery?.(e.target.value)}
                                className="w-full px-6 py-4 text-lg sm:text-xl md:text-2xl border-2 border-black bg-white  focus:outline-none  text-black font-family-jacques"
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => setIsFilterOpen((prev) => !prev)}
                                className="h-full border-2 bg-white   px-6 text-black font-family-jacques text-base sm:text-lg md:text-xl  hover:bg-opacity-90 transition-all whitespace-nowrap"
                            >
                                {isFilterOpen ? "Hide ▲" : "Filters ▼"}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => props.setRemoveMode(!props.removeMode)}
                            className={`border-2 p-2 sm:p-4 lg:p-6 border-black font-family-jacques text-center px-2 sm:px-4 lg:px-6  w-34 text-xs sm:text-sm lg:text-base transition-colors cursor-pointer ${props.removeMode ? 'bg-red-400 hover:bg-red-500 text-white' : 'bg-silver hover:bg-silver/60 text-black'
                                }`}
                        >
                            <div className="flex gap-x-2">
                                {props.removeMode ? (
                                    <>
                                        <Trash2 />
                                        <p>Cancel</p>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 />
                                        <p>Remove</p>
                                    </>
                                )}
                            </div>
                        </button>
                         <button
                            onClick={() => props.setScanEmailVisible(true)}
                            className="bg-desertSand hover:bg-desertSand/60 border-2 border-black font-family-jacques text-black   text-xs sm:text-sm lg:text-base transition-colors cursor-pointer px-2 sm:px-4 lg:px-6 p-2 sm:p-4 lg:p-6  gap-2"
                        >
                            <div className="flex gap-x-2">
                                <ZoomInIcon />
                                <p> Scan Inbox </p>
                            </div>
                        </button>
                       
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-silver  border-2 mt-2 border-jobAccent p-4 space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-black font-family-jacques text-base sm:text-lg">Status</label>
                            <select
                                value={props.statusFilter}
                                onChange={(e) => props.setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-jobAccent bg-silver  text-black font-family-jacques"
                            >
                                <option value="all">All</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-3 text-black font-family-jacques text-base sm:text-lg">
                            <input
                                type="checkbox"
                                checked={props.recentOnly}
                                onChange={(e) => props.setRecentOnly(e.target.checked)}
                            />
                            Applied in last 7 days
                        </label>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full flex flex-col">
                <div className="flex justify-between flex-col  xl:flex-row items-center gap-2">
                    <div className="flex gap-2">
                        <div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={props.appSearchQuery}
                                onChange={(e) => props.setAppSearchQuery?.(e.target.value)}
                                className="w-full px-6 py-4 text-lg sm:text-xl md:text-2xl rounded-2xl border-2 border-black bg-white  focus:outline-none  text-black font-family-jacques"
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => setIsFilterOpen((prev) => !prev)}
                                className="h-full rounded-2xl border-2 bg-white   px-6 text-black font-family-jacques text-base sm:text-lg md:text-xl  hover:bg-opacity-90 transition-all whitespace-nowrap"
                            >
                                {isFilterOpen ? "Hide ▲" : "Filters ▼"}
                            </button>
                        </div>
                    </div>

                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-silver rounded-md border-2 mt-2 border-jobAccent p-4 space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-black font-family-jacques text-base sm:text-lg">Status</label>
                            <select
                                value={props.statusFilter}
                                onChange={(e) => props.setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-jobAccent bg-silver  text-black font-family-jacques"
                            >
                                <option value="all">All</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <label className="flex items-center gap-3 text-black font-family-jacques text-base sm:text-lg">
                            <input
                                type="checkbox"
                                checked={props.recentOnly}
                                onChange={(e) => props.setRecentOnly(e.target.checked)}
                            />
                            Applied in last 7 days
                        </label>
                    </div>
                </div>
            </div>
        )
    )
}