import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

// "Thunk" est un middleware nous permettant de faire des requêtes asynchrones avec Redux.
import thunk from 'redux-thunk'

// On a juste à appeler le dossier, vu qu'il contient un fichier nommé "index.js".
import rootReducer from './reducers'

/** Dev-tools */
// Le paquet "redux-devtools-extension" nous permet de travailler avec le plugin de navigateur éponyme.
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  // Avec la fonction composeWithDevTools, on autorise notre navigateur à accéder au store de notre application via le plugin navigateur 'redux-devtools-extension'. CETTE FONCTION, AINSI QUE LES FONCTIONS DE LOG ET DE DÉBUG DE REDUX, NE DOIVENT JAMAIS ÊTRE PRÉSENTES EN PRODUCTION !!!
  // On regroupe tous nos reducers dans le rootReducer pour qu'il s'incréemente avec eux
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

// On injecte ici (dans <App />) tous les affichages et toute la logique de l'application.
// La méthode "document.getElementById('root')" fait référence à l'ID "root" dans le fichier "index.html"

/** la variable "store" appelée dans l'attribut "store" est la constante définie ci-dessus */
ReactDOM.render(
  <Provider store={store}>
    {/* On englobe toute notre application dans le component provider */}
    <App />
  </Provider>,
  document.getElementById('root')
)

//
//
//
//
//
//
/*
// On injecte ici (dans <App />) tous les affichages et toute la logique de l'application.
// La méthode "document.getElementById('root')" fait référence à l'ID "root" dans le fichier "index.html"
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // On développe et configure le store de Redux.
  <Provider store={store}>
    {/* On englobe toute notre application dans le component provider * /}
    <App />
  </Provider>
)
*/
