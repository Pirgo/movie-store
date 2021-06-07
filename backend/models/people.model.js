const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    birthday:{
        type: String,
        required: true
    },
    deathday:{
        type: String
    },
    photo : {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlOaeron7sa8fd9Xlv5GZZ3JOkd6piSEMpw&usqp=CAU"
    },
    place_of_birth : {
        type: String,
        required: true
    },
    biography : {
        type: String,
        default: "To be added"
    },
    functions: {
        director: [{
            _id: false,
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                trim: true,
                required: true
            }
        }],
        writer: [{
            _id: false,
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                trim: true,
                required: true
            }
        }],
        actor: [{
            _id: false,
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                trim: true,
                required: true
            }
        }]
    }

});

const People = mongoose.model('People', peopleSchema);

module.exports = People;