"use client";

interface PageTitleProps {
    title: string;

}
export default function PageTitle(props: PageTitleProps) {
    return (
        <div className="flex flex-col items-center border-b-2 border-[#2c1f18] bg-[#3a2a20] px-4 py-4 shadow-[0_8px_0_0_#2c1f18] sm:px-6 sm:py-5">
            <div className="w-full max-w-7xl">
                <div className="border-2 border-[#2c1f18] bg-[#4b382d] p-1 shadow-[6px_6px_0_0_#2c1f18]">
                    <div className="border-2 border-[#2c1f18] bg-[linear-gradient(135deg,#f8e8b0,#e8cf86_55%,#d8b96f)] px-4 py-4 sm:px-6 sm:py-5">
                        
                        <h1 className="mt-1 font-bold text-[#1f1510] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-left">
                            {props.title}
                        </h1>
                        <hr className="mt-2 border-t-2 border-[#6b4f2b]/55" />
                        <p className="text-xs mt-2 sm:text-sm uppercase tracking-[0.2em] text-[#4b382d] font-semibold">
                            Dashboard
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}