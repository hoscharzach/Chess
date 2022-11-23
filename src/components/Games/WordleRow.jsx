export default function WordleRow({ row }) {

    return (
        <>
            {row.forEach(cell => (
                <div className="bg-white w-[50px] h-[50px]"></div>
                // <div className="w-[50px] h-[50px] text-white border">{cell}</div>
            ))}
        </>
    )
}
