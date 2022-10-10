import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from './UploadImg'
import { updateBio } from '../../actions/user.actions'
import { dateParser } from '../Utils'
import FollowHandler from './FollowHandler'

const UpdateProfil = () => {
  const [bio, setBio] = useState('')

  // Formulaire de mise à jour de la bio. Tant que l'utilisateur ne clique pas dessus, son état est à "false", mais il passe à "true" dans le cas contraire, et là il devient possible d'éditer la bio.
  const [updateForm, setupdateForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  const dispatch = useDispatch()

  // On met l'état de ces popups à "false", car on ne veut les afficher que quand l'utilisatuer clique sur l'un des deux boutons "abonnements" et "abonnés".
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))

    // Maintenant, il faut que, visuellement, notre formulaire disparaisse pour que la case de la bio redevienne comme avant. Pour celà, on remet l'état "updateForme" à false.
    setupdateForm(false)
  }

  return (
    <div className="profile-container">
      {/* On crée la barre de navigation en premier */}
      <LeftNav />
      {/* Le pseudo qui s'affiche également dans la barre de navigation supérieure vient d'un autre component, mais grâce au store, on arrive à utiliser la donnée indépendemment des components */}
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Votre photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {/* Rendu conditionnel (on met un fragment, car il y a deux choses au même niveau de l'application) */}
            {updateForm === false && (
              <>
                {/* Dans le onClick, on lance la partie de mise à jour de la bio, et "updateForm" devient vrai (elle est de base sur "false") */}
                {/* Dans la balise 'p', on retourne le contenu de la bio, qui est enregistré dans le store. Lorsqu'on clique sur le bouton, on met l'état d'updateForm à "true". */}
                <p onClick={() => setupdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setupdateForm(!updateForm)}>
                  Modifier la bio
                </button>
              </>
            )}

            {updateForm === true && (
              <>
                {/* defaultValue : Si l'utilisateur a déjà écrit une bio, il faut qu'elle soit affichée, pour qu'nesuite il puisse voir quelle partie il souhaite éditer */}
                {/* onChange : dès que la bio est modifiée, on affiche le nouveau contenu à l'écran */}
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  Valider les modifications
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          {/* Il faut impérativement qu'une donnée soit présente dans le champ "following", sinon appeler la propriété "userData.following.length" nous renverra une erreur. On peut aussi y mettre une chaîne de caractères vide au lieu d'un '0', le '0' sera tout de même affiché */}
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements : {userData.following ? userData.following.length : ''}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ''}
          </h5>
        </div>
      </div>

      {/* Logique des popups */}
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            {/* On crée une croix avec le code HTML "&#10005;" qui va nous permettre de fermer la popup en mettant l'état "setFollowingPopup" sur false */}
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            {/* Liste des abonnements de l'utilisateur. Avec la méthode "map()", on récupère la liste des utilisateurs du site. */}
            <ul>
              {usersData.map((user) => {
                // Pour chaque abonnement de l'utilisateur (chacun a un ID). Chaque abonné sera ajouté un par un à la liste des abonnés via le return.
                for (let i = 0; i < userData.following.length; i++) {
                  // Si un utilisateur du site apparaît parmi les gens suivis par l'utilisateur actuel. La variable 'i' correspond à l'index actuellement traité du tableau d'utilisateurs du site dont l'utilisateur actuel est abonné.
                  if (user._id === userData.following[i]) {
                    // On retourne les infos de l'abonné actuellement traité.
                    // Comme il s'agit d'un map, il faut une clé.
                    return (
                      <li key={user._id}>
                        {/* On envoie dans l'attribut "src" le chemin de l'image de profil de l'abonné. */}
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          {/* On ajoute la possibilité de ne plus suivre l'utilisateur. On passe l'ID de l'abonné dans le prop "idToFollow" */}
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            {/* On crée une croix avec le code HTML "&#10005;" qui va nous permettre de fermer la popup en mettant l'état "setFollowingPopup" sur false */}
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            {/* Liste des abonnements de l'utilisateur. Avec la méthode "map()", on récupère la liste des utilisateurs du site. */}
            <ul>
              {usersData.map((user) => {
                // Pour chaque abonnement de l'utilisateur (chacun a un ID). Chaque abonné sera ajouté un par un à la liste des abonnés via le return.
                for (let i = 0; i < userData.followers.length; i++) {
                  // Si un utilisateur du site apparaît parmi les gens suivis par l'utilisateur actuel. La variable 'i' correspond à l'index actuellement traité du tableau d'utilisateurs du site dont l'utilisateur actuel est abonné.
                  if (user._id === userData.followers[i]) {
                    // On retourne les infos de l'abonné actuellement traité.
                    // Comme il s'agit d'un map, il faut une clé.
                    return (
                      <li key={user._id}>
                        {/* On envoie dans l'attribut "src" le chemin de l'image de profil de l'abonné. */}
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          {/* On ajoute la possibilité de suivre l'utilisateur. */}
                          <FollowHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
