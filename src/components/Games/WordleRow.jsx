export default function WordleRow({ row }) {
    console.log(row, "WORDLE ROW")
    return (
        <>
            {row.map(cell => (
                <div className="w-full h-full border border-slate-500"></div>
                // <div className="w-[50px] h-[50px] text-white border">{cell}</div>
            ))}
        </>
    )
}
