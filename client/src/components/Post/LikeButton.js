import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../AppContext'

// Cette librairie permet de créer des popups lorsqu'on survole un élément de la page Web.
import Popup from 'reactjs-popup'

// La librairie mentionnée ci-dessus est également livrée avec son propre style.
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux'
import { likePost, unlikePost } from '../../actions/post.actions'

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false)

  // On récupère simplement l'ID de notre utilisateur.
  const uid = useContext(UidContext)

  // Pour rappel, le "useDispatch" permet l'exécution de nos fonctions d'interaction avec le store.
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(
    () => {
      // "post.likers" : Le tableau contenant la liste de l'ID de chaque personne qui a aimé un post.
      // Si l'ID de notre utilisateur figure dans le tableau, on change l'état du modal "liked".
      if (post.likers.includes(uid)) setLiked(true)
      // Si la condition précédente n'est pas remplie, il faut tout de même dire à la fonction "useState" de mettre l'état du modal "Liked" sur "false".
      else setLiked(false)
    },
    // On relance la fonction "useEffect()" quand on a l'UID, le tableau des utilisateurs ayant aimé un post, et si le "liked" est incrémenté.
    [uid, post.likers, liked]
  )

  return (
    <div className="like-container">
      {/* Si l'utilisateur n'est pas connecté, on lui affiche un popup pour l'inviter à se connecter s'il veut aimer un post. */}
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer ce post</div>
        </Popup>
      )}

      {/* Sinon, si l'utilisateur est connecté et qu'il n'a pas encore aimé un post */}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}

      {/* Sinon, si l'utilisateur est connecté et qu'il a déjà aimé un post */}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      {/* Affichage du nombre de "j'aime" */}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default LikeButton
