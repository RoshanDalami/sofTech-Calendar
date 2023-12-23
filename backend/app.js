const express = require('express');
const cors = require('cors');
const EventRouter = require('./router/Events/events.routes')

const app = express();


app.use(cors(
    {
        origin:'http://localhost:3000',
        
    }
))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/events',EventRouter)




app.get('/*',(req,res)=>{
    res.status(200).json({'message':'Server is setup'})
})

module.exports = app