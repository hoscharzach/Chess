import Header from "../Header";
import MainPageContainer from "../MainPageContainer";
import CreateInvite from "../CreateInvite";
import { buttonStyles } from "../styles";
import { useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socket_context";
import { nanoid } from "nanoid";
import ContentPaste from "@mui/icons-material/ContentPaste";

export default function GameInvite() {

    let navigate = useNavigate()

    const { game, joinRoom, createRoom } = useSocket()

    const [roomCode, setRoomCode] = useState('')
    const [joinRoomDisplay, setJoinRoomDisplay] = useState(false)
    const [inputRoomCode, setInputRoomCode] = useState('')

    function generateRoomCode() {
        setJoinRoomDisplay(false)
        const roomId = nanoid()
        setRoomCode(roomId)
        createRoom(roomId)
    }

    function handleCopyPaste(e) {
        e.target.select()
        navigator.clipboard.writeText(e.target.value)
    }

    function handleCopyPasteIcon() {
        const input = document.getElementById('room-code')
        input.select()
        navigator.clipboard.writeText(roomCode)
    }

    function onJoinRoomSubmit(e) {
        e.preventDefault()
        joinRoom(inputRoomCode)
        console.log(`joining room ${inputRoomCode}`)
    }

    function onClickJoinbyRoom() {
        setRoomCode('')
        setJoinRoomDisplay(true)
    }
    return (
        <MainPageContainer>
            <Header />
            <div className="flex flex-col items-center justify-center gap-5">

                {/* Back/Generate Room Code/Join Room by Code buttons container */}
                <div className="flex gap-3">

                    <button
                        onClick={() => navigate('/')}
                        className={buttonStyles}>
                        Back
                    </button>

                    <button
                        onClick={generateRoomCode}
                        className={buttonStyles}>
                        Generate {game} Room Code
                    </button>

                    <button
                        className={buttonStyles}
                        onClick={onClickJoinbyRoom}>
                        Join Room By Code
                    </button>

                </div>

                {roomCode &&

                    // RoomCode ReadOnlyInput
                    <div className="flex gap-2">
                        <input
                            id="room-code"
                            value={roomCode}
                            onClick={handleCopyPaste}
                            type="text"
                            readOnly
                            className="bg-white text-black px-2 py-1 rounded-md">
                        </input>

                        {/* Copy paste icon */}
                        <button
                            className="flex justify-center items-center"
                            onClick={handleCopyPasteIcon}>
                            <ContentPaste
                                className="active:scale-90"
                            />
                        </button>
                    </div>
                }

                {joinRoomDisplay &&
                    <form
                        className="flex gap-2"
                        onSubmit={onJoinRoomSubmit}>

                        <input
                            className="bg-white text-black px-2 py-1 rounded-md"
                            value={inputRoomCode}
                            onChange={(e) => setInputRoomCode(e.target.value)}
                        />

                        <button type="submit" className={buttonStyles}>Join Room</button>
                    </form>
                }
            </div>
        </MainPageContainer>
    )
}
