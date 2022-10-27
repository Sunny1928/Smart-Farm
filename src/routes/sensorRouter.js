const sensorController = require('../controllers/sensorController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addSensor', isAuthenticated, sensorController.addSensor)
router.get('/allSensors', isAuthenticated, sensorController.getAllSensors)
router.get('/token/:id', sensorController.accessToken)

router.get('/:id', isAuthenticated, sensorController.getOneSensor)
router.put('/:id', isAuthenticated, sensorController.updateSensor)
router.delete('/:id', isAuthenticated, sensorController.deleteSensor)

module.exports = router