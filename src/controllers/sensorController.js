const db = require('../models')

const Sensor = db.sensors

// main work

// 1. create sensor

const addSensor = async (req, res) => {
    let info = {
        type: req.body.type,
    }

    const sensor = await Sensor.create(info)
    res.status(200).send(sensor)
    //console.log(sensor)
}

// 2. get all sensors

const getAllSensors = async (req, res) => {
    let sensors = await Sensor.findAll({})
    res.status(200).send(sensors)
}

// 3. get single sensor by id

const getOneSensor = async (req, res) => {
    let id = req.params.id
    let sensor = await Sensor.findByPk(id, { include: ["healthDatas", "humidityDatas", "temperatureDatas"] })
    res.status(200).send(sensor)
}

// 4. update sensor by id

const updateSensor = async (req, res) => {
    let id = req.params.id
    let sensor = await Sensor.update(req.body, {where: { id: id }})
    res.status(200).send(sensor)
}

// 5. delete sensor by id

const deleteSensor = async (req, res) => {
    let id = req.params.id
    await Sensor.destroy({where: { id: id }})
    res.status(200).send('Sensor is deleted!')
}

module.exports = {
    addSensor,
    getAllSensors,
    getOneSensor,
    updateSensor,
    deleteSensor
}