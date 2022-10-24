const db = require('../models')

const TemperatureData = db.temperatureDatas

// main work

// 1. create temperatureData

const addTemperatureData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId
    }

    const temperatureData = await TemperatureData.create(info)
    res.status(200).send(temperatureData)
    //console.log(temperatureData)
}

// 2. get all temperatureDatas

const getAllTemperatureDatas = async (req, res) => {
    let temperatureDatas = await TemperatureData.findAll({})
    res.status(200).send(temperatureDatas)
}

// 3. get single temperatureData by id

const getOneTemperatureData = async (req, res) => {
    let id = req.params.id
    let temperatureData = await TemperatureData.findByPk(id, { include: ["smallBlock"] })
    res.status(200).send(temperatureData)
}

// 4. update temperatureData by id

const updateTemperatureData = async (req, res) => {
    let id = req.params.id
    let temperatureData = await TemperatureData.update(req.body, {where: { id: id }})
    res.status(200).send(temperatureData)
}

// 5. delete temperatureData by id

const deleteTemperatureData = async (req, res) => {
    let id = req.params.id
    await TemperatureData.destroy({where: { id: id }})
    res.status(200).send('TemperatureData is deleted!')
}

module.exports = {
    addTemperatureData,
    getAllTemperatureDatas,
    getOneTemperatureData,
    updateTemperatureData,
    deleteTemperatureData
}