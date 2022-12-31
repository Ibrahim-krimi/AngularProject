let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: Number,
    nom: String,
    motdepass: String,
    isadmin: Boolean,
});


//AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
const userModel = mongoose.model('users', UserSchema);
module.exports = userModel ;
