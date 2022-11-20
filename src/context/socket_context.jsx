import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000'

const SocketContext = createContext()

export default function SocketProvider(props) {

    const socket = io(SOCKET_URL)
    const [game, setGame] = useState('')
    const [user, setUser] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [color, setColor] = useState(null)
    const [currentTurn, setCurrentTurn] = useState('white')

    console.log(color)
    // determining player order
    socket.on("chessOrder", data => {
        if (data.user.id === user.id) {
            setColor(data.color)
        }
    })

    socket.on("chessUpdate", data => {

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
            currentTurn
        }}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
