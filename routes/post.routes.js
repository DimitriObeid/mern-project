// Notre variable "router" fait référence à la méthode "Router()" du framework Express.
const router = require('express').Router()
const postController = require('../controllers/post.controller')

// Multer est un paquet qui nous permet d'uploader des fichiers sur le serveur
const multer = require('multer')
const upload = multer()

// Middleware de lecture du post.
router.get('/', postController.readPost)

// Middleware de création du post.
router.post('/', upload.single('file'), postController.createPost)

// Middleware de mise à jour du post.
router.put('/:id', postController.updatePost)

// Middleware de suppression de post.
router.delete('/:id', postController.deletePost)

// Middlewares de mise à jour du tableau de "j'aime" (ajout, puis suppression).
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)

// Middlewares de mise à jour du tableau de commentaires (ajout de post, puis édition, puis suppression).
router.patch('/comment-post/:id', postController.commentPost)
router.patch('/edit-comment-post/:id', postController.editCommentPost)
router.patch('/delete-comment-post/:id', postController.deleteCommentPost)

module.exports = router
