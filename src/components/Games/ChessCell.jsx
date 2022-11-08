import bb from '../../assets/bbishop.svg'
import bK from '../../assets/bking.svg'
import bk from '../../assets/bknight.svg'
import br from '../../assets/brook.svg'
import bq from '../../assets/bqueen.svg'
import bp from '../../assets/bpawn.svg'
import wb from '../../assets/wbishop.svg'
import wK from '../../assets/wking.svg'
import wk from '../../assets/wknight.svg'
import wr from '../../assets/wrook.svg'
import wq from '../../assets/wqueen.svg'
import wp from '../../assets/wpawn.svg'
import { useSelector } from 'react-redux'


export default function ChessCell(props) {

    const piece = useSelector(state => state.chess.board[props.num])

    let icon
    // black pieces rendering
    switch (props.piece) {
        case 'bb':
            icon = bb
            break
        case 'bk':
            icon = bk
            break
        case 'bK':
            icon = bK
            break
        case 'br':
            icon = br
            break
        case 'bq':
            icon = bq
            break
        case 'bpy':
            icon = bp
            break
        case 'bp':
            icon = bp
            break

    }

    //white pieces rendering
    switch (props.piece) {
        case 'wb':
            icon = wb
            break
        case 'wk':
            icon = wk
            break
        case 'wK':
            icon = wK
            break
        case 'wr':
            icon = wr
            break
        case 'wq':
            icon = wq
            break
        case 'wpy':
            icon = wp
            break
        case 'wp':
            icon = wp
            break

    }

    const cellStyle = props.offColor ? "border bg-blue-400 w-full h-full flex justify-center items-center" : "border bg-white w-full h-full flex justify-center text-black  items-center"
    return (
        <>
            {piece &&
                <div
                    data-piece={piece}
                    data-num={`${props.num}`}
                    className={cellStyle}
                    data-selected="0"
                >
                    {icon ? <img className='w-full h-full object-fill' src={icon}></img> : <div></div>}
                </div>
            }
        </>

    )
}
