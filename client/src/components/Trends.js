import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrends } from '../actions/post.actions'
import { isEmpty } from './Utils'
import { NavLink } from 'react-router-dom'

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer)

  // On appelle le store "usersReducer", car on aura besoin de récupérer dynamiquement la photo de profil de l'utilisateur.
  const usersData = useSelector((state) => state.usersReducer)

  // Store des tendances.
  const trendList = useSelector((state) => state.trendingReducer)

  const dispatch = useDispatch()

  // On calcule les posts les plus aimés.
  useEffect(() => {
    if (!isEmpty(posts[0])) {
      // On crée tout d'abord un tableau pour enregistrer chaque post par "clé", pour ensuite appeller la méthode JavaScript "sort()" pour trier les posts par nombre de "j'aime", du plus aimé au moints aimé.
      const postsArr = Object.keys(posts).map((i) => posts[i])

      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length
      })

      // On garde les 3 posts les plus aimés pour les afficher dans la section dédiée sur la page d'accueil.
      sortedArray.length = 3

      dispatch(getTrends(sortedArray))
    }
  }, [posts, dispatch])

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post.id}>
                  <div>
                    {/* On récupère la photo associée au post s'il y en a une */}
                    {post.picture && <img src={post.picture} alt="post-pic" />}

                    {/* On récupère la vidéo associée au post s'il y en a une */}
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

                    {/* On récupère la photo de profil de l'auteur du post, si aucune image ou vidéo n'est associée à son post */}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img
                        src={
                          usersData[0] &&
                          usersData
                            .map((user) => {
                              if (user._id === post.posterId) {
                                return user.picture
                              } else return null
                            })
                            .join('')
                        }
                        alt="profile-pic"
                      />
                    )}
                  </div>

                  <div className="trend-content">
                    {/* On affiche le message contenu dans le post en tendance */}
                    <p>{post.message}</p>
                    <span>Lire</span>
                  </div>
                </li>
              )
            })}
        </ul>
      </NavLink>
    </div>
  )
}

export default Trends
