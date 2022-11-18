import { createContext } from 'react'

// On crée ici le hook "Context", qui va nous permettre de stocker l'ID de notre utilisateur tout en haut de notre application (voir la hiérarchie de l'application via le panel "components" de la console du navigateur, avec l'extension React Developer Tools), comme React sait le faire avec ses hook.
// Avec son "UseContext", il va nous permettre d'avoir une variable que l'on peut appeler depuis n'importe quel component pour dire, par exemple, ce qu'est l'ID utilisateur.
// Si l'utilisateur est connecté, on sera en mesure de le fournir à chaque fois sans avoir à repasser à chaque fois par le serveur pour lui demander l'ID de l'utilisateur.

export const UidContext = createContext()
