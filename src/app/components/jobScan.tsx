import { useViewport } from "@/context/ViewportContext";

interface JobScanProps {
    handleScanEmails: () => Promise<void>;
    isScanning: boolean;
    setScanEmailVisible: (value: boolean) => void;
}

export default function JobScan(props: JobScanProps) {
    const { isMdUp } = useViewport();
    const runScan = () => {
        props.handleScanEmails();
        props.setScanEmailVisible(false);
    };

    const closeModal = () => {
        props.setScanEmailVisible(false);
    };

    const modalWidthClasses = isMdUp ? "w-[30rem] max-w-[90%]" : "w-[92%] max-w-[30rem]";
    const titleSizeClasses = isMdUp ? "text-4xl" : "text-2xl";

    return (
        <div
            className="flex h-full w-full items-center justify-center px-4 backdrop-blur-[1px]"
            onClick={closeModal}
        >
            <div
                className={`relative border-2 border-black bg-desertSand p-6 sm:p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${modalWidthClasses}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute right-3 top-3 h-8 w-8 rounded-md border-2 border-black bg-silver text-black hover:bg-silver/70 transition-colors"
                    aria-label="Close scan dialog"
                >
                    X
                </button>

                <div className="space-y-4">
                    <h1 className={`${titleSizeClasses} pr-10 text-left text-black font-family-jacques`}>
                        Scan Inbox
                    </h1>
                    <hr className="w-full border-t-2 border-black" />

                    <p className="text-black font-family-jacques leading-7 text-base sm:text-lg">
                        Search your inbox for potential job applications and refresh your tracker automatically.
                    </p>

                    <div className="rounded-lg border-2 border-black bg-white/70 p-3 text-sm sm:text-base text-black font-family-jacques">
                        This can take a few seconds depending on your inbox size.
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                        <button
                            onClick={runScan}
                            disabled={props.isScanning}
                            className="flex-1 rounded-lg bg-goldenSand px-4 py-3 border-black border-2 text-black font-family-jacques hover:bg-goldenSand/70 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {props.isScanning ? "Scanning..." : "Start Scan"}
                        </button>
                        <button
                            onClick={closeModal}
                            disabled={props.isScanning}
                            className="flex-1 rounded-lg bg-silver px-4 py-3 border-black border-2 text-black font-family-jacques hover:bg-silver/70 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

