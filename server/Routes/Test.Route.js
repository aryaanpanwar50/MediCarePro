const express = require('express')
const router = express.Router()
const {getTest} = require('../Controller/Test.controller')

router.get('/',getTest)

module.exports = router