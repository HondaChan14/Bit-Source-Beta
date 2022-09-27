const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const boardController = require('../controllers/board')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.get('/logout', authController.logout)
router.get('/', ensureAuth, boardController.getBoard)


module.exports = router