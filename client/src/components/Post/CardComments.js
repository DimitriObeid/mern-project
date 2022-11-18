import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPosts } from '../../actions/post.actions'
import FollowHandler from '../Profil/FollowHandler'
import { isEmpty, timestameParser } from '../Utils'
import EditDeleteComment from './EditDeleteComment'

const CardComments = ({ post }) => {
  const [text, setText] = useState('')

  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    // Si du texte a été écrit dans le formulaire de commentaire, alors on envoie la données contenant le texte dans la BDD, dans le cas contraire, ça ne sert à rien d'envoyer une info à la BDD.
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() =>
          // On récupère les posts de MongoDB, comme dit dans le long commentaire de la fonction "addComment". Le store va donc se mettre à jour avec le nouveau commentaire et son ID unique (le principe sera le même avec la création de posts).
          dispatch(getPosts())
        )
        // Il faut quand même remettre le texte vide si l'utilisateur veut écrire un nouveau commentaire quelques secondes plus tard.
        .then(() => setText(''))
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          // Si le commentaire a été posté par notre utilistaeur, alors on affiche son nessage avec une couleur différente.
          // Rappel : cette className est une classe conditionnelle.
          <div
            className={
              comment.commenterId === userData._id
                ? 'comment-container client'
                : 'comment-container'
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  // On doit mapper, car on ne peut pas sauvegarder la photo de l'auteur du commentaire au moment où il poste, car entre temps il peut très bien changer de photo, et le commentaire continuerait d'afficher son ancienne photo.
                  usersData
                    .map((user) => {
                      // Si on trouve l'ID de l'utilisateur qui a posté le commentaire, on retourne le chemin vers sa photo de profil,
                      if (user._id === comment.commenterId) return user.picture
                      else return null
                    })
                    // La méthode "join()" permet d'éviter que la méthode "map()" ne mette des virgules entre chaque élément dans l'attribut "src" de la balise "img", comme on peut le voir dans l'inspecteur. On met donc une string vide pour joindre chaque élément.
                    .join('')
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  {/* On affiche la donnée "commenterPseudo", comme l'utilisateur ne peut pas changer de pseudo */}
                  <h3>{comment.commenterPseudo}</h3>
                  {/* On offre à l'utilisateur la possibilité de suivre chaque commentateur, en l'empêchant de se suivre lui-même */}
                  {comment.commenterId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={'card'}
                    />
                  )}
                </div>
                <span>{timestameParser(comment.timestamp)}</span>
              </div>
              {/* On affiche le texte du commentaire */}
              <p>{comment.text}</p>
              {/* On propose à notre utilisateur d'éditer ou de supprimer son commentaire */}
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        )
      })}

      {/* Si l'utilisateur est connecté, on lui propose de poster un commentaire via un formulaire */}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />

          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  )
}

export default CardComments
