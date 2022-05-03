const mongoose = require('../connection');
const Schma = mongoose.Schema;

const ChordFamilySchma = new Schma(
    {
        note: {type: String, required: true},
        harmonico:
            {
                I: {type: String},
                II: {type: String},
                III: {type: String},
                IV: {type: String},
                V: {type: String},
                VI: {type: String},
                VII: {type: String}
            },
        avoidNotes: {type:String},
        relativa: {type:String}
    }
);

const Chord = mongoose.model('Chord', ChordFamilySchma);

module.exports = Chord;