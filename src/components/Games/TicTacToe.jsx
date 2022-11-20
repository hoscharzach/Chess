import { useEffect, useRef, useState } from "react"

export default function TicTacToe(props) {

    const modal = useRef(null)
    const gameBoard = useRef(null)

    function showModal() {
        if (!modal.current) return
        modal.current.classList.remove("hidden")
    }

    function closeModal() {
        if (!modal.current) return
        modal.current.classList.add("hidden")
    }

    async function reset() {
        await updateState('reset')
    }


    const [player, setPlayer] = useState('x')
    const [gameState, setGameState] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' })
    const [winner, setWinner] = useState(null)
    const [conn, setConn] = useState({})


    // useEffect(() => {
    //     let connection = new WebSocket('wss://golang-test.onrender.com/ws/2')

    //     connection.onclose = (e) => {
    //         ("closing")
    //     }

    //     connection.onmessage = (e) => {
    //         const x = JSON.parse(e.data)
    //         setGameState({ ...x })
    //     }

    //     setConn(connection)

    //     return () => connection.close()
    // }, [])

    async function updateState(val) {
        conn.send(JSON.stringify(val))
        // await fetch("/api/sendMessage", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ gameState: val, author: ably.auth.clientId, message: 'gameUpdate' })
        // })
    }

    function checkForWin() {
        // just hard code the win conditions since there's only 8 of them
        if (gameState[0] === player && gameState[1] === player && gameState[2] === player) return true
        else if (gameState[3] === player && gameState[4] === player && gameState[5] === player) return true
        else if (gameState[6] === player && gameState[7] === player && gameState[8] === player) return true
        else if (gameState[0] === player && gameState[3] === player && gameState[6] === player) return true
        else if (gameState[1] === player && gameState[4] === player && gameState[7] === player) return true
        else if (gameState[2] === player && gameState[5] === player && gameState[8] === player) return true
        else if (gameState[0] === player && gameState[4] === player && gameState[8] === player) return true
        else if (gameState[2] === player && gameState[4] === player && gameState[6] === player) return true

        return false
    }
    // console.log(player)
    useEffect(() => {

        // every time game state changes, check if a win condition has been met
        const didWin = checkForWin()
        if (didWin) {
            // if it has, set the winner to the player and pop open the modal to show winner
            setWinner(player)
            showModal()
            updateState('reset')
        } else {
            // otherwise pass player
            player === 'x' ? setPlayer('o') : setPlayer('x')
        }
    }, [gameState])

    // const [_, ably] = useChannel("mainchat", chat => {

    //     // if the message is "reset", reset game state
    //     if (chat.data.gameState && chat.data.gameState === 'reset') {
    //         setGameState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '' })
    //     }
    //     // if the message has gameState and it isn't "reset", replace current state with updated state
    //     else if (chat.data.gameState) {
    //         setGameState({ ...chat.data.gameState })
    //     }
    // })

    async function changeSquare(e) {
        let updateValue = {}
        switch (player) {
            case 'x':
                if (e.target.dataset.play !== 'x' && e.target.dataset.play !== 'o') {
                    // copy current state and pass it as argument to websocket connection
                    updateValue = { ...gameState }
                    updateValue[e.target.dataset.node] = 'x'
                    await updateState(updateValue)
                }
                break
            case 'o':
                if (e.target.dataset.play !== 'x' && e.target.dataset.play !== 'o') {
                    updateValue = { ...gameState }
                    updateValue[e.target.dataset.node] = 'o'
                    await updateState(updateValue)

                }
            default:
                return
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">

            {/* gameboard */}
            <div id="gameboard" ref={gameBoard} className="w-[400px] h-[400px] items-center justify-center grid grid-cols-3 grid-rows-3 relative">
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-b border-r border-gray-500 relative" data-play={gameState[0]} data-node="0"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-b border-r border-gray-500 relative" data-play={gameState[1]} data-node="1"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-b border-gray-500 relative" data-play={gameState[2]} data-node="2"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-r border-b border-gray-500 relative" data-play={gameState[3]} data-node="3"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-b border-r  border-gray-500 relative" data-play={gameState[4]} data-node="4"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-b  border-gray-500 relative" data-play={gameState[5]} data-node="5"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-r  border-gray-500 relative" data-play={gameState[6]} data-node="6"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none border-r border-gray-500 relative" data-play={gameState[7]} data-node="7"></div>
                <div onClick={changeSquare} className="flex justify-center items-center w-full h-full bg-none  border-gray-500 relative" data-play={gameState[8]} data-node="8"></div>
            </div>

            {/* buttons */}
            <div className="flex gap-2 w-full justify-center my-4">
                {/* <button onClick={showModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="popup-modal">
                    Toggle modal
                </button> */}
                <button onClick={reset} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rage Reset</button>
            </div>

            {/* modal */}
            <div id="popup-modal" ref={modal} tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden h-[200px] w-[400px] z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Looks like Player {winner && winner.toUpperCase()} won!</h3>
                            <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok, Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
