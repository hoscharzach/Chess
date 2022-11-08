import { useState } from 'react'
import GameContainer from './components/GameContainer'
import ChatContainer from './components/ChatContainer'

function App() {

  const [game, setGame] = useState('chess')

  return (
    <div className='flex justify-center flex-col w-full h-full items-center my-6 gap-4'>

      <h1 className='text-6xl font-bold text-blue-500'>Welcome to Bideogames</h1>
      <div className='flex gap-2'>
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('chess')}>Chess</button>
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => setGame('tic-tac-toe')}>Tic-Tac-Toe</button>
      </div>
      <div className='max-w-[90vw] flex flex-col lg:flex-row justify-center md:justify-evenly my-6 w-full'>

        <GameContainer game={game} />
        <ChatContainer />
      </div>
      <div className='bg-[#121212] fixed h-14 bottom-0 w-full border-t border-slate-500 flex justify-center items-center text-lg gap-3'><span>Made by Zach Hoschar with Go/Gin/Gorilla Websocket/NextJS/Ably</span> | <a className='hover:text-blue-500' href="https://github.com/hoscharzach/bug-free-octo-fortnight">Github</a> | <a className='hover:text-blue-500' href="https://zachhoschar.com/">Portfolio</a></div>
    </div>
  )
}

export default App
