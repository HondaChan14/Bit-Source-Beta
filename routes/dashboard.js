const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const dashController = require('../controllers/dashboard')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


router.get('/', ensureAuth, dashController.getDash)
router.get('/logout', authController.logout)
module.exports = router