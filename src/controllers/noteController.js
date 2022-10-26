const db = require('../models')
const https = require('https')

const Note = db.notes

// async function post(url, data) {
//     const dataString = JSON.stringify(data)
  
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': dataString.length,
//       },
//       timeout: 1000, // in ms
//     }
  
//     return new Promise((resolve, reject) => {
//       const req = https.request(url, options, (res) => {
//         if (res.statusCode < 200 || res.statusCode > 299) {
//           return reject(new Error(`HTTP status code ${res.statusCode}`))
//         }
  
//         const body = []
//         res.on('data', (chunk) => body.push(chunk))
//         res.on('end', () => {
//           const resString = Buffer.concat(body).toString()
//           resolve(resString)
//         })
//       })
  
//       req.on('error', (err) => {
//         reject(err)
//       })
  
//       req.on('timeout', () => {
//         req.destroy()
//         reject(new Error('Request time out'))
//       })
  
//       req.write(dataString)
//       req.end()
//     })
//   }

// main work

// 1. create note

const addNote = async (req, res) => {
    let info = {
        title: req.body.title,
        comment: req.body.comment,
        icon: req.body.icon,
        smallBlockId: req.body.smallBlockId,
        farmId: req.body.farmId,
        sensorId: req.body.sensorId,
    }
    try{
        const note = await Note.create(info)
        res.status(200).send(note)
        console.log('hi')
        console.log(note)


        // const res = await post(`https://0642-2001-b011-c001-1fd0-c8bc-8774-57f2-ba40.jp.ngrok.io/warning_note?farm_id=${note.farmId}&warning_note_id=${note.id}`, note)
        // console.log(res)
        https.get(`https://0642-2001-b011-c001-1fd0-c8bc-8774-57f2-ba40.jp.ngrok.io/warning_note?farm_id=${note.farmId}&warning_note_id=${note.id}`, 
        res => {
            console.log('Status Code:', res.statusCode);
        }).on('error', err => {
            console.log('Error: ', err.message);
        })
    }catch(err){
        res.status(400).send()
    }
}

// 2. get all notes

const getAllNotes = async (req, res) => {
    try{
        let notes = await Note.findAll({})
        res.status(200).send(notes)
    }catch(err){
        res.status(400).send()
    }
}

// 3. get single note by id

const getOneNote = async (req, res) => {
    try{
        let id = req.params.id
        let note = await Note.findByPk(id, { 
            // include: ["smallBlock"] 
            include: {
                model: db.smallBlocks,
                as: "smallBlock",
                include: {
                    model: db.blocks,
                    as: "block",
                }
            },
        })
        res.status(200).send(note)
    }catch(err){
        res.status(400).send()
    }
}

// 4. update note by id

const updateNote = async (req, res) => {
    try{
        let id = req.params.id
        let note = await Note.update(req.body, {where: { id: id }})
        res.status(200).send(note)
    }catch(err){
        res.status(400).send()
    }
}

// 5. delete note by id

const deleteNote = async (req, res) => {
    try{
        let id = req.params.id
        await Note.destroy({where: { id: id }})
        res.status(200).send('Note is deleted!')
    }catch(err){
        res.status(400).send()
    }
}

module.exports = {
    addNote,
    getAllNotes,
    getOneNote,
    updateNote,
    deleteNote
}