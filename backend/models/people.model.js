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
    birthday: {
        type: String,
        required: true
    },
    deathday: {
        type: String
    },
    photo: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfCwYiBU1phLjFdjjYtVQ4AV5R8-RTL3OzwLpePWuRG8xpcOx5KF_QQi9IH66o9F8HK0I&usqp=CAU"
    },
    place_of_birth: {
        type: String,
        required: true
    },
    biography: {
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