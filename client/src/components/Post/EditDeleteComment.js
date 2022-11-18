import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../actions/post.actions'
import { UidContext } from '../AppContext'

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  // Au lieu de prendre le store et de lui demander les données de l'utilisateur, on peut utiliser notre contexte.
  const uid = useContext(UidContext)

  const handleEdit = (e) => {
    e.preventDefault()

    // Si le texte du commentaire a été modifié, alors on envoie le commentaire modifié à la BDD, puis au store grâce à Redux.
    if (text) {
      dispatch(editComment(postId, comment._id, text))
      // On efface le commentaire modifié contenu dans le modal "text".
      setText('')
      setEdit('false')
    }
  }

  const handleDelete = () => dispatch(deleteComment(postId, comment._id))

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        // En mettant le modal "isAuthor" sur true, on affichera le bouton d'édition du commentaire dans le rendu ci-dessous.
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comment.commenterId])

  return (
    <div className="edit-comment">
      {/* On vérifie naturellement si l'auteur du post est l'utilisateur actuellement connectée */}
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {/* Traitement de la modification du commentaire */}
      {isAuthor && edit === true && (
        // On affiche un formulaire d'édition de commentaire.
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          {/* Gestion du clic sur le bouton d'édition */}
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Éditer
          </label>
          <br />

          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            // On récupère le texte du commentaire original pour que l'utilisateur puisse le modifier.
            defaultValue={comment.text}
          />
          <br />

          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                  handleDelete()
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider les modifications" />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment
