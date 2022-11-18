import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import FollowHandler from './FollowHandler'

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [playOnce, setPlayOnce] = useState(true)

  const [friendsHint, setFriendsHint] = useState([])

  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  useEffect(() => {
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      const notFriendsList = () => {
        let array = []

        usersData.map((user) => {
          // On empêche l'utilisateur actuellement connecté de s'ajouter lui-même. Dans la dernière condition, on dit que l'utilisateur ne doit pas figurer dans le tableau d'utilisateurs qui lui est retourné.
          if (
            user._id !== userData._id &&
            !user.followers.includes(userData._id)
          ) {
            // On ajoute dans notre tableau "array", qui actuellement vide, chaque utilisateur cartographié entrant dans les conditions définies ci-dessus.
            return array.push(user._id)
          }
        })
        // On rend aléatoire l'ordre des amis suggérés dans le tableau, pour éviter de proposer les mêmes personnes à chaque fois que la fonction est jouée.
        array.sort(() => 0.5 - Math.random())

        // On détermine la hauteur du tableau de suggestions d'amis par la hauteur de la fenêtre du site (inspecteur inclus).
        if (window.innerHeight > 780) {
          array.length = 5
        } else if (window.innerHeight > 720) {
          array.length = 4
        } else if (window.innerHeight > 615) {
          array.length = 3
        } else if (window.innerHeight > 540) {
          array.length = 2
        } else {
          array.length = 0
        }

        setFriendsHint(array)
      }

      notFriendsList()

      setIsLoading(false)

      // On n'exécute qu'une fois la fonction "notFriendsList()" lorsqu'on obtient la page, on ne veut pas la rejouer à l'infini.
      setPlayOnce(false)
    }
  }, [usersData, userData, playOnce])

  return (
    <div className="get-friends-container">
      <h4>Suggestions d'amis</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {/* Si notre tableau "friendsHint" contient une valeur (une personne à ajouter) */}
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                // On "transforme" les ID avec une photo de profil et un nom d'utilisateur.
                // On vérifie si l'ID de l'utilisateur ciblé correspond à une ID contenu dans le store "usersData".
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={'suggestion'}
                      />
                    </li>
                  )
                }
              }
            })}
        </ul>
      )}
    </div>
  )
}

export default FriendsHint
