const express = require('express')
const ArmourArticle = require('./../models/armourArticle')
const router = express.Router()


//Post for article
router.post('/', async (req, res, next) => {
    req.armourArticle = new ArmourArticle()
    next()
}, saveArticleAndRedirectArmour('newArmour'))


// Get for new NPC page
router.get('/newArmour', (req, res) => {
    res.render('articles/newArmour', {armourArticle: new ArmourArticle()})
})

//Is this the problem???
// Get for npc home
router.get('/armours', async (req, res) => {
    const armourArticles = await ArmourArticle.find().sort({createdAt: 'descending'})

    res.render('articles/armours', {armourArticles: armourArticles})
})

//Edit for npc article
router.get('/armourEdit/:id', async (req, res) => {
    const armourArticle = await ArmourArticle.findById(req.params.id)
    res.render('articles/armourEdit', {armourArticle: armourArticle})
})

//Slug for npc article (Maybe change) 
router.get('/armours/:slug', async (req, res) => {
    //ERROR HERE
    const armourArticle = await ArmourArticle.findOne( {slug: req.params.slug})
    if (armourArticle == null) res.redirect('/armours')
    res.render('articles/armourShow', {armourArticle: armourArticle})
}) 

//Post for npc article
router.post('/armours', async (req, res, next) => {
    req.armourArticle = new ArmourArticle()
    next()
}, saveArticleAndRedirectArmour('newArmour')) 

//Edit npc article
router.put('/armours/:id', async (req, res, next) => {
    req.armourArticle = await ArmourArticle.findById(req.params.id)
    next()
}, saveArticleAndRedirectArmour('armourEdit'))

function saveArticleAndRedirectArmour(path){
    return async (req, res) => {
        let armourArticle = req.armourArticle
        armourArticle.title = req.body.title
        armourArticle.description = req.body.description
        armourArticle.markdown = req.body.markdown
        try{
            armourArticle = await armourArticle.save()
            res.redirect(`/armourArticles/armours/${armourArticle.slug}`)
        }catch(e){
            res.render('armourArticles/armours/${path}', {armourArticle: armourArticle})
        }
    }
}



module.exports = router