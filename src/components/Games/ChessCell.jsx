// import bb from '../../assets/bb.svg'
// import bK from '../../assets/bK.svg'
// import bk from '../../assets/bk.svg'
// import br from '../../assets/br.svg'
// import bq from '../../assets/bq.svg'
// import bp from '../../assets/bp.svg'
// import wb from '../../assets/wb.svg'
// import wK from '../../assets/wK.svg'
// import wk from '../../assets/wk.svg'
// import wr from '../../assets/wr.svg'
// import wq from '../../assets/wq.svg'
// import wp from '../../assets/wp.svg'
import { getValidMoves } from '../../ChessHelperFuncs'
import blank from '../../assets/blank.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { changeTurns, movePiece, updateKingPosition } from './chessSlice'
import { useSocket } from '../../context/socket_context'


// map images to object for dynamic access based on data-piece attribute
// const imageMap = { bk, bK, br, bb, bq, bp, wb, wK, wk, wr, wq, wp, wpy: wp, bpy: bp, "0": blank }

export default function ChessCell(props) {

    const piece = useSelector(state => state.chess.board[props.cell[0]][props.cell[1]])
    const board = useSelector(state => state.chess.board)
    const { selected, setSelected } = props

    const { currentTurn, color } = useSocket()

    function handleClick(e) {
        if (currentTurn !== color) return
        // if data-move is "1", then a piece is selected and this is a valid move
        if (e.target.dataset.move === "1") {

            // move the piece with start and end locations
            const start = [Number(selected[0]), Number(selected[selected.length - 1])]
            const piece = board[start[0]][start[1]]
            const end = [Number(e.target.dataset.num[0]), Number(e.target.dataset.num[e.target.dataset.num.length - 1])]
            // dispatch(movePiece({ start, end }))
            const copyBoard = JSON.parse(JSON.stringify(board))

            copyBoard[end[0]][end[1]] = piece
                (copyBoard)
            copyBoard[start[0]][start[1]] = "0"
            conn.send(JSON.stringify(
                {
                    chessGameState: {
                        board: copyBoard,
                        turn: currentTurn === 'w' ? 'b' : 'w',
                        playerB: blackPlayer,
                        playerW: whitePlayer
                    }
                }))

            setSelected(null)


            // if it isn't a valid move, then just remove selection
        } else if (e.target.dataset.piece === "0") {
            setSelected(null)
        } else {
            // only set selected if first letter of piece matches current turn
            const x = e.target.dataset.num[0]
            const y = e.target.dataset.num[e.target.dataset.num.length - 1]

            // get piece and its first letter, check if's equal to current turn
            if (board[x][y][0] === currentTurn) {
                // if it is, then select it and show available moves
                // otherwise do nothing on click
                setSelected(e.target.dataset.num)
            } else return

        }

    }

    const cellStyle = props.offColor ? "border bg-blue-400 w-full h-full flex justify-center items-center" : "border bg-white w-full h-full flex justify-center text-black  items-center"
    return (
        <>
            {piece &&
                <div
                    data-move="0"
                    data-num={`${props.num}`}
                    className={cellStyle}
                    data-selected={props.num === selected ? "1" : "0"}
                    data-piece={piece}
                    onClick={handleClick} />
            }
        </>

    )
}
