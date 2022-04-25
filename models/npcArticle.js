const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const pageSchema = new mongoose.Schema({
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
    
    questline: {
        type: String,
    },
    inventory: {
        type: String
    },
    drops: {
        type: String
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
    },
    descriptionSubstring: {
        type: String
    }
})

pageSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('npcPage', pageSchema)