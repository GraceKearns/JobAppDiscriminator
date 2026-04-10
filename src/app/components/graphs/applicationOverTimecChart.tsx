import { getFilteredApplications } from "@/util/lib";
import { JobApplication } from "@/util/types";
import { useState } from "react";
import { Line } from "react-chartjs-2";

export interface ApplicationOverTimeChartProps {
    jobApplications: JobApplication[]
}

export default function ApplicationOverTimeChart(props: ApplicationOverTimeChartProps) {
    const { jobApplications } = props
    const timeFilters = [
        { label: 'Last 24 hours', value: '1d' },
        { label: 'Last 7 Days', value: '7d' },
        { label: 'Last 30 Days', value: '30d' },
        { label: 'Last 90 Days', value: '90d' },
        { label: 'All Time', value: 'all' },
    ] as const;

    const localJobApplications = [...jobApplications];

    const [timePeriod, setTimePeriod] = useState<string>('all');
    const filteredApplications = getFilteredApplications(timePeriod, localJobApplications)
    const applicationsByDate = filteredApplications.reduce((acc, app) => {
        const date = new Date(app.jobAppliedAt).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const sortedDates = Object.keys(applicationsByDate).sort((a, b) =>
        new Date(a).getTime() - new Date(b).getTime()
    );
    const timeSeriesData = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Applications Submitted',
                data: sortedDates.map(date => applicationsByDate[date]),
                borderColor: 'rgba(83, 78, 70, 1)',
                backgroundColor: 'rgba(99, 85, 66, 0.14)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(83, 78, 70, 1)',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }
        ]
    };
    return (
        <div className="mb-12 border-2 border-black bg-silver p-1 shadow-[8px_8px_0_0_#000]">
            <div className="h-full border-2 border-black bg-[#fff7e7] p-6 sm:p-8">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <h3 className="text-2xl font-family-jacques font-semibold text-black">Applications Over Time</h3>
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
                        <Line
                            data={timeSeriesData}
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
                                        text: 'Job Application Submission Timeline',
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
                                        },
                                        title: {
                                            display: true,
                                            text: 'Number of Applications',
                                            color: '#1c1a17',
                                            font: {
                                                size: 14,
                                                weight: 'bold'
                                            }
                                        }
                                    },
                                    x: {
                                        ticks: {
                                            color: '#38342e',
                                            font: {
                                                size: 10
                                            },
                                            maxRotation: 45,
                                            minRotation: 45
                                        },
                                        grid: {
                                            color: 'rgba(83, 78, 70, 0.10)'
                                        },
                                        title: {
                                            display: true,
                                            text: 'Date',
                                            color: '#1c1a17',
                                            font: {
                                                size: 14,
                                                weight: 'bold'
                                            }
                                        }
                                    }
                                },
                                interaction: {
                                    intersect: false,
                                    mode: 'index'
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