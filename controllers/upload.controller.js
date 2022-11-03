const UserModel = require('../models/user.model')

// "fs" est un module permettant d'intéragir avec le système de fichiers du serveur.
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require('../utils/errors.utils')

// Fonction d'upload de photo de profil.
module.exports.uploadProfil = async (req, res) => {
  try {
    // Si le format de l'image envoyée n'est pas un des formats valides.
    if (
      req.file.detectedMimeType != 'image/jpg' &&
      req.file.detectedMimeType != 'image/png' &&
      req.file.detectedMimeType != 'image/jpeg'
    )
      throw Error('invalid file')

    // Si la taille du fichier contenant l'image dépasse les 500ko.
    if (req.file.size > 500000) throw Error('max size')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }
  const fileName = req.body.name + '.jpg'

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  )

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      // On ajoute le chemin de l'image dans le champ "picture" de la table users de l'utilisateur actuel.
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(500).send({ message: err })
      }
    )
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}
