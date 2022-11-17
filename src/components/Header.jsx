import { useState } from "react"
import { useSelector } from "react-redux"
import { setUsername } from "../authSlice"
import { useDispatch } from "react-redux"
import { useSocket } from "../context/socket_context"



export default function Header() {

    const { user, setUsername } = useSocket()
    const dispatch = useDispatch()
    const [inputUsername, setInputUsername] = useState('')

    function changeUsername(e) {
        e.preventDefault()
        localStorage.setItem('username', `${inputUsername}`)
        setUsername(inputUsername)
        setInputUsername('')
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center'>

                <div className='text-6xl font-bold text-blue-500'>Welcome to Bideogames,</div>
                <div className='text-white text-6xl font-bold'>{user?.username && user.username}</div>
            </div>
            <form className='flex items-center gap-3 justify-center' onSubmit={changeUsername}>

                <input className='placeholder:text-white p-2 my-3 rounded-md' type="text" placeholder='Change username...' onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} />
                <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='submit'>Change Username</button>
            </form>
        </>
    )
}
