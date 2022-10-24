const db = require('../models')

const HealthData = db.healthDatas

// main work

// 1. create healthData

const addHealthData = async (req, res) => {
    let info = {
        value: req.body.value,
        smallBlockId: req.body.smallBlockId,
        sensorId: req.body.sensorId,
    }

    const healthData = await HealthData.create(info)
    res.status(200).send(healthData)
    //console.log(healthData)
}

// 2. get all healthDatas

const getAllHealthDatas = async (req, res) => {
    let healthDatas = await HealthData.findAll({})
    res.status(200).send(healthDatas)
}

// 3. get single healthData by id

const getOneHealthData = async (req, res) => {
    let id = req.params.id
    let healthData = await HealthData.findByPk(id, { include: ["smallBlock"] })
    res.status(200).send(healthData)
}

// 4. update healthData by id

const updateHealthData = async (req, res) => {
    let id = req.params.id
    let healthData = await HealthData.update(req.body, {where: { id: id }})
    res.status(200).send(healthData)
}

// 5. delete healthData by id

const deleteHealthData = async (req, res) => {
    let id = req.params.id
    await HealthData.destroy({where: { id: id }})
    res.status(200).send('HealthData is deleted!')
}

module.exports = {
    addHealthData,
    getAllHealthDatas,
    getOneHealthData,
    updateHealthData,
    deleteHealthData
}