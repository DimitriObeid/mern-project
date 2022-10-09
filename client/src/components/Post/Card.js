import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'
import FollowHandler from '../Profil/FollowHandler'

// Le "post" est le prop passé lors de l'appel du component "Card" dans le fichier "Thread.js".
const Card = ({ post }) => {
  // Tant qu'on n'a pas les données complètes pour afficher le pont, on montre à l'utilisateur que le post charge.
  const [isLoading, setIsLoading] = useState(true)

  // Il faut qu'on ait toute la BDD de nos utilisateurs pour savoir ce qu'ils ont aimés, quel est le nom de l'auteur du post, sa photo, car ce ne sont pas des choses qui sont stockées dans le store.
  const usersData = useSelector((state) => state.usersReducer)

  // On récupère les données de notre utilisateur.
  const userData = useSelector((state) => state.userReducer)

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
            <p>{post.message}</p>
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
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment" />
                {/* Obtention du nombre de commentaires obtenus */}
                <span>{post.comments.length}</span>
              </div>
              <h6>Like button</h6>
              <img src="./img/icons/share.svg" alt="share" />
            </div>
          </div>
        </>
      )}
    </li>
  )
}

export default Card
