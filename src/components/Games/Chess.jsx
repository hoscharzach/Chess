import { useEffect, useState } from "react"
import ChessGame from './ChessClass'
import ChessCell from './ChessCell'
import { useDispatch, useSelector } from "react-redux"
import { movePawn, reset } from "./chessSlice"

export default function Chess() {
    const selectBoard = useSelector(state => state.chess.board)

    const dispatch = useDispatch()
    // intiialize empty board
    const [currentGame, setCurrentGame] = useState('')
    const [displayBoard, setDisplayBoard] = useState([])

    function onSelect(e) {
        if (e.target.dataset.piece === "0") return
        const el = document.querySelector("[data-selected='1']")
        // console.log(el === e.target)
        if (el) {
            if (e.target === el) {
                el.dataset.selected = "0"
                return
            } else {
                el.dataset.selected = "0"
            }
        }

        e.target.dataset.selected = "1"
        const moves = currentGame.validMoves(e.target.dataset.piece, e.target.dataset.num)
        console.log("PIECE AND NUM", moves)
        moves.forEach(el => {
            const changeBg = document.querySelector(`[data-num="${el}"]`)
            changeBg.style.backgroundColor = 'red'
        })

    }

    // function for restting game/ starting new game
    // function makeNewGame() {
    //     // clear board
    //     setDisplayBoard([])

    //     // make new instance of chess game
    //     const game = new ChessGame()

    //     // put class instance into state
    //     setCurrentGame(game)

    // }

    // function populateBoard() {
    //     let array = []
    //     let offset = 0
    //     // every 8 squares, skip one to have alternating tiles
    //     for (let i = 0; i < 64; i++) {
    //         if (i % 8 === 0) offset++
    //         // initialize board with default pieces as found in new game class
    //         // console.log(i, currentGame.board[i])
    //         array.push()

    //     }
    //     // setBoard to the finished array
    //     setDisplayBoard(array)
    // }

    // whenever board changes, update state
    // console.log(currentGame)

    // runs once on load and if there isn't already a game, then create one
    // useEffect(() => {
    //     if (!currentGame) {
    //         makeNewGame()
    //     }
    // }, [])


    return (

        // board container
        <div id="test" className="flex flex-col items-center justify-center gap-3">

            {/* board grid */}
            <div className="opacity-80 border grid grid-cols-chess-col grid-rows-chess-row">
                {selectBoard && selectBoard.map((piece, i) => (
                    <ChessCell piece={piece} offColor={i % 2 === 0} num={i} key={i} />
                ))}
            </div>
            <button onClick={() => dispatch(reset())} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start New Game</button>
            <button onClick={() => dispatch(movePawn())} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Move pawn</button>
        </div>
    )
}
