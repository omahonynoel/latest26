import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import {useFirestore} from './useFirestore'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const { addDocument, response } = useFirestore('members')

  const signup = async (email, password, name, surname, fullname, displayName) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await res.user.updateProfile({ displayName })
      
     let userId =res.user.uid
      addDocument("members",{
        name, 
        surname,
        fullname,
       userId,
      })
      console.log(res.user.uid)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}