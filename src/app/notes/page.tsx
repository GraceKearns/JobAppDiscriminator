"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/components/navbar";
import PageTitle from "../components/pageTitle";
import { JobApplication } from "@/util/types";
import JobNotesItem from "../components/jobNotesItem";
import { useViewport } from "@/context/ViewportContext";


export default function Notes() {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { isMdUp } = useViewport();

    useEffect(() => {
        getJobApplications();
    }, []);

    const getJobApplications = async () => {
        const response = await fetch('/api/getJobApplication', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setJobApplications(data);
    };

    const handleNotesUpdate = async (jobId: string | number, notes: string) => {
        try {
            const response = await fetch('/api/updateJobNotes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobId, notes }),
            });
            if (response.ok) {
                getJobApplications();
            }
        } catch (error) {
            console.error('Failed to update job notes:', error);
        }
    };

    const filteredApps = jobApplications.filter((app) => {
        const matchesSearch =
            app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobCompany.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        isMdUp ? (
            <main className="relative flex h-screen bg-bodyBackground">
                <NavBar />
                <section className="flex-1 min-h-0 flex flex-col overflow-y-auto bg-[radial-gradient(circle_at_18%_12%,rgba(196,101,15,0.11),transparent_36%),radial-gradient(circle_at_85%_88%,rgba(99,85,66,0.16),transparent_34%)]">
                    <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                        <PageTitle title={"Notes"} />
                    </div>

                    <section className="w-full mx-auto">
                        <div className="w-11/12 max-w-7xl mx-auto sticky top-24 z-10 pt-5">
                            <div className="mx-auto border-2 border-black bg-[#fff9e9] p-4 sm:p-6 shadow-[8px_8px_0_0_#000]">
                                <div className="flex justify-between items-center gap-2 mb-6">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search by job title or company..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full border-2 border-black bg-white px-6 py-4 text-lg sm:text-xl md:text-2xl text-black font-family-jacques focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mx-auto mt-6">
                                    <p className="text-lg text-black/70 font-family-jacques">
                                        Total: {filteredApps.length} applications
                                    </p>
                                </div>
                                <hr className="border-t-2 w-full mt-4 border-black/80" />
                            </div>
                        </div>

                        <div className="w-11/12 max-w-7xl mx-auto pt-4 pb-10">
                            {filteredApps.map((app, index) => (
                                <JobNotesItem
                                    key={String(app.jobId)}
                                    jobApplication={app}
                                    onNotesUpdate={handleNotesUpdate}
                                    index={index}
                                />
                            ))}
                        </div>
                    </section>
                </section>
            </main>
        ) : (
            <main className="relative flex h-screen bg-[radial-gradient(circle_at_18%_12%,rgba(196,101,15,0.11),transparent_36%),radial-gradient(circle_at_85%_88%,rgba(99,85,66,0.16),transparent_34%)]">
                <section className="flex-1 min-h-0 flex flex-col overflow-y-auto  pb-28">
                    <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                        <PageTitle title={"Notes"} />
                    </div>

                    <section className="w-full mx-auto">
                        <div className="w-11/12 max-w-7xl mx-auto sticky top-24 z-10 pt-4">
                            <div className="mx-auto border-2 border-black bg-[#fff9e9] p-4 shadow-[8px_8px_0_0_#000]">
                                <div className="flex justify-between items-center gap-2 mb-6">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search by job title or company..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full border-2 border-black bg-white px-4 py-3 text-base text-black font-family-jacques focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mx-auto mb-4">
                                    <p className="text-base text-black/70 font-family-jacques">
                                        Total: {filteredApps.length} applications
                                    </p>
                                </div>
                                <hr className="border-t-2 w-full border-black/80" />
                            </div>
                        </div>

                        <div className="w-11/12 max-w-7xl mx-auto pt-4 pb-10">
                            {filteredApps.map((app, index) => (
                                <JobNotesItem
                                    key={String(app.jobId)}
                                    jobApplication={app}
                                    onNotesUpdate={handleNotesUpdate}
                                    index={index}
                                />
                            ))}
                        </div>
                    </section>
                </section>
                <NavBar />
            </main>
        )
    );
}