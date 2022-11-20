import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SOCKET_URL = 'https://games-chat-express-backend.onrender.com/'

const SocketContext = createContext()
const socket = io(SOCKET_URL)

export default function SocketProvider(props) {

    const [game, setGame] = useState('')
    const [user, setUser] = useState(null)
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([])


    // when receiving a chat
    socket.off("chat").on("chat", (data) => {
        console.log(data)
        // console.log(response, "RESPONSE FROM SEND CHAT")
        setMessages(prev => [...prev, data])
    })

    socket.on("joinRoom", () => console.log("successfully joined room"))

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

    // useEffect(() => {
    //     return () => socket.emit('leave room', currentRoom, user)
    // }, [])

    return (
        <SocketContext.Provider value={{
            socket,
            currentRoom,
            joinRoom,
            user,
            setUsername,
            game,
            chooseGame,
            messages
        }}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
