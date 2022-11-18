const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
const upload = multer()

// Middlewares d'authentification (inscription, connexion et déconnexion)
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

/* Middlewares de traitement des données des utilisateurs :
 * - Obtention des infos de TOUS les utilisateurs,
 * - Obtention des infos d'un seul utilisateur,
 * - Mise à jour des infos d'un utilisateur
 * - Suppression d'un utilisateur
 * - Incrémentaion, puis décrémentation du tableau de followers.
 */
router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

// Middleware d'ajout de photo de profil (UN seul fichier, grâce à la méthode "upload.single()" du paquet Multer)
router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router
