import React, { useContext } from 'react'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/Profil/UpdateProfil'

const Profil = () => {
  // En faisant comme ça, notre variable "uid" aura l'ID de l'utilisateur s'il est connecté.
  const uid = useContext(UidContext)

  return (
    <div className="profil-page">
      {/* On vérifie si l'utilisateur est connecté, pour pouvoir lui afficher le formulaire de connexion s'il ne l'est pas. S'il l'est, on lui envoie la page de mise à jour du profil via le component "UpdateProfil" */}
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          {/* Quand on appelle notre component "Log", on peut lui passer des informations */}
          {/* Ici, on affiche le cadre contenant le formulaire d'inscription ou de connexion. Par défaut, on affiche le formulaire de connexion */}
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil
