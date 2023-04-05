require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Cars = require('./models/cars.js')
const cors = require('cors')
const db = mongoose.connection;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
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


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...');
});

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
