const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const npcPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    questline: {
        type: String,
    },
    inventory: {
        type: []
    },
    drops: {
        type: []
    },
    armour: {
        type: String
    },
    weapon: {
        type: String
    },
    spells: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

npcPageSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('npcPage', npcPageSchema)