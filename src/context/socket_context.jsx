import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { defaultArray } from "../ChessHelperFuncs";

const SOCKET_URL = process.env.NODE_ENV === 'production' ?
    'https://games-chat-express-backend.onrender.com' :
    'http://localhost:3000'

const SocketContext = createContext()
// console.log(SOCKET_URL)
export default function SocketProvider(props) {

    const socket = io(SOCKET_URL)
    const offColor = defaultArray()
    const [board, setBoard] = useState(
        [
            ["br", "bk", "bb", "bq", "bK", "bb", "bk", "br"],
            ["bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy", "bpy"],
            ["0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0"],
            ["wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy", "wpy"],
            ["wr", "wk", "wb", "wq", "wK", "wb", "wk", "wr"]
        ]
    )
    const [game, setGame] = useState('')
    const [user, setUser] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [color, setColor] = useState(null)
    const [currentTurn, setCurrentTurn] = useState('w')
    const [gameStart, setGameStart] = useState(false)

    // determining player order
    socket.on("chessOrder", data => {
        if (data.user.id === user.id) {
            setColor(data.color)
        }
        setGameStart(data.gameStart)
    })

    socket.on("chessUpdate", data => {
        // console.log(data, "DATA INSIDE SOCKET ON CHESS UPDATE")
        const { piece, start, end, turn } = data

        // copy board for immutable state
        const copy = [...board]

        // get coords
        const endRow = end[0]
        const endCol = end[1]

        const startRow = start[0]
        const startCol = start[1]

        copy[endRow][endCol] = piece
        copy[startRow][startCol] = "0"
        // setCurrentTurn(turn)
        setBoard(copy)
        setCurrentTurn(turn)
    })

    // when receiving a chat
    socket.off("chat").on("chat", (data) => {
        setMessages(prev => [...prev, data])
    })

    // on initial render get user id and username
    useEffect(() => {
        let newId = nanoid()
        const id = localStorage.getItem('id')
        const username = localStorage.getItem('username')
        if (!id && !username) {
            localStorage.setItem('id', newId)
            setUser({ id: newId, username: null })
        } else if (id && !username) {
            setUser({ id, username: null })
        } else if (!id && username) {
            setUser({ id: newId, username })
        } else {
            setUser({ id, username })
        }
    }, [])

    function setUsername(newUsername) {
        setUser({ ...user, username: newUsername })
    }

    function chooseGame(type) {
        setGame(type)
    }

    function joinRoom(roomId) {
        setCurrentRoom(roomId)
        socket.emit("joinRoom", { roomId, user })
    }

    function movePiece(piece, start, end, turn) {
        // console.log(`Moving piece ${piece} from ${start} to ${end}`)
        socket.emit('chessUpdate', { piece, start, end, turn, currentRoom })
    }

    return (
        <SocketContext.Provider value={{
            socket,
            currentRoom,
            joinRoom,
            user,
            setUsername,
            game,
            chooseGame,
            messages,
            color,
            currentTurn,
            movePiece,
            offColor,
            board,
            gameStart
        }}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
