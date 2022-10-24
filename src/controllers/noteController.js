const db = require('../models')

const Note = db.notes

// main work

// 1. create note

const addNote = async (req, res) => {
    let info = {
        title: req.body.title,
        comment: req.body.comment,
        icon: req.body.icon,
        smallBlockId: req.body.smallBlockId,
    }

    const note = await Note.create(info)
    res.status(200).send(note)
    //console.log(note)
}

// 2. get all notes

const getAllNotes = async (req, res) => {
    let notes = await Note.findAll({})
    res.status(200).send(notes)
}

// 3. get single note by id

const getOneNote = async (req, res) => {
    let id = req.params.id
    let note = await Note.findByPk(id, { include: ["smallBlock"] })
    res.status(200).send(note)
}

// 4. update note by id

const updateNote = async (req, res) => {
    let id = req.params.id
    let note = await Note.update(req.body, {where: { id: id }})
    res.status(200).send(note)
}

// 5. delete note by id

const deleteNote = async (req, res) => {
    let id = req.params.id
    await Note.destroy({where: { id: id }})
    res.status(200).send('Note is deleted!')
}

module.exports = {
    addNote,
    getAllNotes,
    getOneNote,
    updateNote,
    deleteNote
}