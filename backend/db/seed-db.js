const Chords = require('./models/chords')
const loginSeed = require('./login-seed.json')
const chordsSeed = require('./chords-seed.json')

Chords.deleteMany({})
    .then(() => {
        Chords.insertMany(chordsSeed)
            .then(console.log)
            .catch(console.error)
    })
