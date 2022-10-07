import React, { useEffect, useState } from 'react'
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.actions'

// On appelle notre navigation (elle passera automatiquement par le fichier "index.js")
import Routes from './components/Routes'

const App = () => {
  const [uid, setUid] = useState(null)

  // On enregistre le hook "useDispatch" dans notre constante "dispatch"
  const dispatch = useDispatch()

  // Quand on va appeler le component App (c'est à dire partout dans notre application), on lance le "useEffect", qui va contrôler le token de l'utilisateur.

  // Notre component App est appelé partout et est mis à jour à chaque fois que la valeur de l'UID évolue (C-À-D quand on appelle le state "setUid")

  // Les crochets à la fin du "useEffect" servent à relancer le useEffect à chaque fois que l'uid (user identifier) évolue.
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data)
        })
        .catch((err) => console.log('No token'))
    }
    fetchToken()

    // Si l'UID existe (l'utilisateur est connecté), on appelle notre fonction "getUser()" déninie dans fichier "user.actions.js".
    if (uid) dispatch(getUser(uid))
  }, [uid])

  // On appelle notre component "Routes" dans une balise HTML.
  return (
    // Avec notre attribut "value={uid}", à chaque fois que l'on va appeller n'importe où dans n'imorte quel component notre contexte, on aura la possibilité d'avoir l'ID de notre utilisateur.
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App
