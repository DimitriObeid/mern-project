import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user.actions'
import { isEmpty } from '../Utils'

// Les arguments de ce component sont ses props.
// Le type : Si c'est le type "suggestion" comme dans le panneau "Suggestion" de la page d'accueil, on affiche le bouton avec le texte "Suivre". Sinon, si c'est le type "card", qu'on voit à côté du pseudo de l'auteur d'un post, alors on affiche l'icône avec le coche.
const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer)

  // On détermine si la personne affichée est suivie ou non par l'utilisateur actuel. Par défaut, le modal est sur "false", car de base, on considèrera toujours que la personne à suivre n'est pas suivie par l'utilisateur. Quand on appelera le modal, on frea donc un petit calcul qui déterminera si un autre utilisateur est suivi ou pas par notre utilisateur.
  const [isFollowed, setIsFollowed] = useState(false)

  const dispatch = useDispatch()

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))

    // Une fois l'utilisateur suivi, on met le modal "setIsFollowed" sur "true".
    setIsFollowed(true)
  }

  const handleUnfollow = () => {
    // On passe en paramètre "idToFollow", car ce sera tout de même l'ID de la même personne actuellement suivie.
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(false)
  }

  useEffect(
    () => {
      // On vérifie si le tableau d'abonnements de l'utilisateur n'est vide, grâce à la fonction "isEmpty" que nous avons codé dans le fichier "Utils.js".
      if (!isEmpty(userData.following)) {
        // On vérifie si l'utilisateur actuel suit déjà l'utilisateur cible.
        if (userData.following.includes(idToFollow)) {
          // Vu que la valeur est sur true (l'utilisateur cible est suivi par l'utilisateur actuel), le bouton ne marquera plus "suivre", mais "se désabonner".
          setIsFollowed(true)
        } else {
          setIsFollowed(false)
        }
      }
    },
    // Le principe de ce callback est de relancer le useEffect quand le userData evolue. Il évolue quand un autre utilisateur est ajouté ou supprimé de la liste des abonnements de l'utilisateur actuel.
    [userData, idToFollow]
  )

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === 'suggestion' && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === 'card' && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === 'suggestion' && (
            <button className="follow-btn">Suivre</button>
          )}
          {type === 'card' && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  )
}

export default FollowHandler
