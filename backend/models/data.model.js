const mongoose = require('mongoose');
const Schema = mongoose.Schema


const dataSchema = new Schema({
    genres: {
        type: [String],
        validate: {
            validator: function (v) {
                v = v.map((g) => g.toLowerCase());
                return (new Set(v)).size === v.length;
            },
            message: props => `${props.value} duplicated movie genres!`
        },
        required: true
    },

    platforms: {
        type: [String],
        validate: {
            validator: function (v) {
                v = v.map((g) => g.toLowerCase());
                return (new Set(v)).size === v.length;
            },
            message: props => `${props.value} duplicated platforms!`
        },
        required: true
    }
}, {
    timestamps: true,
    capped: { max: 1 }
});

const DataInfo = mongoose.model('DataInfo', dataSchema);

module.exports = DataInfo;