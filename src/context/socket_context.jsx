import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000'

const SocketContext = createContext()

export default function SocketProvider(props) {

    const user = useSelector(state => state.auth.user)
    const username = useSelector(state => state.auth.username)
    const socket = io(SOCKET_URL)
    const [rooms, setRooms] = useState({})
    const [currentRoom, setCurrentRoom] = useState(null)

    function createRoom() {
        socket.emit("create room", { userId: user, username }, response => {
            console.log(response.roomId, "RESPONSE.ROOMID")
            setCurrentRoom(response.roomId)
        })
    }

    function joinRoom(roomId) {
        const a = { userId: user, username }
        socket.emit("join room", (roomId, a), response => {
            console.log('response in join room function')
            setCurrentRoom(response.roomId)
        })
    }


    return (
        <SocketContext.Provider value={{ socket, createRoom, currentRoom, joinRoom, setCurrentRoom, rooms }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
