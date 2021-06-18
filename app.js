const express = require('express') //import express from 'express' //
// import { async } from 'rxjs'

const mongoose = require('mongoose')
const config = require('config')
const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))
