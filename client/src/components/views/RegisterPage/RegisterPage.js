import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../actions/userAction'
import { useHistory } from 'react-router-dom'

function RegisterPage() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const history = useHistory()

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return alert('password different')
    }
    let body = {
      email: email,
      name: name,
      password: password,
    }
    let response = await dispatch(registerUser(body))
    if (response.payload.registerSuccess) {
      history.push('/login')
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

        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
