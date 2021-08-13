const mongoose = require('mongoose');

const schemaDefinition = {
    name: {
        type: String,
        required: true 
    }
};

var modelsSchema = new mongoose.Schema(schemaDefinition);

module.exports = mongoose.model('Model', modelsSchema);
