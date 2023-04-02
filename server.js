const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Cars = require('./models/cars.js')
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.post('/cars', (req, res)=>{
    Cars.create(req.body)
    .then((createdVehicle)=>{
        res.json(createdVehicle)
    })
});

app.get('/cars', (req, res)=>{
    Cars.find({})
    .then((foundVehicle) => {
        res.json(foundVehicle)
    })
});

app.delete('/cars/:id', (req, res)=>{
    Cars.findByIdAndRemove(req.params.id)
    .then((deletedVehicle)=> {
        res.json(deletedVehicle)
    })
});

app.put('/cars/:id', (req, res)=>{
    Cars.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedVehicle)=>res.json(updatedVehicle))
});





app.listen(PORT, () => console.log( 'Listening on port:', PORT));

mongoose.connect('mongodb://localhost:27017/carcrud')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...');
});

