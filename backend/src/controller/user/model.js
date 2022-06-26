const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//const bcrypt = require('mongoose-bcrypt')
const SALT_WORK_FACTOR = 10 //titkosítás szintje

/*"id": 1,
      "first_name": "Charlie",
      "last_name": "Firpo",
      "email": "seyden0@merriam-webster.com",
      "password": "$2a$10$G6MvO41/2aIVLmu5yGeNZevONGRgrk71kVCvw5ttCkI/1rBXn0DTa",
      "role": "3"*/

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: 1
    }
});

/*
UserSchema.pre('save', ( next) => { //a pre-nek köszönhetően beékelődik a mentés elé
    const user = this
    if (!user.isModified('password')) { //ha nem módosították a jelszót, nem titkosítjuk újra
        return next()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => { //kód generálása 10-es erősséggel
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => { //hash azaz kódolt jelszó készítése a kóddal
            if (err) {
                return next(err)
            }
            user.password = hash //a kódolt jelszóval felülírom az eredetit
            next() //mehet tovább
        })
    })
})
*/
UserSchema.methods.comparePassword = function(candidatePassword, cb) { //ezzel a metódussal hasonlítjuk össze a beírt jelszót titkosítva az AB-ban lévővel
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);