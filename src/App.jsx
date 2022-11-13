import { useEffect, useState } from 'react'
import GameContainer from './components/GameContainer'
import ChatContainer from './components/ChatContainer'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUsername } from './authSlice'

function App() {

  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.user)
  const username = useSelector(state => state.auth.username)
  const [inputUsername, setInputUsername] = useState('')

  // when app loads, check local storage for a uid, if there is, set user to
  // the id, otherwise, create one and store it in local storage
  useEffect(() => {

    async function getRandomWords() {
      const res = await fetch('https://random-word-api.herokuapp.com/word?number=2')
      if (res.ok) {
        const data = await res.json()
        return data
      }
    }
    let newId = nanoid()
    const id = localStorage.getItem('uid')
    const username = localStorage.getItem('username')
    if (id) {
      dispatch(setUser(id))
    } else {
      localStorage.setItem('uid', `${newId}`)
      dispatch(setUser(newId))
    }

    if (username) {
      dispatch(setUsername(username))
    } else {
      getRandomWords()
        .then((a) => dispatch(setUsername(`${a[0]} ${a[1]}`)))

    }
  }, [])

  // default game that shows
  const [game, setGame] = useState('chess')

  function changeUsername(e) {
    e.preventDefault()
    localStorage.setItem('username', `${inputUsername}`)
    dispatch(setUsername(inputUsername))
    setInputUsername('')
  }

  return (
    <div className='flex justify-center flex-col w-full h-full items-center my-6 gap-4'>

      <div className='flex flex-col items-center justify-center'>

        <div className='text-6xl font-bold text-blue-500'>Welcome to Bideogames,</div>
        <div className='text-white text-6xl font-bold'>{username && username}</div>
      </div>
      <form className='flex flex-col items-center justify-center' onSubmit={changeUsername}>

        <input className='placeholder:text-white p-2 my-3 rounded-md' type="text" placeholder='Change username...' onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} />
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='submit'>Change Username</button>
      </form>
      <div className='text-4xl font-bold text-white mt-12'>Select a <span className='text-blue-500'>game:</span></div>
      <div className='flex gap-2'>
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('chess')}>Chess</button>
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('tic-tac-toe')}>Tic-Tac-Toe</button>
      </div>
      <div className='max-w-[90vw] flex flex-col justify-center items-center my-6 w-full'>

        <GameContainer game={game} />
        <ChatContainer />
      </div>
      <div className='bg-[#121212] fixed h-14 bottom-0 w-full border-t border-slate-500 flex justify-center items-center text-lg gap-3'><span>Made by Zach Hoschar with Go/Gin/Gorilla/React/Redux - Deployed using Vercel/Render</span> | <a className='hover:text-blue-500' href="https://github.com/hoscharzach/bug-free-octo-fortnight">Github</a> | <a className='hover:text-blue-500' href="https://zachhoschar.com/">Portfolio</a></div>
    </div>
  )
}

export default App
