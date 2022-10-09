import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/post.actions'
import { isEmpty } from './Utils'
import Card from './Post/Card'

const Thread = () => {
  // Par défaut, on charge les messages.
  const [loadPost, setloadPost] = useState(true)

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postReducer)

  // Quand le component "Thread" se lance sur la page d'accueil, il exécute la fonction "useEffect" une seule fois. Il vérifie si le modal "loadPost" est sur true, il effectue l'action si c'est le cas, avant de remettre le modal sur "false". Le callback fait que le component est sensé relancer la fonction "useEffect()" à chaque fois que le loadPost évolue, Cette méthode a surout une utilité précise quand on utilise un infinite loader.
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts())

      // Une fois notre store rempli avec les posts, on repasse le modal "setLoadPost" à "false" pour ne plus jamais relancer cette action.
      setloadPost(false)
    }
  }, [loadPost, dispatch])

  return (
    // Fil d'actualité
    <div className="thread-container">
      {/* On va mapper chaque post */}
      {/* Si le tableau contenant la liste des posts n'est pas vide, alors on affiche chaque post du fil d'actualité */}
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            // On retourne le component "Card" qui va contenir toute la logique nécessaire à l'affichage d'un post.
            // La clé est la clé unique du post.
            return <Card post={post} key={post._id} />
          })}
      </ul>
    </div>
  )
}

export default Thread
