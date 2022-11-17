import Header from "../Header";
import MainPageContainer from "../MainPageContainer";
import CreateInvite from "../CreateInvite";
import { buttonStyles } from "../styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GameInvite() {
    let navigate = useNavigate()
    return (
        <MainPageContainer>
            <Header />
            <div className="flex gap-3">

                <button onClick={() => navigate('/')} className={buttonStyles}>Back</button>
                <CreateInvite />
            </div>
        </MainPageContainer>
    )
}
