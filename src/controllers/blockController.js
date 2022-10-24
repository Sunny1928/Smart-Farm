const db = require('../models')

const Block = db.blocks

// main work

// 1. create block

const addBlock = async (req, res) => {
    let info = {
        name: req.body.name,
        vegetable: req.body.vegetable,
        farmId: req.body.farmId,
    }

    const block = await Block.create(info)
    res.status(200).send(block)
    //console.log(block)
}

// 2. get all blocks

const getAllBlocks = async (req, res) => {
    let blocks = await Block.findAll({
        include: ["smallBlocks"],
    })
    res.status(200).send(blocks)
}

// 3. get single block by id

const getOneBlock = async (req, res) => {
    let id = req.params.id
    let block = await Block.findByPk(id, { include: ["farm", "smallBlocks"] })
    res.status(200).send(block)
}

// 4. update block by id

const updateBlock = async (req, res) => {
    let id = req.params.id
    let block = await Block.update(req.body, {where: { id: id }})
    res.status(200).send(block)
}

// 5. delete block by id

const deleteBlock = async (req, res) => {
    let id = req.params.id
    await Block.destroy({where: { id: id }})
    res.status(200).send('Block is deleted!')
}

module.exports = {
    addBlock,
    getAllBlocks,
    getOneBlock,
    updateBlock,
    deleteBlock
}