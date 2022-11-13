import React, { useEffect, useMemo, useRef, useState } from "react"
// import ChessGame from './ChessClass'
import ChessCell from './ChessCell'
import { useDispatch, useSelector } from "react-redux"
import { movePawn, reset, setBlackPlayer, setWhitePlayer, updateGameState } from "./chessSlice"
import { getValidMoves } from "../../ChessHelperFuncs"
import { nanoid } from "nanoid"
import { setConn, addMessage, setUser } from "../../authSlice"

export default function Chess(props) {
    const selectBoard = useSelector(state => state.chess.board)
    const selectOffColor = useSelector(state => state.chess.offColor)
    const whitePlayer = useSelector(state => state.chess.whitePlayer)
    const blackPlayer = useSelector(state => state.chess.blackPlayer)
    const sessionUser = useSelector(state => state.auth.user)
    const currentTurn = useSelector(state => state.chess.currentTurn)
    const conn = useSelector(state => state.auth.conn)
    const username = useSelector(state => state.auth.username)

    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const [status, setStatus] = useState('Not connected')
    const [localConn, setLocalConn] = useState(null)

    // let connection = useRef(null)
    const buttonStyles = "block disabled:opacity-80 text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-4 enabled:focus:outline-none enabled:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800"


    // useEffect(() => {
    //     if (status === 'Connected') {
    //         dispatch(setConn(localConn))
    //     }
    // }, [status])
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
    }, [selected])

    function handleClick(e) {
        setSelected(e.target)
    }

    function handleMessages(e) {
        const data = JSON.parse(e.data)

        // if data is gamestate, use it to update gamestate
        if (data.chessGameState) {
            dispatch(updateGameState({ game: data.chessGameState }))
        } else if (data.chat) {
            dispatch(addMessage(data.chat))
        }
    }

    function connectToWebsocket() {
        const ws = new WebSocket('wss://golang-test.onrender.com/ws/2')
        setStatus('Connecting...Please wait')
        ws.onopen = () => {
            setStatus('Connected')
            ws.send(JSON.stringify({ chat: `${username} has joined the chat.` }))

        }
        ws.onclose = (e) => {
            console.log("Connection closed")
            setStatus('Connection closed')
        }
        ws.onmessage = handleMessages

        dispatch(setConn(ws))
    }
    // console.log(localConn)
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
            <div>{status}</div>
            <div className="flex gap-2 mb-2">

                <button onClick={() => dispatch(reset())} className={buttonStyles}>Start New Game</button>
                {/* <button disabled={blackPlayer} onClick={() => dispatch(setBlackPlayer(sessionUser))} className={buttonStyles}>Choose black</button>
            <button disabled={whitePlayer} onClick={() => dispatch(setWhitePlayer(sessionUser))} className={buttonStyles}>Choose white</button>
        <button onClick={() => console.log(whitePlayer, blackPlayer)} className={buttonStyles}>Print players</button> */}


                <button onClick={connectToWebsocket} className={buttonStyles}>Connect to game</button>

                <button onClick={() => {
                    console.log('sent state')
                }} className={buttonStyles}>Send Game State</button>
            </div>

        </div>
    )
}
