// import bb from '../../assets/bb.svg'
// import bK from '../../assets/bK.svg'
// import bk from '../../assets/bk.svg'
// import br from '../../assets/br.svg'
// import bq from '../../assets/bq.svg'
// import bp from '../../assets/bp.svg'
// import wb from '../../assets/wb.svg'
// import wK from '../../assets/wK.svg'
// import wk from '../../assets/wk.svg'
// import wr from '../../assets/wr.svg'
// import wq from '../../assets/wq.svg'
// import wp from '../../assets/wp.svg'
import blank from '../../assets/blank.svg'
import { useDispatch, useSelector } from 'react-redux'

// map images to object for dynamic access based on data-piece attribute
// const imageMap = { bk, bK, br, bb, bq, bp, wb, wK, wk, wr, wq, wp, wpy: wp, bpy: bp, "0": blank }

export default function ChessCell(props) {

    const { selected, setSelected } = props
    const dispatch = useDispatch()
    const piece = useSelector(state => state.chess.board[props.num])

    // let image = imageMap[piece]

    function handleClick(e) {
        const clickSelected = document.querySelector(`[data-selected="1"]`)
        if (e.target.dataset.piece === "0") return

        // if something else is highlighted, remove that and highlight current tile

        if (clickSelected && clickSelected !== e.target) {
            clickSelected.dataset.selected = "0"
            e.target.dataset.selected = "1"
            setSelected(e.target)
        }
        // otherwise toggle current click and change selected tile
        else {
            if (e.target === clickSelected) {
                e.target.dataset.selected = "0"
                setSelected(null)
            } else {
                e.target.dataset.selected = "1"
                setSelected(e.target)
            }

        }

    }
    // function dragStartHandler(e) {
    //     // get current piece's location and type and check valid moves
    //     // let currLocation = e.target.parentElement.dataset.num
    //     console.log("Drag start happening")
    //     const test = document.querySelectorAll('div')
    //     test.forEach(div => div.style.backgroundColor = 'red')

    //     // img.src = e.target.src
    //     // console.log(currLocation)

    //     // e.target.style.opacity = '0.4'
    //     // e.dataTransfer.effectAllowed = "move"
    //     // e.dataTransfer.setData("text/plain", e.target.id)

    // }

    // function dragEndHandler(e) {
    //     console.log(e.target.parent, "TARGET IN END HANDLER")
    //     e.target.style.opacity = "1"
    //     // intial.remove()
    // }

    // function dragLeaveHandler(e) {
    //     e.target.style.border = "none"
    // }

    // function dragOverHandler(e) {
    //     e.preventDefault()
    //     e.dataTransfer.dropEffect = "move"
    // }

    // function dropHandler(e) {
    //     return
    //     // e.preventDefault()
    //     // if (e.target.children.length > 0) return
    //     // e.target.style.border = "none"
    //     // const data = e.dataTransfer.getData("text/plain")
    //     // e.target.appendChild(document.getElementById(data))
    //     // console.log(data, "DATA IN DROP HANDLER")
    //     // console.log(e.target, "E.TARGET")
    // }

    // function dragEnterHandler(e) {
    //     e.preventDefault()
    //     e.target.style.border = "2px dotted black"
    // }

    const cellStyle = props.offColor ? "border bg-blue-400 w-full h-full flex justify-center items-center" : "border bg-white w-full h-full flex justify-center text-black  items-center"
    return (
        <>
            {piece &&
                <div
                    onClick={handleClick}
                    // onDrop={dropHandler}
                    // onDragEnter={dragEnterHandler}
                    // onDragLeave={dragLeaveHandler}
                    // onDragOver={dragOverHandler}
                    data-move="0"
                    data-num={`${props.num}`}
                    className={cellStyle}
                    data-selected="0"
                    data-piece={piece}
                // onClick={props.handleClick}
                >
                    {/* < img id={`${props.id}`} draggable={image !== blank} onDragEnd={dragEndHandler} onDragStart={dragStartHandler} data-piece={piece} className='w-full h-full object-fill' src={image}></img> */}
                </div>
            }
        </>

    )
}
