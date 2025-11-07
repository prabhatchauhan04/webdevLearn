import React from 'react'
import useAuth from '../context/authContext'

const Dashboard = () => {

  const { logout } = useAuth();

  return (
    <>
      <div>
        Welcome To Dashboard <button onClick={logout}>Log Out</button>
      </div>
    </>
  )
}

export default Dashboard