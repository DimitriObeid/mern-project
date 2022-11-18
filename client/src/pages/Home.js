import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm'
import Thread from '../components/Thread'
import Log from '../components/Log'
import Trends from '../components/Trends'
import FriendsHint from '../components/Profil/FriendsHint'
import { ThemeContext } from '../Contexts/DarkModeContext'

const Home = () => {
  const uid = useContext(UidContext)

  const theme = useContext(ThemeContext)

  const darkMode = theme.state.darkMode

  return (
    <div className={`home ${darkMode ? 'home-dark' : 'home-light'}`}>
      {/* Section de gauche */}
      <LeftNav />

      {/* Section centrale */}
      <div className={`main ${darkMode ? 'main-dark' : 'main-light'}`}>
        {/* Formulaire de création de post */}
        <div
          className={`home-header ${
            darkMode ? 'home-header-dark' : 'home-header-light'
          }`}
        >
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>

      {/* Section de droite */}
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {/* Si l'utilisateur est connecté, on lui affiche la suggestion d'amis */}
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
