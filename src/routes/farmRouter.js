const farmController = require('../controllers/farmController')

const router = require('express').Router()
const isAuthenticated = require('../policies/isAuthenticated')

router.post('/addFarm', farmController.addFarm)
router.get('/allFarms', isAuthenticated, farmController.getAllFarms)

router.get('/:id', isAuthenticated, farmController.getOneFarm)
router.put('/:id', isAuthenticated, farmController.updateFarm)
router.delete('/:id', isAuthenticated, farmController.deleteFarm)

module.exports = router