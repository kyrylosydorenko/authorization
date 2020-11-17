/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import config from '../config'

import User from '../models/User.model'

const { Router } = require('express')

const router = Router()
const TOKEN_EXPIRES_IN = '30d'

const loginValidatorRules = [
  check('email', 'Please enter valid email').normalizeEmail().isEmail(),
  check('password', 'Enter password').exists()
]

const registerValidatorRules = [
  check('email', 'Wrong email').isEmail(),
  check('password').isLength({ min: 8 }).withMessage('Must be at least 8 chars long')
]

router.get('/validate', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    if (!user) {
      return res.status(400).json({ error: 'Cant validate user' })
    }

    res.json({ user: { email: user.email, id: user.id, username: user.username } })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error })
  }
})

router.post('/login', loginValidatorRules, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: 'Wrong login data' })
    }

    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: TOKEN_EXPIRES_IN })

    res.cookie('token', token, { maxAge: 1000 * 3600 })

    res.json({ token, user: { email: user.email, id: user.id, username: user.username } })
  } catch (error) {
    return res.status(400).json({ error: `${error.message}` })
  }
})

router.post('/register', registerValidatorRules, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: 'Wrong register data' })
    }

    const { email, password, username } = req.body
    const isUser = await User.findOne({ email })
    if (isUser) {
      return res.status(400).json({ error: 'That user allready exists' })
    }
    const user = new User({ email, password, username })
    await user.save()

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: TOKEN_EXPIRES_IN })
    res.cookie('token', token, { maxAge: 1000 * 3600 })

    res.json({
      token,
      user: { ...user },
      message: 'User created'
    })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error })
  }
})

module.exports = router
