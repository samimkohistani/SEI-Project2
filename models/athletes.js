const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    team: {type: String, required: true},
    age: {type: Number, required: true},
    position: {type: String, required: true},
    contract: {type: String, required: true}, 
    img: {type: String, required: true}, 
});

const Athletes = mongoose.model("Athletes", athleteSchema);
module.exports = Athletes;


