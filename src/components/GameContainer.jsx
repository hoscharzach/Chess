import TicTacToe from "./Games/TicTacToe"
import Chess from './Games/Chess'

export default function GameContainer(props) {

    switch (props.game) {
        case 'battleship':
            return (
                <div>Battleship</div>
            )
        case 'tic-tac-toe':
            return (
                // <div>test</div>
                <TicTacToe />
            )
        case 'chess':
            return (
                <Chess />
            )
        default:
            return (
                null
            )
    }
}
