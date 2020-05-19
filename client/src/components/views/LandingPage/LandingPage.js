import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {
  const onClickHandler = () => {
    axios.get(`/api/user/logout`)
  }
  useEffect(() => {
    let a = async () => {
      let res = await axios.get('/api/hello')
      console.log(res.data)
    }
    a()
  }, [])
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
      Landing Page
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage
