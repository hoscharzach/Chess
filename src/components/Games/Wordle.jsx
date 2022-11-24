import { useEffect, useState } from "react"
import WordleRow from "./WordleRow"

export default function Wordle() {


    const [rows, setRows] = useState('')

    function makeDefaultRows() {
        let defaultLayout = []
        for (let i = 0; i < 5; i++) {
            const newRow = Array(5).fill("hello")
            defaultLayout.push(newRow)
        }

        setRows(defaultLayout)
    }

    useEffect(() => {
        makeDefaultRows()
    }, [])

    console.log(rows)
    return <div className="grid grid-cols-5 gap-2 w-[500px] h-[500px]">
        {rows && rows.map((row, i) => (
            <WordleRow key={i} row={row} />
        ))}
    </div>
}
