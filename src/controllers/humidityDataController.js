const db = require('../models')

const HumidityData = db.humidityDatas

// main work

// 1. create humidityData

const addHumidityData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId,
    }

    const humidityData = await HumidityData.create(info)
    res.status(200).send(humidityData)
    //console.log(humidityData)
}

// 2. get all humidityDatas

const getAllHumidityDatas = async (req, res) => {
    let humidityDatas = await HumidityData.findAll({})
    res.status(200).send(humidityDatas)
}

// 3. get single humidityData by id

const getOneHumidityData = async (req, res) => {
    let id = req.params.id
    let humidityData = await HumidityData.findByPk(id, { include: ["smallBlock"] })
    res.status(200).send(humidityData)
}

// 4. update humidityData by id

const updateHumidityData = async (req, res) => {
    let id = req.params.id
    let humidityData = await HumidityData.update(req.body, {where: { id: id }})
    res.status(200).send(humidityData)
}

// 5. delete humidityData by id

const deleteHumidityData = async (req, res) => {
    let id = req.params.id
    await HumidityData.destroy({where: { id: id }})
    res.status(200).send('HumidityData is deleted!')
}

module.exports = {
    addHumidityData,
    getAllHumidityDatas,
    getOneHumidityData,
    updateHumidityData,
    deleteHumidityData
}