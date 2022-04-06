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
    weapon_type: {
        type: String
    },
    attack_type: {
        type: String
    },
    enchantable: {
        type: Boolean
    },
    weight: {
        type: Number
    },
    physical_damage: {
        type: Number
    },
    magic_damage: {
        type: Number
    },
    fire_damage: {
        type: Number
    },
    lightning_damage: {
        type: Number
    },
    physical_reduction: {
        type: Number
    },
    magic_reduction: {
        type: Number
    },
    fire_reduction: {
        type: Number
    },
    lightning_reduction: {
        type: Number
    },
    strength_req: {
        type: Number
    },
    dexterity_req: {
        type: Number
    },
    intelligence_req: {
        type: Number
    },
    faith_req: {
        type: Number
    },
    strength_scaling: {
        type: String
    },
    dexterity_scaling: {
        type: String
    },
    intelligence_scaling: {
        type: String
    },
    faith_scaling: {
        type: String
    },
    location: {
        type: String
    },
    lore: {
        type: String
    },
    //Add upgrades info
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

module.exports = mongoose.model('WeaponPage', pageSchema)