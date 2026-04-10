"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/components/navbar";
import PageTitle from "../components/pageTitle";
import { JobApplication } from "@/util/types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import ApplicationStatusChart from "../components/graphs/applicationStatusChart";
import ApplicationOverTimeChart from "../components/graphs/applicationOverTimecChart";
import { useViewport } from "@/context/ViewportContext";
import StatBasicCard from "../components/statBasicCard";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

export default function Stats() {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
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

    // Calculate statistics
    const totalApplications = jobApplications.length;
    const appliedCount = jobApplications.filter(app => app.jobStatus === 'applied').length;
    const rejectedCount = jobApplications.filter(app => app.jobStatus === 'rejected').length;
    const acceptedCount = jobApplications.filter(app => app.jobStatus === 'accepted').length;
    const successRate = totalApplications > 0 ? ((acceptedCount / totalApplications) * 100).toFixed(1) : '0';

    // Get applications from last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentApplications = jobApplications.filter(app =>
        new Date(app.jobAppliedAt) >= thirtyDaysAgo
    ).length;

    // Get most active companies
    const companyCounts = jobApplications.reduce((acc, app) => {
        acc[app.jobCompany] = (acc[app.jobCompany] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topCompanies = Object.entries(companyCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        isMdUp ? (
            <main className="relative flex h-screen bg-bodyBackground">
                <NavBar />
                <section className="flex-1 flex flex-col overflow-y-auto bg-[radial-gradient(circle_at_20%_10%,rgba(196,101,15,0.11),transparent_36%),radial-gradient(circle_at_80%_85%,rgba(99,85,66,0.16),transparent_34%)]">
                    <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                        <PageTitle title={"Stats"} />
                    </div>

                    <section className="w-full">
                        <div className="w-11/12 max-w-7xl mx-auto mt-8 mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                <StatBasicCard stat={totalApplications} bgColor={"bg-desertSand"} cardTitle={"Total Applications"}/>
                                <StatBasicCard stat={successRate +"%"} bgColor={"bg-goldenSand"} cardTitle={"Success Rate"}/>
                                <StatBasicCard stat={recentApplications} bgColor={"bg-[#f6f3ef]"} cardTitle={"Recent Applications"}/>
                                <StatBasicCard stat={acceptedCount} bgColor={"bg-[#fff7e7]"} cardTitle={"Accepted Count"}/>
                               
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                                <div className="border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000]">
                                    <div className="h-full border-2 border-black bg-[#fff7e7] p-8">
                                        <h3 className="mb-6 text-2xl font-family-jacques font-semibold text-black">Application Status</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-family-jacques text-black ">Applied</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-4 w-32 rounded-full bg-gray-200">
                                                        <div
                                                            className="h-4 rounded-full bg-silver"
                                                            style={{ width: `${totalApplications > 0 ? (appliedCount / totalApplications) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-12 text-lg font-bold font-family-jacques text-black">{appliedCount}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-family-jacques text-black">Rejected</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-4 w-32 rounded-full bg-gray-200">
                                                        <div
                                                            className="h-4 rounded-full bg-silver"
                                                            style={{ width: `${totalApplications > 0 ? (rejectedCount / totalApplications) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-12 text-lg font-bold font-family-jacques text-black">{rejectedCount}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-family-jacques text-black">Accepted</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-4 w-32 rounded-full bg-gray-200">
                                                        <div
                                                            className="h-4 rounded-full bg-silver"
                                                            style={{ width: `${totalApplications > 0 ? (acceptedCount / totalApplications) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-12 text-lg font-bold font-family-jacques text-black">{acceptedCount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="border-2 border-black bg-silver p-1 shadow-[8px_8px_0_0_#000]">
                                    <div className="h-full border-2 border-black bg-[#fff7e7] p-8">
                                        <h3 className="mb-6 text-2xl font-family-jacques font-semibold text-black">Top Companies</h3>
                                        <div className="space-y-4">
                                            {topCompanies.length > 0 ? (
                                                topCompanies.map(([company, count], index) => (
                                                    <div key={company} className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-block text-sm font-bold text-white">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-lg font-family-jacques text-black">{company}</span>
                                                        </div>
                                                        <span className="text-lg font-bold font-family-jacques text-black">{count}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="font-family-jacques text-gray-500">No applications yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="w-full lg:w-1/2">
                                    <ApplicationStatusChart jobApplications={jobApplications} />
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <ApplicationOverTimeChart jobApplications={jobApplications} />
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        ) : (
            <main className="relative flex h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(196,101,15,0.11),transparent_36%),radial-gradient(circle_at_80%_85%,rgba(99,85,66,0.16),transparent_34%)]">
                <section className="flex-1 flex flex-col overflow-y-auto pb-28">
                    <div className="sticky top-0 z-20 bg-bodyBackground/90 backdrop-blur-sm">
                        <PageTitle title={"Stats"} />
                    </div>

                    <section className="w-full mx-auto">
                        <div className="w-11/12 mx-auto mt-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="border-2 border-black bg-desertSand p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="border-2 border-black bg-[#fff7e7] p-4">
                                    <h3 className="text-base font-family-jacques font-semibold text-black/80 uppercase tracking-[0.08em]">Total Applications</h3>
                                    <p className="mt-2 text-3xl font-bold font-family-jacques text-black">{totalApplications}</p>
                                </div>
                            </div>
                            <div className="border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="border-2 border-black bg-[#fff7e7] p-4">
                                    <h3 className="text-base font-family-jacques font-semibold text-black/80 uppercase tracking-[0.08em]">Success Rate</h3>
                                    <p className="mt-2 text-3xl font-bold font-family-jacques text-black">{successRate}%</p>
                                </div>
                            </div>
                            <div className="border-2 border-black bg-silver p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="border-2 border-black bg-[#f6f3ef] p-4">
                                    <h3 className="text-base font-family-jacques font-semibold text-black/80 uppercase tracking-[0.08em]">Recent (30 days)</h3>
                                    <p className="mt-2 text-3xl font-bold font-family-jacques text-black">{recentApplications}</p>
                                </div>
                            </div>
                            <div className="border-2 border-black bg-desertSand p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="border-2 border-black bg-[#fff7e7] p-4">
                                    <h3 className="text-base font-family-jacques font-semibold text-black/80 uppercase tracking-[0.08em]">Accepted</h3>
                                    <p className="mt-2 text-3xl font-bold font-family-jacques text-black">{acceptedCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="h-full border-2 border-black bg-[#fff7e7] p-6">
                                    <h3 className="mb-6 text-2xl font-family-jacques font-semibold text-black">Application Status</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-family-jacques text-black ">Applied</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-32 rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-silver"
                                                        style={{ width: `${totalApplications > 0 ? (appliedCount / totalApplications) * 100 : 0}%` }}
                                                    ></div>
                                                </div>
                                                <span className="w-12 text-lg font-bold font-family-jacques text-black">{appliedCount}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-family-jacques text-black">Rejected</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-32 rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-silver"
                                                        style={{ width: `${totalApplications > 0 ? (rejectedCount / totalApplications) * 100 : 0}%` }}
                                                    ></div>
                                                </div>
                                                <span className="w-12 text-lg font-bold font-family-jacques text-black">{rejectedCount}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-family-jacques text-black">Accepted</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-4 w-32 rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-silver"
                                                        style={{ width: `${totalApplications > 0 ? (acceptedCount / totalApplications) * 100 : 0}%` }}
                                                    ></div>
                                                </div>
                                                <span className="w-12 text-lg font-bold font-family-jacques text-black">{acceptedCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="border-2 border-black bg-silver p-1 shadow-[8px_8px_0_0_#000]">
                                <div className="h-full border-2 border-black bg-[#fff7e7] p-6">
                                    <h3 className="mb-6 text-2xl font-family-jacques font-semibold text-black">Top Companies</h3>
                                    <div className="space-y-4">
                                        {topCompanies.length > 0 ? (
                                            topCompanies.map(([company, count], index) => (
                                                <div key={company} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-block text-sm font-bold text-white">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-lg font-family-jacques text-black">{company}</span>
                                                    </div>
                                                    <span className="text-lg font-bold font-family-jacques text-black">{count}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="font-family-jacques text-gray-500">No applications yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-1/2">
                                <ApplicationStatusChart jobApplications={jobApplications} />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <ApplicationOverTimeChart jobApplications={jobApplications} />
                            </div>
                        </div>
                    </div>
                </section>
                </section>
                <NavBar />
            </main>
        )
    );
}
