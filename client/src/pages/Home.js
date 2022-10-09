import React from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'

const Home = () => {
  return (
    <diV className="home">
      <LeftNav />
      <div className="main">
        <Thread />
      </div>
    </diV>
  )
}

export default Home
