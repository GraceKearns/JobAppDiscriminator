import Link from "next/link";
import Image from "next/image";

interface HomeCardProps {
    title: string,
    subText: string,
    navLink: string,
}

export default function HomeCard(props: HomeCardProps) {
    const { title, subText, navLink } = props;
    return (
        <Link href={navLink} className="group w-full">
            <div className="relative h-9/12 min-h-64 lg:min-h-64 border-2 border-black bg-goldenSand p-1 shadow-[8px_8px_0_0_#000] transition-transform duration-200 group-hover:-translate-y-1">
                <div className="flex h-full flex-col border-2 border-black bg-[#fff9e9] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="text-xl sm:text-3xl lg:text-5xl font-semibold text-black leading-tight">
                            {title}
                        </h1>
                        <div className="shrink-0 border-2 border-black bg-white p-2">
                            <Image
                                width={112}
                                height={112}
                                alt={`${title} icon`}
                                src={`/image/${title}.png`}
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                    </div>
                    <hr className="my-3 border-t-2 border-black" />
                    <p className="text-lg sm:text-xl lg:text-lg xl:text-2xl text-black/80 leading-6 line-clamp-4">
                        {subText}
                    </p>
                    <div className=" pt-4">
                        <button className="inline-flex h-10 w-40 cursor-pointer items-center justify-center border-2 border-black bg-white px-3 text-xs font-semibold text-black transition-colors group-hover:bg-[#f4ead8] sm:text-sm">
                            Open {title}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}