import User from '../models/User.model'

const { Router } = require('express')

const router = Router()

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    const filterUsers = users.map((user) => user.id)
    res.json(filterUsers)
  } catch (error) {
    res.status(500).json({ error: 'Something goes wrong, try another way' })
  }
})

module.exports = router
