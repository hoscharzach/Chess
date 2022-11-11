import { useEffect, useState } from "react"
// import ChessGame from './ChessClass'
import ChessCell from './ChessCell'
import { useDispatch, useSelector } from "react-redux"
import { movePawn, reset } from "./chessSlice"
import { getValidMoves } from "../../ChessHelperFuncs"
import { nanoid } from "nanoid"

export default function Chess() {
    const selectBoard = useSelector(state => state.chess.board)
    const selectOffColor = useSelector(state => state.chess.offColor)
    // console.log(selectOffColor, "SELECT OFF COLOR")

    const dispatch = useDispatch()
    // intiialize empty board
    const [currentGame, setCurrentGame] = useState('')
    const [displayBoard, setDisplayBoard] = useState([])
    const [selected, setSelected] = useState(null)
    const [moves, setMoves] = useState([])


    useEffect(() => {
        //  remove all active move highlights
        const mvs = document.querySelectorAll(`[data-move="1"]`)
        mvs.forEach(mv => mv.dataset.move = "0")

        // replace them with whatever is selected
        if (selected) {
            const mvs = getValidMoves(selectBoard, selected.dataset.piece, selected.dataset.num)
            console.log(mvs)
            mvs.forEach(mv => {
                const el = document.querySelector(`[data-num='${mv}']`)
                el.dataset.move = "1"
            })
        }

    }, [selected])

    // console.log(selectBoard, "SELECT BOARD")
    return (

        // board container
        <div id="test" className="flex flex-col items-center justify-center gap-3">

            {/* board grid */}
            <div className="opacity-80 border grid grid-cols-chess-col grid-rows-chess-row">
                {selectBoard && selectBoard.map((board, i) => {
                    return (
                        <>
                            {board && board.map((piece, j) => {
                                // { console.log(selectOffColor[i][j]) }
                                return (
                                    <ChessCell id={`${i}-${j}`} cell={[i, j]} selected={selected} setSelected={setSelected} piece={piece} offColor={selectOffColor[i][j] === 1} num={`${i}-${j}`} key={nanoid()} />
                                )
                            })}
                        </>
                    )
                })}
            </div>
            <button onClick={() => dispatch(reset())} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start New Game</button>
            <button onClick={() => dispatch(movePawn())} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Move pawn</button>
        </div>
    )
}
