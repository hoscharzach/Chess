import React, { useEffect, useState } from "react"
// import ChessGame from './ChessClass'
import ChessCell from './ChessCell'
import { useDispatch, useSelector } from "react-redux"
import { movePawn, reset, setBlackPlayer, setWhitePlayer } from "./chessSlice"
import { getValidMoves } from "../../ChessHelperFuncs"
import { nanoid } from "nanoid"
import { setUser } from "../../authSlice"

export default function Chess() {
    const selectBoard = useSelector(state => state.chess.board)
    const selectOffColor = useSelector(state => state.chess.offColor)
    const whitePlayer = useSelector(state => state.chess.whitePlayer)
    const blackPlayer = useSelector(state => state.chess.blackPlayer)
    const sessionUser = useSelector(state => state.auth.user)

    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)

    const buttonStyles = "block disabled:opacity-80 text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800"

    // whenever selected changes
    useEffect(() => {
        //  remove all active move highlights every time selected is changed
        const mvs = document.querySelectorAll(`[data-move="1"]`)
        mvs.forEach(mv => mv.dataset.move = "0")

        // replace them with whatever is selected
        if (selected) {
            const x = Number(selected[0])
            const y = Number(selected[selected.length - 1])
            const mvs = getValidMoves(
                selectBoard,
                selectBoard[x][y],
                x,
                y
            )
            // console.log(mvs)
            mvs.forEach(mv => {
                const el = document.querySelector(`[data-num='${mv[0]}-${mv[mv.length - 1]}']`)
                el.dataset.move = "1"
            })
        }
        // console.log(selected.dataset)
    }, [selected])

    function handleClick(e) {
        setSelected(e.target)
    }

    // useEffect(() => {
    //     console.log("i'm rerendering")
    // })
    return (

        // board container
        <div id="test" className="flex flex-col items-center justify-center gap-3">

            {/* board grid */}
            <div className="opacity-80 border grid grid-cols-chess-col grid-rows-chess-row">

                {/* for each row */}
                {selectBoard && selectBoard.map((board, i) => {
                    return (
                        <React.Fragment key={nanoid()}>

                            {/* each tile in the row */}
                            {board && board.map((piece, j) => {
                                return (
                                    <ChessCell
                                        id={`${i}-${j}`}
                                        cell={[i, j]}
                                        selected={selected}
                                        setSelected={setSelected}
                                        piece={piece}
                                        offColor={selectOffColor[i][j] === 1}
                                        num={`${i}-${j}`}
                                        key={nanoid()}
                                        onClick={handleClick} />

                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </div>
            <button onClick={() => dispatch(reset())} className={buttonStyles}>Start New Game</button>
            <button disabled={blackPlayer} onClick={() => dispatch(setBlackPlayer(sessionUser))} className={buttonStyles}>Choose black</button>
            <button disabled={whitePlayer} onClick={() => dispatch(setWhitePlayer(sessionUser))} className={buttonStyles}>Choose white</button>
            <button onClick={() => console.log(whitePlayer, blackPlayer)} className={buttonStyles}>Print players</button>

        </div>
    )
}
