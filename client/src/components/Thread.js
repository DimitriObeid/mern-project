import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/post.actions'
import { isEmpty } from './Utils'
import Card from './Post/Card'

const Thread = () => {
  // Par défaut, on charge les messages.
  const [loadPost, setloadPost] = useState(true)

  // Gestion de l'infinite scroll. Tous les 5 posts, on charge les 5 posts suivants.
  const [count, setCount] = useState(5)

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.postReducer)

  const loadMore = () => {
    // On vérifie si l'utilisateur a atteint le bas de la page.
    // "window.innerHeight + document.documentElement.scrollTop + 1" : l'endroit où l'utilisateur se situe exactement sur la page Web.
    // "document.scrollingElement.scrollHeight" : Tout ce qui est scrollable dans la page.
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setloadPost(true)
    }
  }

  // Quand le component "Thread" se lance sur la page d'accueil, il exécute la fonction "useEffect" une seule fois. Il vérifie si le modal "loadPost" est sur true, il effectue l'action si c'est le cas, avant de remettre le modal sur "false". Le callback fait que le component est sensé relancer la fonction "useEffect()" à chaque fois que le loadPost évolue, Cette méthode a surout une utilité précise quand on utilise un infinite loader.
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count))

      // Une fois notre store rempli avec les posts, on repasse le modal "setLoadPost" à "false" pour ne plus jamais relancer cette action.
      setloadPost(false)
      setCount(count + 5)
    }

    // À chaque fois qu'on atteint le bas de la page, on relance la fonction "useEffect()" pour rajouter les 5 éléments suivants, tout ça grâce au callback.
    // Dès qu'on a exécuté une fois cette fonction, le modal "loadPost" se remet sur "false", et pour réexécuter cette fonction, on le remet sur "true", et à la fin, il se remet à "false", sinon tous les posts seraient chargés d'un coup.
    // Pour relancer cette fonction, on crée donc un écouteur d'événements (event listener).
    window.addEventListener('scroll', loadMore)

    // Si on veut que cet écouteur d'événements fonctionne, on fait un return en fonction fléchée.
    // Quand on crée une fonction "useEffect()" et qu'on y ajoute un écouteur d'événements, on met d'abord un événement qui surveille (ici "window.addEventListener"), puis quand le "useEffect" se démonte, c'est à dire que l'on n'est plus sur cet élément, on reture cet événement (ici "window.removeEventListener")
    return () => window.removeEventListener('scroll', loadMore)
  }, [loadPost, dispatch, count])

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
