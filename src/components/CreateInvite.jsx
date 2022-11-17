import { useParams } from "react-router-dom"
import { useSocket } from "../context/socket_context"
import { buttonStyles } from "./styles"
import { nanoid } from "nanoid"

export default function CreateInvite() {

    const { createRoom } = useSocket()
    const { game } = useParams()

    function generateLink() {

    }

    return (
        <button onClick={generateLink} className={buttonStyles}>Generate Multiplayer {game} Link</button>
    )
}
