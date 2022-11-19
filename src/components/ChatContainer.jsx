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
    // const [messages, setMessages] = useState([])
    const { messages, socket, user, currentRoom } = useSocket()

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    function sendMessage(e) {

        e.preventDefault()

        if (chatInput.current && chatInput.current.value.trim().length === 0) return

        const message = {
            userId: user.id,
            username: user.username,
            message: chatInput.current.value
        }

        socket.emit("send chat", message, currentRoom, (response) => {
            console.log(response, "RESPONSE FROM SEND CHAT")
        })

        chatInput.current.value = ""
    }

    function scrollToBottom() {
        if (messagesContainer.current && messagesContainer.current.children.length > 0) {
            const children = Array.from(messagesContainer.current.children)
            children[children.length - 1].scrollIntoView()
        }
    }
    console.log(messages)
    return (
        <div hidden={props.hidden} className="h-[500px] w-[600px] border border-slate-500 rounded-lg ml-4 flex flex-col">

            {/* Top of chat bar */}
            <div className=" flex justify-center w-full items-center border-b border-slate-500 p-4 h-16">
                <div className="text-3xl flex">Chat</div>
            </div>

            {/* Chat messages */}
            <div className="w-full flex my-2 gap-1 p-4 min-h-[300px] h-full">
                <div ref={messagesContainer} className="flex flex-col w-full gap-2 p-4 max-h-[400px] overflow-y-auto bg-opacity-40 rounded-lg">
                    {messages.length > 0 && messages.map(msg => (
                        <ChatMessage key={nanoid()} message={msg} />
                    ))}
                </div>
            </div>

            {/* chat input and send button */}
            <div className='w-full flex items-center justify-center p-4 border-t border-slate-500 h-16'>

                {/* send message form */}
                <form className='w-full flex justify-center gap-4' onSubmit={sendMessage}>
                    <input ref={chatInput} type="text" className='w-full h-8 p-2 rounded-sm'></input>
                    <button className='p-1 px-3 rounded-lg border border-gray-400  enabled:hover:border enabled:hover:border-blue-500' type='submit'>Send</button>
                </form>
            </div>

        </div>
    )
}
