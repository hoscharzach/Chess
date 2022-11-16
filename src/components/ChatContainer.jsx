import { useContext, useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
// import Participants from './Participants'
import { io } from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useSelector } from 'react-redux'
import { useSocket } from '../context/socket_context'


export default function ChatContainer(props) {

    const messagesContainer = useRef(null)
    const chatInput = useRef(null)
    const roomNameRef = useRef()
    // const conn = useSelector(state => state.auth.conn)
    const userId = useSelector(state => state.auth.user)
    const username = useSelector(state => state.auth.username)
    // const messages = useSelector(state => state.auth.messages)
    const [messages, setMessages] = useState([])
    const { socket, createRoom, rooms } = useSocket()

    // console.log(socket)
    // console.log(socket.id)
    useEffect(() => {
        scrollToBottom()
    }, [messages])


    function sendUpdate(e) {
        e.preventDefault()
        const message = {
            message: chatInput.current.value,
            username,
            userId
        }
        // socket.emit("update item", "1", { name: "updated" }, (response) => {
        //     console.log(response.status); // ok
        // });
        socket.emit('messageAll', message)
        chatInput.current.value = ""

    }

    async function sendChat(e) {
        e.preventDefault()
        if (chatSocket.current !== null) {
            const message = {
                message: chatInput.current.value,
                userId,
                username
            }
            // console.log(chatSocket.current)
            // chatSocket.current.emit('message', message)
            chatInput.current.value = ""
        }
        // if (!chatInput.current) return
        // if (chatInput.current.value === "") return

        // // console.log(chatInput.current.value)
        // // await fetch("/api/sendMessage", {
        // //     method: "POST",
        // //     headers: { "Content-Type": "application/json" },
        // //     body: JSON.stringify({ author: ably.auth.clientId, message: chatInput.current.value })
        // // })
        // conn.send(JSON.stringify({
        //     message: chatInput.current.value,
        //     userId,
        //     username,
        // }))
        // chatInput.current.value = ""
    }
    // console.log(messagesContainer.current)
    function scrollToBottom() {
        if (messagesContainer.current && messagesContainer.current.children.length > 0) {
            const children = Array.from(messagesContainer.current.children)
            children[children.length - 1].scrollIntoView()
        }
    }
    // console.log(chatSocket.current)
    return (
        <div hidden={props.hidden} className="h-[482px] w-[482px] border border-slate-500 rounded-lg ml-4 flex flex-col">

            {/* Top of chat bar */}
            <div className=" flex justify-center w-full items-center border-b border-slate-500 p-4 h-16">
                <div className="text-3xl flex">Chat</div>
            </div>

            {/* users and chat messages */}
            <div className="w-full flex my-2 gap-1 p-4 min-h-[300px] h-full">
                {/* <div className="flex flex-col w-3/12 border-r border-slate-500">
                    {rooms.length > 0 && rooms.map(room => (
                        <div key={room.roomId}>{room.name}</div>
                    ))}
                </div> */}
                <div ref={messagesContainer} className="flex flex-col w-full gap-2 p-4 max-h-[400px] overflow-y-auto bg-opacity-40 rounded-lg">
                    {messages.length > 0 && messages.map(msg => (
                        <ChatMessage key={nanoid()} message={msg} />
                    ))}
                </div>
            </div>

            {/* chat input and send button */}
            <div className='w-full flex items-center justify-center p-4 border-t border-slate-500 h-16'>

                {/* send message form */}
                <form className='w-full flex justify-center gap-4' onSubmit={sendUpdate}>
                    <input ref={chatInput} type="text" className='w-full h-8 p-2 rounded-sm'></input>
                    <button className='p-1 px-3 rounded-lg border border-gray-400  enabled:hover:border enabled:hover:border-blue-500' type='submit'>Send</button>
                </form>
            </div>

        </div>
    )
}
