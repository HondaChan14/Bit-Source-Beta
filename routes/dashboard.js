const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dashboard')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


router.get('/', ensureAuth, dashController.getDash)

module.exports = router