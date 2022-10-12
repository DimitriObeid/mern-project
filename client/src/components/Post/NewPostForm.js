import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { isEmpty, timestameParser } from '../Utils'

const NewPostForm = () => {
  // Tant qu'on n'a pas les données complètes pour afficher le pont, on montre à l'utilisateur que le post charge.
  const [isLoading, setIsLoading] = useState(true)

  // Le post peut contenir du texte ...
  const [message, setMessage] = useState('')

  // ... un message...
  const [postPicture, setPostPicture] = useState(null)

  // ... ou une vidéo (ici, on l'enregistre sous forme d'une string, car on va traiter des liens YouTube).
  const [video, setVideo] = useState('')

  // Fichier image.
  const [file, setFile] = useState()

  // On récupère les données de l'utilisateur enregistrées dans le store.
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (e) => {}

  const handlePost = () => {}

  const handleVideo = () => {
    // On prend le message de l'utilisater, on le sépare en plusieurs éléments délimités par une chaîne de caractères vide, puis via un boucle for, on charche l'élément contenat la chaîne de caractères du lien de la vidéo pour la récupérer et l'enregistrer dans la variable "video".
    let findLink = message.split(' ')

    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes('https://www.yout') ||
        findLink[i].includes('https://yout')
      ) {
        // En remplaçant cette partie du lien grâce à la méthode "replace()" (méthode native de JavaScript), la vidéo devient lisible via un lecteur en dehors du site YouTube.
        let embed = findLink[i].replace('watch?v=', 'embed/')

        // On retire également le paramètre de timestamp. Le tableau signifie que l'on souhaite garder la partie de gauche du lien, car lors du split, un tableau est créé et contient chaque élément splitté de son côté (la partie de gauche, que l'on souhaite garder, à l'indice 0, et la partie de droite, que l'on ne souhaite pas garder, à l'indice 1).
        setVideo(embed.split('&')[0])

        // On enlève le lien de la vidéo du texte du post.
        findLink.splice(i, 1)

        // On transforme de nouveau le tableau "findLink" en chaîne de caractères.
        setMessage(findLink.join(' '))

        // On enlève l'image attachée au post, si elle existe déjà (rappel, pour le moment, on ne peut pas mettre une image ET une vidéo simultanément).
        setPostPicture('')
      }
    }
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setVideo('')
    setFile('')
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
    handleVideo()
  }, [userData, message, video])

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            {/* Affichage du nombre d'abonnements */}
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{' '}
              Abonnement
              {(userData.following && userData.following.length > 1) ||
              userData.following.length === 0
                ? 's'
                : null}
            </p>
            {/* Affichage du nombre d'aboonés */}
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{' '}
              Abonné
              {(userData.followers && userData.followers.length > 1) ||
              userData.followers.length === 0
                ? 's'
                : null}
            </p>
          </div>

          {/* Affichage de la photo de profil */}
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>

          {/* Formulaire de création de post */}
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              // On incrémente notre variable "message" pour l'envoyer plus tard à la BDD, puis à Redux.
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestameParser(Date.now())}</span>
                  </div>

                  {/* Prévisualisation du message */}
                  <div className="content">
                    <p>{message}</p>

                    {/* On prévisualise l'image téléversée, dans le cas où la variable "postPicture" contient une donnée */}
                    <img src={postPicture} alt="" />
                    {/* Idem avec la vidéo */}
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}

            <div className="footer-form">
              <div className="icon">
                {/* On ne peut pas (pour le moment, fonctionnalité à implémenter par moi-même) avoir de photo ET de vidéo en même temps, il faut donc ne mettre que l'un OU l'autre */}
                {/* Ici, on gère le cas où l'utilisateur poste une image */}
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />

                    {/* On demande à l'utilisateur de choisir une image à poster depuis son disque dur */}
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}

                {/* On gère le cas où un utilisateur poste une vidéo */}
                {video && (
                  // On met un bouton permettant de retirer la vidéo du post.
                  <button onClick={() => setVideo('')}>
                    Supprimer la vidéo
                  </button>
                )}
              </div>

              {/* Bouton "envoyer" */}
              <div className="btn-send">
                {/* Si le post contient le moindre type de contenu, on affiche le bouton d'annulation de message */}
                {/* Suppression du contenu de l'ébauche de post */}
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
