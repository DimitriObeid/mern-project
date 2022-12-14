// Quelques fonctions pouvant être utiles pour améliorer le site.

// Paramètre : date de création du profil.
export const dateParser = (num) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  let timestamp = Date.parse(num)

  let date = new Date(timestamp).toLocaleDateString('fr-FR', options)

  return date.toString()
}

// Fonction qui va vérifier si un champ est rempli ou pas.
export const isEmpty = (value) => {
  // Si une de ces conditions est vraie, alors on retourn "true"
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const timestameParser = (num) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  let date = new Date(num).toLocaleDateString('fr-FR', options)

  return date.toString()
}
