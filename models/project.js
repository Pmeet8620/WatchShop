const mongoose = require('mongoose');
const schemaDefinition = {
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    color: {
        type: String,
        required: true
    }
}



var projectsSchema = new mongoose.Schema(schemaDefinition);
module.exports = mongoose.model('Project', projectsSchema);