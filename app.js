const mongoose = require('mongoose')
const express = require('express')
const config = require('config')

const tvar = require('./test').default

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes').default) 

const PORT = get('port') || 5000

async function start(){
    try{
        await mongooswe.connect(get('MongoURL'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Started on ${PORT}`))
        
    } catch (e) {
        console.log('Server Error', e.message )
        process.exit(1)
    }
}

function DropLog() {
    useTvar(() => {
        console.log('TvarLOG:', testvar)
    }, [testvar])
}

DropLog()

start()