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
    return <div className="flex flex-col w-[500px] h-[500px]">
        {rows && rows.map(row => (
            <WordleRow row={row} />
        ))}
    </div>
}
