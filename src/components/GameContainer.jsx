import TicTacToe from "./Games/TicTacToe"
import Chess from './Games/Chess'

export default function GameContainer(props) {

    switch (props.game) {
        case 'Battleship':
            return (
                <div>Battleship</div>
            )
        case 'Tic-tac-toe':
            return (
                // <div>test</div>
                <TicTacToe />
            )
        case 'Chess':
            return (
                <Chess />
            )
        default:
            return (
                null
            )
    }
}
