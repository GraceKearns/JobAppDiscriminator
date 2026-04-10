interface StatBasicCardProps {
    stat: number | string,
    bgColor:string,
    cardTitle:string,
}
export default function statBasicCard(props: StatBasicCardProps) {
    return (
        <div className={`border-2 border-black ${props.bgColor} p-1 shadow-[8px_8px_0_0_#000]`}>
            <div className="border-2 flex flex-col justify-between border-black bg-[#fff7e7] h-full p-5">
                <h3 className="text-lg font-family-jacques font-semibold text-black/80 uppercase tracking-[0.08em]">{props.cardTitle}</h3>
                <p className="mt-2 text-4xl font-bold font-family-jacques text-black">{props.stat}</p>
            </div>
        </div>
    )
}