const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Du måste välja ett användarnamn'] },
    password: { type: String, required: [true, 'Lösenord måste skickas med'] },
    access: { type:String, required: true }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;