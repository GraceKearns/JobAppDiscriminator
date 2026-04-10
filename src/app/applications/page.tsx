"use client";

import { useEffect, useState } from "react";
import JobAppItem from "../components/jobAppItem";
import NavBar from "@/app/components/navbar";
import PageTitle from "../components/pageTitle";
import JobAppItemFilters from "../components/jobAppItemFilters";
import { JobApplication } from "@/util/types";
import JobApplicationModifyForm from "../components/jobApplicationModifyForm";
import { useViewport } from "@/context/ViewportContext";
import JobScan from "../components/jobScan";
import toast, { Toaster } from 'react-hot-toast';

export default function Applications() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [recentOnly, setRecentOnly] = useState(false);
    const [modifyAppFormVisible, setModifyAppFormVisible] = useState(false);
    const [scanEmailVisible, setScanEmailVisible] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [selectedJobForModify, setSelectedJobForModify] = useState<JobApplication | null>(null);
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
    const [isScanning, setIsScanning] = useState(false);

    const { isMdUp } = useViewport();
    useEffect(() => {
        getJobApplications();

    }, [])

    const handleScanEmails = async () => {
        try {
            setIsScanning(true);
            const response = await fetch('/api/scanEmails', {
                method: 'POST',
            });
            if(response.ok) {
                toast.success("Your job scan has been added to the queue, come back later to see the results.");
            }
            if (!response.ok) {
                throw new Error(`Scan failed with status ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to trigger email scan:', error);
            toast.error("An error has occurred while scanning emails.");
        } finally {
            setIsScanning(false);
        }
    };
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

    const handleModifyJob = (jobApplication: JobApplication) => {
        setSelectedJobForModify(jobApplication);
        setModifyAppFormVisible(true);
    };

    const handleModifyFormUpdate = () => {
        getJobApplications();
    };

    const handleRemoveJob = async (jobId: string | number) => {
        try {
            const response = await fetch('/api/deleteJobApplication', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobId }),
            });
            if (response.ok) {
                getJobApplications(); // Refresh the list after deletion
            }
        } catch (error) {
            console.error('Failed to delete job application:', error);
        }
    };


    const filteredApps = jobApplications.filter((app) => {
        const matchesSearch =
            app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobCompany.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || app.jobStatus === statusFilter;
        const isRecent = app.jobAppliedAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const matchesRecent = !recentOnly || isRecent;
        return matchesSearch && matchesStatus && matchesRecent;
    });

    return (
        <>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
            {isMdUp ? (
                <main className="relative flex h-screen bg-bodyBackground">
                    <NavBar />
                    <section className="relative flex-1 min-h-0 overflow-y-auto bg-[radial-gradient(circle_at_20%_12%,rgba(196,101,15,0.12),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(99,85,66,0.16),transparent_33%)]">
                        <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                            <PageTitle title={"Applications"} />
                        </div>
                        <section className="w-full pb-8">
                            <div className="mx-auto w-11/12 max-w-7xl sticky top-24 z-10 pt-5">
                                <div className="mx-auto border-2 border-black bg-[#fff9e9] p-4 sm:p-6 shadow-[8px_8px_0_0_#000]">
                                    <JobAppItemFilters
                                        setScanEmailVisible={setScanEmailVisible}
                                        removeMode={removeMode}
                                        setRemoveMode={setRemoveMode}
                                        appSearchQuery={searchQuery}
                                        setAppSearchQuery={setSearchQuery}
                                        statusFilter={statusFilter}
                                        setStatusFilter={setStatusFilter}
                                        recentOnly={recentOnly}
                                        setRecentOnly={setRecentOnly}
                                    />
                                    <div className="flex justify-between mx-auto mt-6 ">
                                        <p className="text-lg text-black/70 font-family-jacques">
                                            Total: {filteredApps.length} applications
                                        </p>
                                    </div>
                                    <hr className="border-t-2 w-full mt-4 border-black/80" />
                                </div>
                            </div>
                            <div className="mx-auto w-11/12 max-w-7xl pt-6 pb-10">
                                {filteredApps.length > 0 ? (
                                    filteredApps.map((app, index) => (
                                        <JobAppItem
                                            key={String(app.jobId)}
                                            jobApplication={app}
                                            onModify={handleModifyJob}
                                            onRemove={handleRemoveJob}
                                            removeMode={removeMode}
                                            index={index}
                                        />
                                    ))
                                ) : jobApplications.length === 0 ? (
                                    <div className="mt-8 border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000]">
                                        <div className="border-2 border-black bg-[#fff9e9] p-8 text-center">
                                            <p className="text-2xl font-family-jacques text-black">Get started</p>
                                            <p className="mt-2 text-lg font-family-jacques text-black/80">
                                                Hit Scan Inbox to start scanning for job applications.
                                            </p>
                                            <button
                                                onClick={() => setScanEmailVisible(true)}
                                                className="mt-5 inline-flex h-10 w-40 items-center justify-center border-2 border-black bg-white px-3 text-sm font-semibold text-black transition-colors hover:bg-[#f4ead8]"
                                            >
                                                Scan Inbox
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-8 border-2 border-black bg-desertSand p-1 shadow-[8px_8px_0_0_#000]">
                                        <div className="border-2 border-black bg-[#fff9e9] p-6 text-center">
                                            <p className="text-lg font-family-jacques text-black/80">No applications match your current filters.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </section>
                    {scanEmailVisible && (
                        <section className="absolute inset-0 z-10 flex h-full w-full bg-black/90">
                            <div className="w-28 xl:w-32 shrink-0" />
                            <div className="flex-1">
                                <JobScan handleScanEmails={handleScanEmails} setScanEmailVisible={setScanEmailVisible} isScanning={isScanning} />
                            </div>
                        </section>
                    )}
                    <section className={`absolute inset-0 z-10 flex h-full w-full bg-black/90 transition-all duration-300 ease-in-out ${modifyAppFormVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-28 xl:w-32 shrink-0" />
                        <div className="flex-1">
                            {selectedJobForModify && (
                                <JobApplicationModifyForm
                                    modifyFormVisible={modifyAppFormVisible}
                                    setModifyFormVisible={setModifyAppFormVisible}
                                    jobApplication={selectedJobForModify}
                                    onUpdate={handleModifyFormUpdate}
                                />
                            )}
                        </div>
                    </section>
                </main>
        ) : (
            <main className="relative flex h-screen bg-[radial-gradient(circle_at_20%_12%,rgba(196,101,15,0.12),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(99,85,66,0.16),transparent_33%)]">

                <section className="flex-1 min-h-0 flex flex-col overflow-y-auto pb-28">
                    <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                        <PageTitle title={"Applications"} />
                    </div>
                    <section className="w-full">
                        <div className="w-11/12 max-w-7xl mx-auto sticky top-24 z-10 pt-4">
                            <div className="mx-auto border-2 border-black bg-[#fff9e9] p-4 shadow-[8px_8px_0_0_#000]">
                                <JobAppItemFilters
                                    setScanEmailVisible={setScanEmailVisible}
                                    removeMode={removeMode}
                                    setRemoveMode={setRemoveMode}
                                    appSearchQuery={searchQuery}
                                    setAppSearchQuery={setSearchQuery}
                                    statusFilter={statusFilter}
                                    setStatusFilter={setStatusFilter}
                                    recentOnly={recentOnly}
                                    setRecentOnly={setRecentOnly}
                                />
                                <div className="flex justify-between mx-auto mt-6 ">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setRemoveMode(!removeMode)}
                                            className={`border-2 p-2 sm:p-4 lg:p-6 border-black font-family-jacques text-center px-2 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm lg:text-base transition-colors cursor-pointer ${removeMode ? 'bg-red-400 hover:bg-red-500 text-white' : 'bg-silver hover:bg-silver/60 text-black'
                                                }`}
                                        >
                                            {removeMode ? '✕ Cancel' : '- Remove'}
                                        </button>
                                    </div>
                                    <p className="text-lg text-black/70  font-family-jacques">
                                        Total: {filteredApps.length} applications
                                    </p>
                                </div>
                                <hr className="border-t-2 w-full mt-4 border-black/80" />
                            </div>
                        </div>
                        <div className="w-11/12 max-w-7xl mx-auto pt-4 pb-10">
                            {filteredApps.length > 0 ? (
                                filteredApps.map((app, index) => (
                                    <JobAppItem
                                        key={String(app.jobId)}
                                        jobApplication={app}
                                        onModify={handleModifyJob}
                                        onRemove={handleRemoveJob}
                                        removeMode={removeMode}
                                        index={index}
                                    />
                                ))
                            ) : jobApplications.length === 0 ? (
                                <div className="mt-6 border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000]">
                                    <div className="border-2 border-black bg-[#fff9e9] p-6 text-center">
                                        <p className="text-xl font-family-jacques text-black">Get started</p>
                                        <p className="mt-2 text-base font-family-jacques text-black/80">
                                            Hit Scan Inbox to start scanning for job applications.
                                        </p>
                                        <button
                                            onClick={() => setScanEmailVisible(true)}
                                            className="mt-4 inline-flex h-10 w-36 items-center justify-center border-2 border-black bg-white px-3 text-sm font-semibold text-black transition-colors hover:bg-[#f4ead8]"
                                        >
                                            Scan Inbox
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-6 border-2 border-black bg-desertSand p-1 shadow-[8px_8px_0_0_#000]">
                                    <div className="border-2 border-black bg-[#fff9e9] p-5 text-center">
                                        <p className="text-base font-family-jacques text-black/80">No applications match your current filters.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </section>
                {scanEmailVisible && (
                    <section className="absolute inset-0 z-10 flex h-full w-full bg-black/90">
                        <div className="w-full mx-2">
                            <JobScan handleScanEmails={handleScanEmails} setScanEmailVisible={setScanEmailVisible} isScanning={isScanning} />
                        </div>
                    </section>
                )}
                <section className={`absolute inset-0 z-10 flex h-full w-full bg-black/90 transition-all duration-300 ease-in-out ${modifyAppFormVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="w-full mx-2">
                        {selectedJobForModify && (
                            <JobApplicationModifyForm
                                modifyFormVisible={modifyAppFormVisible}
                                setModifyFormVisible={setModifyAppFormVisible}
                                jobApplication={selectedJobForModify}
                                onUpdate={handleModifyFormUpdate}
                            />
                        )}
                    </div>
                </section>
                <NavBar />
            </main>
            )}
        </>
    );
}