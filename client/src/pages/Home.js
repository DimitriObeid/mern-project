import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'
import Log from '../components/Log'
import Trends from '../components/Trends'

const Home = () => {
  const uid = useContext(UidContext)

  return (
    <div className="home">
      {/* Section de gauche */}
      <LeftNav />

      {/* Section centrale */}
      <div className="main">
        {/* Formulaire de création de post */}
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>

      {/* Section de droite */}
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
