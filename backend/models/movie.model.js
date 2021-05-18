const mongoose = require('mongoose');
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    genre: {
        type: [String],
        required: [true, 'genre field is required'],
        validate: {
            validator: function (v) {
                return (new Set(v)).size === v.length;
            },
            message: props => `${props.value} duplicated movie genres!`
        }
      }
    
    // "date": "",
    //     "runtime": "",
    //     "plot": "",
    //     "rate": {
    //         "sum": "",
    //         "amount": ""
    //     },
    //     "directors": [
    //         {
    //             "directorID": ""
    //         }
    //     ],
    //     "writers": [
    //         {
    //             "writerID": ""
    //         }
    //     ],
    //     "actors": [
    //         {
    //             "actorID": ""
    //         }
    //     ],
    //     "cover": "",
    //     "platforms": [

    //     ],
    //     "platforms": [
    //         {
    //             "name": "",
    //             "URL": ""
    //         }
    //     ]
    }, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

//   const userSchema = new Schema({
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       minlength: 3
//     },
//   }, {
//     timestamps: true,
//   });
