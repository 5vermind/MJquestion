import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authUser } from '../actions/userAction'
import { useHistory } from 'react-router-dom'

export default function useAuth(authNeeded, adminPage = false) {
  //authNeeded
  //null=> 상관없다
  //falase => 로그인 했으면 X
  //true => 로그인 안했으면 X
  const dispatch = useDispatch()
  const [hasAuth, setHasAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const history = useHistory()
  useEffect(() => {
    let a = async () => {
      let response = await dispatch(authUser())
      let { hasAuth: auth, isAdmin: admin } = response.payload
      setHasAuth(auth)
      setIsAdmin(admin)
      //로그인 함
      if (auth) {
        if (adminPage && !isAdmin) {
          history.goBack()
        }
      }
      //로그인 안함
      else {
        if (!authNeeded) {
          history.goBack()
        }
      }
    }
    a()
    return () => {}
  })

  return { hasAuth, isAdmin }
}
