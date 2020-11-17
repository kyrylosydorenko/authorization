/* eslint-disable func-names */
import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: [String],
      default: ['user']
    }
  },
  {
    timestamps: true
  }
)

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = bcrypt.hashSync(this.password)
  return next()
})

schema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

schema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No Email')
    }
    if (!password) {
      throw new Error('No Password')
    }
    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }

    const isPassword = await user.passwordMatches(password)

    if (!isPassword) {
      throw new Error('Password Incorrect')
    }

    return user
  }
}

module.exports = model('User', schema)
