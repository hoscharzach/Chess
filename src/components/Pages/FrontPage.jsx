import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/socket_context";
import GameContainer from "../GameContainer";
import Header from "../Header";
import MainPageContainer from "../MainPageContainer";
import { buttonStyles } from "../styles";
import { redirect } from "react-router-dom";

export default function FrontPage() {

    const navigate = useNavigate()
    // const { game, roomId } = useParams()
    const { game, chooseGame } = useSocket()

    return (
        <MainPageContainer>

            {/* Header where user can change username */}
            <Header />

            {/* Select a game text */}
            <div className=' text-4xl font-bold mt-3'>
                <span className="text-white">Select a </span>
                <span className='text-blue-500'>game</span>
            </div>

            {/* Select game buttons */}
            <div className="flex gap-3">
                <button className={buttonStyles} onClick={() => {
                    chooseGame('Chess')
                    navigate('/Chess')
                }}>Chess</button>
                <button className={buttonStyles} onClick={() => {
                    chooseGame('Tic-tac-toe')
                    navigate('/Tic-tac-toe')
                }}>Tic-Tac-Toe</button>
                <button className={buttonStyles} onClick={() => {
                    chooseGame('Wordle')
                    navigate('/Wordle')
                }}>Wordle</button>
            </div>

        </MainPageContainer>
    )
}
