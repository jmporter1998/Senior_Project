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
    physical_protection: {
        type: Number
    },
    strike_protection: {
        type: Number
    },
    slash_protection: {
        type: Number
    },
    thrust_protection: {
        type: Number
    },
    magic_protection: {
        type: Number
    },
    fire_protection: {
        type: Number
    },
    lightning_protection: {
        type: Number
    },
    poise_resistance: {
        type: Number
    },
    bleed_resistance: {
        type: Number
    },
    poison_resistance: {
        type: Number
    },
    curse_resistance: {
        type: Number
    },
    armour_type: {
        type: String
    },
    durability: {
        type: Number
    },
    weight: {
        type: Number
    },
    location: {
        type: String
    },
    lore: {
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

pageSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('ArmourPage', pageSchema)