import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPicture } from '../../actions/user.actions'

const UploadImg = () => {
  const [file, setFile] = useState()

  // Pour envoyer l'image. Si on le fait directement avec React, elle ne va ni aller dans le back, ni déclencher une action. Cette action, on la fait avec "dispatch". On va nommer la fonction que l'on veut exécuter, et elle va envoyer toutes les données dans le store.
  const dispatch = useDispatch()

  // Données de notre utilisateur.
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (e) => {
    e.preventDefault()
    // "FormData" est un objet de JavaScript qui va nous permettre de mettre, dans un package, notre image + des informations que l'on va passer.
    const data = new FormData()

    // On récupère des données enregistrées dans le store, pour les attacher dans ce component.
    // Le premier élément à append est une clé, qui ici est le pseudo de l'utilisateur.
    data.append('name', userData.pseudo)
    data.append('userId', userData._id)

    // La clé "file" doit impérativement être nommée ainsi. Le deuxième argument est notre constante "file" déclarée au début de notre component "UploadImg".
    data.append('file', file)

    // Une fois que nous avons toutes ces données, on se fait un dispatch, on déclenche une action.
    // L'action "uploadPicture()" prend en paramètre le tableau de données "data". Cette data est ce que nous fournissons au back, qui enregistre l'image.
    // Le deuxième paramètre est l'ID utilisateur, car on en aura besoin dans notre action.
    dispatch(uploadPicture(data, userData._id))
  }

  // On crée un formulaire pour que l'utilisateur puisse soumettre son image de profil.
  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image de profil</label>
      {/* Le name="file" est IMPORTANT, car dans le back, on a précisé que l'on devait reçevoir avec Multer un fichier qui allait s'appeler "file" */}
      {/* L'attribut "accept" n'est pas une garantie de sécurité concernant le format, la vérification doit se faire en back */}
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />

      <input type="submit" value="Envoyer" />
    </form>
  )
}

export default UploadImg
