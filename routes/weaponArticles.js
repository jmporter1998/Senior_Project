const express = require('express')
const WeaponArticle = require('./../models/weaponArticle')
const router = express.Router()


//Post for article
router.post('/', async (req, res, next) => {
    req.weaponArticle = new WeaponArticle()
    next()
}, saveArticleAndRedirectWeapon('newWeapon'))


// Get for new NPC page
router.get('/newWeapon', (req, res) => {
    res.render('articles/newWeapon', {weaponArticle: new WeaponArticle()})
})

//Is this the problem???
// Get for npc home
router.get('/weapons', async (req, res) => {
    const weaponArticles = await WeaponArticle.find().sort({createdAt: 'descending'})

    res.render('articles/weapons', {weaponArticles: weaponArticles})
})

//Edit for npc article
router.get('/weaponEdit/:id', async (req, res) => {
    const weaponArticle = await WeaponArticle.findById(req.params.id)
    res.render('articles/weaponEdit', {weaponArticle: weaponArticle})
})

//Slug for npc article (Maybe change) 
router.get('/weapons/:slug', async (req, res) => {
    //ERROR HERE
    const weaponArticle = await WeaponArticle.findOne( {slug: req.params.slug})
    if (weaponArticle == null) res.redirect('/weapons')
    res.render('articles/weaponShow', {weaponArticle: weaponArticle})
}) 

//Post for npc article
router.post('/weapons', async (req, res, next) => {
    req.weaponArticle = new WeaponArticle()
    next()
}, saveArticleAndRedirectWeapon('newWeapon')) 

//Edit npc article
router.put('/weapons/:id', async (req, res, next) => {
    req.weaponArticle = await WeaponArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectWeapon('weaponEdit'))

function saveArticleAndRedirectWeapon(path){
    return async (req, res) => {
        let weaponArticle = req.weaponArticle
        weaponArticle.title = req.body.title
        weaponArticle.picture = req.body.picture
        weaponArticle.description = req.body.description
        weaponArticle.weapon_type = req.body.weapon_type
        weaponArticle.attack_type = req.body.attack_type
        weaponArticle.enchantable = req.body.enchantable
        weaponArticle.weight = req.body.weight
        weaponArticle.physical_damage = req.body.physical_damage
        weaponArticle.magic_damage = req.body.magic_damage
        weaponArticle.fire_damage = req.body.fire_damage
        weaponArticle.lightning_damage = req.body.lightning_damage
        weaponArticle.physical_reduction = req.body.physical_reduction
        weaponArticle.magic_reduction = req.body.magic_reduction
        weaponArticle.fire_reduction = req.body.fire_reduction
        weaponArticle.lightning_reduction = req.body.lightning_reduction
        weaponArticle.strength_req = req.body.strength_req
        weaponArticle.intelligence_req = req.body.intelligence_req
        weaponArticle.dexterity_req = req.body.dexterity_req
        weaponArticle.faith_req = req.body.faith_req
        weaponArticle.strength_scaling = req.body.strength_scaling
        weaponArticle.intelligence_scaling = req.body.intelligence_scaling
        weaponArticle.dexterity_scaling = req.body.dexterity_scaling
        weaponArticle.faith_scaling = req.body.faith_scaling
        weaponArticle.location = req.body.location
        weaponArticle.lore = req.body.lore
        

        try{
            weaponArticle = await weaponArticle.save()
            res.redirect(`/weaponArticles/weapons/${weaponArticle.slug}`)
        }catch(e){
            res.render('weaponArticles/weapons/${path}', {weaponArticle: weaponArticle})
        }
    }
}



module.exports = router