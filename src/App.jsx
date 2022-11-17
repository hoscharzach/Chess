import { useEffect, useState } from 'react'
import GameContainer from './components/GameContainer'
import ChatContainer from './components/ChatContainer'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername } from './authSlice'
import useBasicAuth from './components/useBasicAuth'
import { useSocket } from './context/socket_context'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Route, Routes, useParams } from 'react-router-dom'
import Header from './components/Header'
import FrontPage from './components/Pages/FrontPage'
import MainPageContainer from './components/MainPageContainer'
import JoinGame from './components/Pages/JoinGame'
import GameInvite from './components/Pages/GameInvite'


function App() {

  const { user } = useSocket()

  useEffect(() => {
    console.log("I'm rerendering")
  })

  const [inputUsername, setInputUsername] = useState('')
  const [chatVisible, setChatVisible] = useState(true)
  const [linkGenerated, setlinkGenerated] = useState(false)
  const [multiPlayerLink, setMultiPlayerLink] = useState('')
  const { createRoom, currentRoom, joinRoom, socket } = useSocket()
  const [linkAvailable, setLinkAvailable] = useState(false)


  // default game that shows
  const [game, setGame] = useState('')
  console.log(user)
  function generateLink() {
    createRoom()
    // console.log(currentRoom, "CURENT ROOM IN GENERATE LINK")
  }

  // useEffect(() => {
  //   let url = window.location.search.slice(1).split('&')

  //   if (url.length >= 2 && userId) {
  //     const game = url[0].split('=')[1]
  //     const room = url[1].split('=')[1]
  //     setGame(game)
  //     joinRoom(room)
  //   }

  // }, [userId])

  // useEffect(() => {
  //   if (currentRoom) {
  //     const myUrl = new URL(window.location.origin)
  //     myUrl.searchParams.append('game', game)
  //     myUrl.searchParams.append('room', currentRoom)
  //     setMultiPlayerLink(myUrl.href)
  //     // console.log(myUrl.href)
  //     setlinkGenerated(true)
  //   }
  // }, [currentRoom])
  // console.log(currentRoom)
  // console.log(multiPlayerLink, currentRoom)


  // if user has not selected a username, display this first

  if (!user || !user.username) {
    return (
      <MainPageContainer>
        <Header />
      </MainPageContainer>
    )
  }

  // otherwise, default page at home should be game select
  return (
    <Routes>
      <Route path='/' element={<FrontPage />} />
      <Route path='/:game' element={<GameInvite />} />
      <Route path="/:game/:roomId" element={<JoinGame />} />
    </Routes>
  )

  {/*
        {!multiPlayerLink &&
          <div className=' text-4xl font-bold text-white mt-3'>
            {!game ? "Select a " : "Invite a "}
            <span className='text-blue-500'>{!game ? " game:" : " friend:"}</span>
          </div>
        }
        <div className='flex gap-2'>
          {!game &&
            <>

            </>}
          {game && !multiPlayerLink &&

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
      </div> */}
}

export default App
