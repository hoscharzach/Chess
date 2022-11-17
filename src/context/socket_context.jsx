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
        } else {
            setUser({ id, username })
        }
        console.log("use effect auth running")
    }, [])

    function setUsername(newUsername) {
        setUser({ ...user, username: newUsername })
    }

    function chooseGame(type) {
        console.log(type, "hitting function in context")
        setGame(type)
        // console.log(location)
    }

    function createRoom() {
        socket.emit("create room", user, response => {
            console.log(response.roomId, "RESPONSE.ROOMID")
            setCurrentRoom(response.roomId)
        })
    }

    function joinRoom(roomId) {
        socket.emit("join room", roomId, user, (response) => {
            console.log('response in join room function')
            setCurrentRoom(response.roomId)
        })
    }

    // useEffect(() => {
    //     return () => socket.emit('leave room', currentRoom, user)
    // }, [])

    return (
        <SocketContext.Provider value={{
            socket,
            createRoom,
            currentRoom,
            joinRoom,
            setCurrentRoom,
            rooms,
            user,
            setUsername,
            game,
            chooseGame
        }}
        >
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
