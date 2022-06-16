import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, name, surname, name + " " + surname, displayName)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
      </label>
      <label>
        <span>first name:</span>
        <input 
          type="text" 
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>surname:</span>
        <input 
          type="text" 
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
      </label>
      <label>
        <span>display name:</span>
        <input 
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      { !isPending && <button className="btn">sign up</button> }
      { isPending && <button className="btn" disabled>loading</button> }
      { error && <p>{error}</p> }
    </form>
  )
}
