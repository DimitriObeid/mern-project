const mongoose = require('mongoose')

// Le paquet "Validator" est une bibliothèque de validateurs et d'assainisseurs de chaînes de caractères.
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// Modèle de la table "users"
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

// On crypte le mot de passe de l'utilisateur nouvellement créé (TOUJOURS CRYPTER LE MDP)
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Gestion de la connexion de l'utilisateur.
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    // Bcrypt vérifie que le hash enregistré ET le hash envoyé ont été produits par la même chaîne de caractères.
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

// Le modèle est compilé par Mongoose, et l'utilisateur est ajouté dans la base données.
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
