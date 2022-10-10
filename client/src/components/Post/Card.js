import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'
import FollowHandler from '../Profil/FollowHandler'
import LikeButton from './LikeButton'
import { getPosts, updatePost } from '../../actions/post.actions'
import DeleteCard from './DeleteCard'
import CardComments from './CardComments'

// Le "post" est le prop passé lors de l'appel du component "Card" dans le fichier "Thread.js".
const Card = ({ post }) => {
  // Tant qu'on n'a pas les données complètes pour afficher le pont, on montre à l'utilisateur que le post charge.
  const [isLoading, setIsLoading] = useState(true)

  // Mise à jour d'un post de par l'auteur du post lui-même.
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)

  // Affichage des commentaires (de base, on ne les montre pas).
  const [showComments, setShowComments] = useState(false)

  // Il faut qu'on ait toute la BDD de nos utilisateurs pour savoir ce qu'ils ont aimés, quel est le nom de l'auteur du post, sa photo, car ce ne sont pas des choses qui sont stockées dans le store.
  const usersData = useSelector((state) => state.usersReducer)

  // On récupère les données de notre utilisateur.
  const userData = useSelector((state) => state.userReducer)

  const dispatch = useDispatch()

  const updateItem = () => {
    // S'il y a quelque chose qui a changé dans le message à éditer (sinon ça ne sert à rien de faire un requête dans la BDD)
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }

    setIsUpdated(false)
  }

  useEffect(() => {
    // Si on a les données du post, on remet le modal "isLoading" sur "false".
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [usersData])

  return (
    <li className="card-container" key={postMessage._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          {/* On affiche dans la partie de gauche du post la photo de profil de l'utilisateur qui a posté le post à charger. */}
          <div className="card-left">
            {/* Si jamais on réclame une donnée qui n'a pas été cherchée dans la BDD, React n'attendra pas de données et renverra une erreur. Avant qu'il ne le fasse, il faut lui dire que l'on a les données */}
            <img
              src={
                !isEmpty(usersData[0]) &&
                // On doit mapper, car on ne peut pas sauvegarder la photo de l'auteur du post au moment où il poste, car entre temps il peut très bien changer de photo, et le post continuerait d'afficher son ancienne photo.
                usersData
                  .map((user) => {
                    // Si on trouve l'ID de l'utilisateur qui a posté le post, on retourne le chemin vers sa photo de profil,
                    if (user._id === post.posterId) return user.picture
                    else return null
                  })
                  // La méthode "join()" permet d'éviter que la méthode "map()" ne mette des virgules entre chaque élément dans l'attribut "src" de la balise "img", comme on peut le voir dans l'inspecteur. On met donc une string vide pour joindre chaque élément.
                  .join('')
              }
              alt="poster-pic"
            />
          </div>

          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    // On doit mapper, car on ne peut pas sauvegarder le pseudo de l'auteur du post au moment où il poste, car entre temps il peut très bien changer de pseudo, et le post continuerait d'afficher son ancien pseudo.
                    usersData.map((user) => {
                      // Si on trouve l'ID de l'utilisateur qui a posté le post, on retourne son pseudo,
                      if (user._id === post.posterId) return user.pseudo
                      else return null
                    })}
                </h3>
                {/* On code une condition pour empêcher l'utilisateur actuel d'être ami avec lui-même */}
                {/* Si l'ID du posteur n'est pas celui de l'utilisateur */}
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={'card'} />
                )}
              </div>
              {/* On affiche la date du post */}
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                {/* Lorsqu'on clique sur le message à éditer, on souhaite conserver le message original pour que l'utilisateur puisse le modifier*/}
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {/* Si une photo est attachée au post, alors on l'affiche (comme dit précédemment, si jamais on réclame une donnée qui n'a pas été cherchée ou trouvée dans la BDD, React n'attendra pas de données et renverra une erreur. Avant qu'il ne le fasse, il faut lui dire que l'on a les données) */}
            {/* Dans le "src", on passe le chemin de la photo attachée à ce post. */}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {/* Même chose que précédemment, avec les vidéos postées */}
            {post.video && (
              <iframe
                title={post._id}
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {/* On propose à l'utilisateur la possibilité d'éditer ou de supprimer SON PROPRE message ici */}
            {userData._id === post.posterId && (
              <div className="button-container">
                {/* Au lieu de mettre impérativement l'état du modal "isUpdated" sur "true", on met la valuer inverse pour activer ou désactiver le mode d'édition en y refaisant un clic dessus */}
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                {/* Obtention du nombre de commentaires obtenus */}
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {/* Si l'utilisateur a décidé de voir les commentaires sous un post, alors on appelle le component CardComment, pour déclencher toute la logique derrière le component */}
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  )
}

export default Card
