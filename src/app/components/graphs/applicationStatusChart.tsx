import { getFilteredApplications } from "@/util/lib";
import { JobApplication } from "@/util/types";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

export interface ApplicationStatusChartProps {
    jobApplications: JobApplication[]
}
export default function ApplicationStatusChart(props: ApplicationStatusChartProps) {
    const { jobApplications } = props
    const localJobApplications = [...jobApplications];
    const timeFilters = [
        { label: 'Last 24 hours', value: '1d' },
        { label: 'Last 7 Days', value: '7d' },
        { label: 'Last 30 Days', value: '30d' },
        { label: 'Last 90 Days', value: '90d' },
        { label: 'All Time', value: 'all' },
    ] as const;

    const [timePeriod, setTimePeriod] = useState<string>('all');
    const filteredApplications = getFilteredApplications(timePeriod, localJobApplications)

    // Use filtered applications for status counts
    const appliedCount = filteredApplications.filter(app => app.jobStatus === 'applied').length;
    const rejectedCount = filteredApplications.filter(app => app.jobStatus === 'rejected').length;
    const acceptedCount = filteredApplications.filter(app => app.jobStatus === 'accepted').length;

    const barData = {
        labels: ['Applied', 'Rejected', 'Accepted'],
        datasets: [
            {
                label: 'Number of Applications',
                data: [appliedCount, rejectedCount, acceptedCount],
                backgroundColor: [
                    'rgba(99, 85, 66, 0.85)',
                    'rgba(161, 124, 94, 0.85)',
                    'rgba(107, 57, 40, 0.85)',
                ],
                borderColor: [
                    'rgba(83, 78, 70, 1)',
                    'rgba(129, 99, 75, 1)',
                    'rgba(64, 50, 38, 1)',
                ],
                borderWidth: 2,
                borderRadius: 4,
            }
        ]
    }
    return (
        <div className="border-2 border-black bg-desertSand p-1 shadow-[8px_8px_0_0_#000]">
            <div className="h-full border-2 border-black bg-[#fff7e7] p-6 sm:p-8">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <h3 className="text-2xl font-family-jacques font-semibold text-black">Application Status Chart</h3>
                    <div className="flex flex-wrap gap-2">
                        {timeFilters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setTimePeriod(filter.value)}
                                className={`inline-flex items-center justify-center border-2 border-black px-3 py-1.5 text-xs font-family-jacques font-semibold text-black transition-colors sm:text-sm ${timePeriod === filter.value
                                    ? 'bg-silver'
                                    : 'bg-white hover:bg-[#f4ead8]'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-80">
                    {filteredApplications.length > 0 ? (
                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top' as const,
                                        labels: {
                                            color: '#1c1a17',
                                            font: {
                                                size: 14,
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                    title: {
                                        display: true,
                                        text: 'Job Application Status Distribution',
                                        color: '#1c1a17',
                                        font: {
                                            size: 16,
                                            weight: 'bold'
                                        }
                                    }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            stepSize: 1,
                                            color: '#38342e',
                                            font: {
                                                size: 12
                                            }
                                        },
                                        grid: {
                                            color: 'rgba(83, 78, 70, 0.18)'
                                        }
                                    },
                                    x: {
                                        ticks: {
                                            color: '#38342e',
                                            font: {
                                                size: 12,
                                                weight: 'bold'
                                            }
                                        },
                                        grid: {
                                            display: false
                                        }
                                    }
                                }
                            }}
                        />
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg font-family-jacques text-[#534e46]">
                                No application data available
                            </p>
                            <p className="mt-2 text-sm text-[#6f685d]">
                                Add some job applications to see the timeline
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}