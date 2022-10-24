const db = require('../models')

const Farm = db.farms

// main work

// 1. create farm

const addFarm = async (req, res) => {
    let info = {
        name: req.body.name,
        key: req.body.key // auto generalize
    }

    const farm = await Farm.create(info)
    res.status(200).send(farm)
    //console.log(farm)
}

// 2. get all farms

const getAllFarms = async (req, res) => {
    let farms = await Farm.findAll({
        include: [{
            model: db.blocks,
            include: ["smallBlocks"],
            as: "blocks"
        }]
    })
    res.status(200).send(farms)
}

// 3. get single farm by id

const getOneFarm = async (req, res) => {
    let id = req.params.id
    let farm = await Farm.findByPk(id, {include: [
    {
        model: db.blocks,
        as: "blocks",
        include: [{
            model: db.smallBlocks,
            as: "smallBlocks",
            include: [
            { 
                model: db.healthDatas,
                as: "healthDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:1
            }, 
            {
                model: db.humidityDatas,
                as: "humidityDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:1
            }, 
            {
                model: db.temperatureDatas,
                as: "temperatureDatas",
                order: [[ 'createdAt', 'DESC' ]],
                limit:1
            }] 
        }],
    },
    {
        model: db.users,
        as: "users"
    }]})
    res.status(200).send(farm)
}

// 4. update farm by id

const updateFarm = async (req, res) => {
    let id = req.params.id
    let farm = await Farm.update(req.body, {where: { id: id }})
    res.status(200).send(farm)
}

// 5. delete farm by id

const deleteFarm = async (req, res) => {
    let id = req.params.id
    await Farm.destroy({where: { id: id }})
    res.status(200).send('Farm is deleted!')
}

module.exports = {
    addFarm,
    getAllFarms,
    getOneFarm,
    updateFarm,
    deleteFarm
}