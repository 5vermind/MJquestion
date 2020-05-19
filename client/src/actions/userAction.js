import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export async function loginUser(dataToSubmit) {
  let response = await axios.post('/api/user/login', dataToSubmit)
  return {
    type: LOGIN_USER,
    payload: response.data,
  }
}

export async function authUser() {
  let response = await axios.get('/api/user/auth')
  return {
    type: AUTH_USER,
    payload: response.data,
  }
}

export async function registerUser(dataToSubmit) {
  let response = await axios.post('/api/user/register', dataToSubmit)
  return {
    type: REGISTER_USER,
    payload: response.data,
  }
}
