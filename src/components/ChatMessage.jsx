import { useSocket } from "../context/socket_context"

export default function ChatMessage(props) {

    const { user } = useSocket()
    const mine = props.message.userId === user.id

    let innerContent = (
        <>
            <span className="text-sm text-blue-200">{props.message.username}</span>
            <span id='test-wrap' className="text-sm w-full break-words overflow-x-auto">{props.message.message}</span>
        </>
    )
    console.log(props.message)
    switch (mine) {
        // if post is mine, align message to right and make color lighter
        case true:
            return (
                <div className='flex flex-col items-end '>
                    <div className="w-fit bg-slate-600 rounded-lg p-2 px-6 flex flex-col items-end">
                        {innerContent}
                    </div>
                </div>)

        // otherwise align it to left
        case false:
            return (
                <div className="w-fit bg-slate-800 rounded-lg p-2 flex flex-col px-6">
                    {innerContent}
                </div>)
        default:
            return (
                null
            )
    }

}
