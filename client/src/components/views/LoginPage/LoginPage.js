import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../actions/userAction'
import { useHistory } from 'react-router-dom'
import useAuth from '../../../hook/auth'

function LoginPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { hasAuth, isAdmin } = useAuth(false)

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    let body = {
      email: email,
      password: password,
    }
    let response = await dispatch(loginUser(body))
    if (response.payload.loginSuccess) {
      history.push('/')
    } else {
      alert('error')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
