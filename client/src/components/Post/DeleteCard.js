import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/post.actions'

const DeleteCard = (props) => {
  const dispatch = useDispatch()

  // Si la fonction ne tient que sur une ligne, ce n'est pas la peine d'écrire son code entre accolades.
  const deleteQuote = () => dispatch(deletePost(props.id))

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer cet articel ?')) {
          deleteQuote()
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  )
}

export default DeleteCard
