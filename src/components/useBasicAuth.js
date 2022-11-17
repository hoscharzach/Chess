import { useEffect } from "react"
import { nanoid } from "nanoid"
import { setUsername, setUser } from "../authSlice"
import { useDispatch } from "react-redux"

export default function useBasicAuth() {
    const dispatch = useDispatch()
    useEffect(() => {

        async function getRandomWords() {
            console.log("running get random words")
            const res = await fetch('https://random-word-api.herokuapp.com/word?number=2')
            if (res.ok) {
                const data = await res.json()
                return dispatch(setUsername(`${data[0]} ${data[1]}`))
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
        }
    }, [])


}
