import { useParams } from "react-router-dom"
import { useSocket } from "../context/socket_context"
import { buttonStyles } from "./styles"
import { nanoid } from "nanoid"
import { useState } from "react"

export default function CreateInvite() {

    const { createRoom } = useSocket()
    const { game } = useParams()
    const [gameInviteLink, setGameInviteLink] = useState('')

    function generateLink() {

    }

    return (
        <>
            <div className="flex flex-col">

                <div className="flex">


                    <div className="bg-white text-black">Hello</div>
                </div>
            </div>
        </>
    )
}
