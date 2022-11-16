import { useEffect, useState } from 'react'
import GameContainer from './components/GameContainer'
import ChatContainer from './components/ChatContainer'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername } from './authSlice'
import useBasicAuth from './components/useBasicAuth'
import { useSocket } from './context/socket_context'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { AirlineSeatLegroomReduced } from '@mui/icons-material'

function App() {

  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.user)
  const username = useSelector(state => state.auth.username)
  const [inputUsername, setInputUsername] = useState('')
  const [chatVisible, setChatVisible] = useState(true)
  const [linkGenerated, setlinkGenerated] = useState(false)
  const [multiPlayerLink, setMultiPlayerLink] = useState('')
  const { createRoom, currentRoom, joinRoom, socket } = useSocket()
  // when app loads, check local storage for a uid, if there is, set user to
  // the id, otherwise, create one and store it in local storage

  // default game that shows
  const [game, setGame] = useState('')

  // custom hook runs on load to grab username and id from localstorage
  useBasicAuth()

  function generateLink() {
    createRoom()
    // console.log(currentRoom, "CURENT ROOM IN GENERATE LINK")
  }

  useEffect(() => {
    let url = window.location.search.slice(1).split('&')

    if (url.length >= 2) {
      const game = url[0].split('=')[1]
      const room = url[1].split('=')[1]
      setGame(game)
      joinRoom(room)
    }

  }, [])

  console.log(game)

  useEffect(() => {
    if (currentRoom) {
      const myUrl = new URL(window.location.origin)
      myUrl.searchParams.append('game', game)
      myUrl.searchParams.append('room', currentRoom)
      setMultiPlayerLink(myUrl.href)
      // console.log(myUrl.href)
      setlinkGenerated(true)
    }
  }, [currentRoom])
  // console.log(currentRoom)
  console.log(multiPlayerLink, currentRoom)

  function changeUsername(e) {
    e.preventDefault()
    localStorage.setItem('username', `${inputUsername}`)
    dispatch(setUsername(inputUsername))
    setInputUsername('')
  }

  return (
    <div className='min-h-[100vh] flex justify-center flex-col w-full h-full items-center my-6 gap-4'>

      <div className='flex flex-col items-center justify-center'>

        <div className='text-6xl font-bold text-blue-500'>Welcome to Bideogames,</div>
        <div className='text-white text-6xl font-bold'>{username && username}</div>
      </div>
      <form className='flex items-center gap-3 justify-center' onSubmit={changeUsername}>

        <input className='placeholder:text-white p-2 my-3 rounded-md' type="text" placeholder='Change username...' onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} />
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='submit'>Change Username</button>
      </form>
      <div className=' text-4xl font-bold text-white mt-3'>
        {!game ? "Select a " : "Invite a "}
        <span className='text-blue-500'>{!game ? " game:" : " friend:"}</span>
      </div>
      <div className='flex gap-2'>
        {!game &&
          <>
            <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('chess')}>Chess</button>
            <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('tic-tac-toe')}>Tic-Tac-Toe</button>
          </>}
        {game && !multiPlayerLink &&
          <button onClick={generateLink} className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Generate {game} link</button>
        }

        {game && multiPlayerLink &&
          <div className='flex items-center gap-2'>
            <div>{multiPlayerLink}</div>
            <button onClick={() => navigator.clipboard.writeText(multiPlayerLink)}><ContentPasteIcon /></button>
          </div>
        }

      </div>
      <div className='max-w-[90vw] flex flex-col md:flex-row justify-center items-start my-6 w-full'>
        {
          linkGenerated &&
          <>
            <GameContainer game={game} />
            <ChatContainer />
          </>
        }
      </div>
      <div className='bg-[#121212] fixed h-14 bottom-0 w-full border-t border-slate-500 flex justify-center items-center text-lg gap-3'><span>Made by Zach Hoschar with Express/Socket.io/Vite/React/Redux - Deployed using Vercel/Render</span> | <a className='hover:text-blue-500' href="https://github.com/hoscharzach/bug-free-octo-fortnight">Github</a> | <a className='hover:text-blue-500' href="https://zachhoschar.com/">Portfolio</a></div>
    </div>
  )
}

export default App
