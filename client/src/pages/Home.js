import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'
import Log from '../components/Log'

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <diV className="home">
      <LeftNav />
      <div className="main">
        {/* Formulaire de création de post */}
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </diV>
  )
}

export default Home
