const express = require('express')
const router = express.Router()

const { getNbrOccupations } = require('../controllers/statistiques')

router.route('/').get(getNbrOccupations)

module.exports = router
