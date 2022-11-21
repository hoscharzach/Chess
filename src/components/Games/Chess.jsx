import React, { useEffect, useState } from "react"
import ChessCell from './ChessCell'
import { useDispatch, useSelector } from "react-redux"
import { getValidMoves } from "../../ChessHelperFuncs"
import { nanoid } from "nanoid"
import { useSocket } from "../../context/socket_context"

export default function Chess(props) {

    const selectOffColor = useSelector(state => state.chess.offColor)
    // const [color, setColor] = useState(null)

    const {
        currentTurn,
        currentRoom,
        offColor,
        socket,
        color,
        board
    } = useSocket()

    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)

    // assign white to first player that joins and black to second

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
                board,
                board[x][y],
                x,
                y
            )
            // console.log(mvs)
            mvs.forEach(mv => {
                const el = document.querySelector(`[data-num='${mv[0]}-${mv[mv.length - 1]}']`)
                el.dataset.move = "1"
            })
        }
    }, [selected])

    function handleClick(e) {
        setSelected(e.target)
    }

    return (

        // board container
        <div id="test" className="flex flex-col items-center justify-center gap-3">
            {/* board grid */}
            <div className="opacity-80 border grid grid-cols-chess-col grid-rows-chess-row">

                {/* for each row */}
                {board && board.map((board, i) => {
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
            <div className="flex flex-col items-center">
                {currentRoom && <div>Connected</div>}
                {color && <span>Currently {currentTurn === 'w' ? "white's" : "black's"} turn. ({color === currentTurn ? "You" : "Opponent"})</span>}
            </div>

        </div>
    )
}
