const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },
    born: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlOaeron7sa8fd9Xlv5GZZ3JOkd6piSEMpw&usqp=CAU"
    },
    functions: {
        director: [{
            _id: false,
            movieID: {
                type: String,
                required: true
            },
            title: {
                type: String,
                trim: true,
                default: "sdgasdg"
            }
        }],
        writer: [{
            _id: false,
            movieID: {
                type: String,
                required: true
            },
            title: {
                type: String,
                trim: true,
                default: "sdgasdg"
            }
        }],
        actor: [{
            _id: false,
            movieID: {
                type: String,
                required: true
            },
            title: {
                type: String,
                trim: true,
                default: "sdgasdg"
            }
        }]
    }

});

const People = mongoose.model('People', peopleSchema);

module.exports = People;