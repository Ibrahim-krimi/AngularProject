let mongoose = require('mongoose');
var aggregatePaginate=require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    nom: String,
    dateDeRendu: Date,
    rendu: Boolean,
    nommatiere: String,
    photoprof:String,
    photomatiere:String,
    auteur:String,
    notematiere:Number,
    remarque:String,

});
AssignmentSchema.plugin(aggregatePaginate);
//AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);
