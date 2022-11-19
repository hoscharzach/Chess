import { useSocket } from './context/socket_context'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FrontPage from './components/Pages/FrontPage'
import MainPageContainer from './components/MainPageContainer'
import JoinGame from './components/Pages/JoinGame'
import GameInvite from './components/Pages/GameInvite'


function App() {

  const { user } = useSocket()

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


}

export default App
