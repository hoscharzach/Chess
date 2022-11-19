import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000'

const SocketContext = createContext()

const socket = io(SOCKET_URL)

export default function SocketProvider(props) {

    const [game, setGame] = useState('')
    const [user, setUser] = useState(null)
    const [rooms, setRooms] = useState({})
    const [currentRoom, setCurrentRoom] = useState(null)
    const [messages, setMessages] = useState([])

    socket.off("chat").on("chat", (response) => {
        console.log(response, "RESPONSE FROM SEND CHAT")
        setMessages(prev => [...prev, response])
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

    function createRoom(roomId) {
        socket.emit("create room", roomId, user, (response) => {
            setCurrentRoom(response.roomId)
            // console.log(response, "RESPONSE FROM CREATE ROOM")
        })
    }

    function joinRoom(roomId) {
        // set this room to currentRoom

        // join room - if it doesn't exist, give error because this
        // was supposed to be a room with someone in it
        socket.emit("join room", roomId, user, (response) => {
            if (response.ok) {
                console.log(response)
                setCurrentRoom(roomId)
            }
            else {
                window.alert("Something went wrong")
            }
        })
    }

    // useEffect(() => {
    //     return () => socket.emit('leave room', currentRoom, user)
    // }, [])

    return (
        <SocketContext.Provider value={{
            socket,
            currentRoom,
            joinRoom,
            createRoom,
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
