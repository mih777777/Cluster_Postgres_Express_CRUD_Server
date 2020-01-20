const express = require('express')
const controller = require('../controllers/user')
const router = express.Router()

router.delete('/delete/:id', controller.deleteUserById) 
router.put('/update/:id', controller.updateUserById)
router.get('/get_users', controller.getAllUsers)
router.get('/get_user/:id', controller.getUserById)
router.post('/create', controller.createUser)
      

module.exports = router