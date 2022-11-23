import TicTacToe from "./Games/TicTacToe"
import Chess from './Games/Chess'
import Wordle from "./Games/Wordle"

export default function GameContainer(props) {

    switch (props.game) {

        case 'Battleship':
            return <div>Battleship</div>

        case 'Tic-tac-toe':
            return <TicTacToe />

        case 'Chess':
            return <Chess />

        case 'Wordle':
            return <Wordle />

        default:
            return (
                null
            )
    }
}
