const Chords = require('./models/chords')
const Login = require('./models/login')
const loginSeed = require('./login-seed.json')
const chordsSeed = require('./chords-seed.json')

Chords.deleteMany({})
    .then(() => {
        Chords.insertMany(chordsSeed)
            .then(console.log)
            .catch(console.error)
    })

Login.deleteMany({})
    .then(() => {
        Login.insertMany(loginSeed)
            .then(console.log)
            .catch(console.error)
            // .finally(()=>process.exit())

    })
    